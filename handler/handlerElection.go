package handler

import (
	"fmt"
	"math"
	. "optool/structures"
	"sort"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/gocolly/colly"
)

func (handler *Handler) GetElection() ResultEelection {

	//idx := handler.Ldb.AccountDB.GetKoreaRealTimestatusIdx()

	electionlist := handler.Ldb.AccountDB.GetElection()

	//fmt.Println("GetCoronaDataWorldRealTime worldrealtimestatus", worldrealtimestatus)
	result := ResultEelection{}

	result.ElectionList = electionlist

	return result

}

func (handler *Handler) GetAllElection() ResultAllEelection {

	//idx := handler.Ldb.AccountDB.GetKoreaRealTimestatusIdx()

	electionlist := handler.Ldb.AccountDB.GetElection()

	totalcnt := 0 // 총 유효투표수
	for _, v := range electionlist {

		totalcnt = totalcnt + *v.Cnt
	}

	allelectionarray := []*AllElection{}
	// 의석할당정당 : 전국 유효투표총수의 3% 이상을 득표한 정당 또는 지역구국회의원선거에서 5석 이상의 의석을 차지한 정당. 비례대표 국회의원 의석수 배분에 사용하는 기본값

	var uisukpercentsum float64 //의석할당정당의 비례대표 득표결과의 합 :
	var jiyukuisuk int          // ④지역구 의석수 비의석할당정당 지역구의석수

	uisukpercentsum = 0.00
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	// 데이터를 allelection에 넣으면서 의석할당정당 여부 넣고
	// 비의석할당정당 지역구 의석수 체크
	// 연동배분의석수 까지 나온다

	for _, v := range electionlist {
		allelection := AllElection{}
		cnt := *v.Cnt

		//비례 퍼센트를 직접 계산하려면 이거
		// biryepercent := float64(cnt) / float64(totalcnt) * 100
		// biryepercentround := math.Round(biryepercent*100) / 100
		// allelection.BiryePercent = biryepercentround

		//비례 퍼센트가 election 에 있다면 이거
		allelection.BiryePercent = *v.PERCENT

		//allelection.BiryePercent = biryepercentround

		allelection.PARTY = *v.PARTY
		allelection.PARENT = "ELECTION"
		allelection.PARTYNUM = *v.PARTYNUM
		allelection.Num1cnt = *v.Num1cnt
		allelection.Cnt = cnt
		allelection.Color = *v.Color

		// 비례대표3% 이상 , 지역구의원수 5이상 , 무소속 이 아니고
		if (*v.PERCENT > 3 || *v.Num1cnt >= 5) && *v.PARTY != "무소속" {
			allelection.Haldangjungdang = true
			//uisukpercentsum = uisukpercentsum + biryepercentround
			uisukpercentsum = uisukpercentsum + *v.PERCENT
			//의석할당정당의 비례대표 득표결과의 합 :
		} else {

			// 비의석할당정당 : 의석할당정당의 반대. 전국 유표투표총수의 3% 미만 또는 지역구국회의원선거에서 5석 미만의 의석을 차지한 정당.
			// 비례대표 국회의원 의석수 배분을 위한 정당득표율 계산시 제외
			allelection.Haldangjungdang = false

			jiyukuisuk = jiyukuisuk + *v.Num1cnt
		}
		//if biryepercentround < 3 || *v.Num1cnt < 5 || *v.PARTY == "무소속" { // 비례대표3% 미만 , 지역구의원수 5미만 , 무소속 ㅣ일경우 비의석할당정당

		//fmt.Println("biyrepercent : ", biryepercentround, v.PARTY, uisukpercentsum)

		allelectionarray = append(allelectionarray, &allelection)
	}

	//연동배분의석수 (= 300석-④지역구 의석수)
	yundonguisuk := float64(300 - jiyukuisuk)
	fmt.Println("연동배분의석수 300 - 지역구 의석수 ", yundonguisuk)

	////////////////////////////////////////////////////////////////////////////
	// 정당 득표율  연동형 캡 30석 계산
	////////////////////////////////////////////////////////////////////////////
	var huansuantotal int
	for _, v := range allelectionarray {

		//⑤정당득표율 ①비례대표 득표 결과 × 100 ÷ ③의석할당 정당 비례대표 득표결과의 합)
		jundangtemp := v.BiryePercent * 100 / uisukpercentsum

		jungdangpercent := math.Round(jundangtemp*100) / 100

		v.Jungdangpercent = jungdangpercent // 저장은 12.12 % 로 저장한다 추후 계산은 /100 해서 0.1212 로 만들어야 한다

		//기본수식  (⑥연동배분의석수 x ⑤정당 득표율 - ②지역구의석수) x ⑦준연동 50%
		///가. 연동형 캡 30석 (→환산의석)

		jundagcal := jungdangpercent / 100
		yundongcap30suk := (yundonguisuk*jundagcal - float64(v.Num1cnt)) * 0.5 // 환산의석 기본수식 연동형30석캡 같은 내용

		// 연동캡 30석 반올림
		yongdongcap30sukbanyollim := int(math.Abs(math.Round(yundongcap30suk)))
		yundongcap30suk = math.Round(yundongcap30suk*100) / 100
		//v.Huansanuisukpercent = huansanuisukpercent
		v.Yundong30suk = yundongcap30suk

		v.Jbirye = 0

		if yundongcap30suk > 0 {

			//v.Huansanuisuk = math.Round(tempyundong)

			// 소수점 첫째자리에서 반올림
			//temp := math.Round(huansanuisukpercent)
			//huansantemp := int(math.Abs(temp))

			if v.Haldangjungdang == true {
				v.Jbirye = yongdongcap30sukbanyollim

				huansuantotal = huansuantotal + yongdongcap30sukbanyollim

				v.Yundong30sukbanolim = yongdongcap30sukbanyollim
			}

		}

		fmt.Println("정당 , 연동의석 , 정당퍼센트 , 지역구의석수 , 연동 30캡 환산의석 ,  반올림 , 실비례의석", v.PARTY, yundonguisuk, jungdangpercent, v.Num1cnt, yundongcap30suk, yongdongcap30sukbanyollim, v.Jbirye)

	}

	fmt.Println("환산의석 토탈 ,  의석 퍼센트 합계 ", huansuantotal, uisukpercentsum)

	if huansuantotal < 30 { //연동형 캡 30석 미만시 잔여
		// 나-1.  잔여의석 배분  : 연동형 캡 30석- ⑧ × 정당득표율
		janyu1total := 0

		type myDataType struct {
			PARTY string
			num   float64
		}
		mySlice := make([]myDataType, 0)

		for _, v := range allelectionarray {

			if v.Haldangjungdang == true {
				janyubaepercent := (30 - float64(huansuantotal)) * v.Jungdangpercent

				janyubaevalue := math.Floor(janyubaepercent) / 100 // 소수점 2자리 밑 내림
				v.Janyubaevalue = janyubaevalue

				//v.Janyubae1 = int(math.Abs(janyubaevalue))
				v.Janyubae1 = int(janyubaevalue)

				if v.Janyubae1 > 0 {
					janyu1total = janyu1total + v.Janyubae1
				}

				//////////////////////////// 잔여 퍼센트의 소수점을 저장

				sosujum := janyubaevalue - float64(v.Janyubae1)
				fmt.Printf("%f := %f - %f\n", sosujum, janyubaevalue, float64(v.Janyubae1))

				mySlice = append(mySlice, myDataType{v.PARTY, sosujum})

				fmt.Println("잔여배분 퍼센트 v.Yundong30suk - float64(huansuantotal)*v.Jungdangpercent 마지막 소수점만 : ", 30, float64(huansuantotal), v.Jungdangpercent, v.Janyubaevalue, v.Janyubae1, sosujum)

			}
		}

		fmt.Println("mySlice ", mySlice)
		janyuremain := 30 - (huansuantotal + janyu1total)
		n := 0
		if janyuremain > 0 { // 잔여가 아직 남아 있으면 소수점 크기로 한다

			sort.Slice(mySlice, func(i, j int) bool {
				return mySlice[i].num > mySlice[j].num
			})

			fmt.Println("sorted mySlice ", mySlice)

			for n < janyuremain {

				fmt.Println("myslice ", mySlice[n].PARTY, mySlice[n].num)

				for _, v := range allelectionarray {
					if v.PARTY == mySlice[n].PARTY {
						v.Janyubae2 = 1
					}
				}
				n = n + 1
			}

		}

		// 준 연동 대표의석수 총 계산 30석 초과가 아닐경우 v.Yundong30sukbanolim + v.Janyubae1 + v.Janyubae2
		for _, v := range allelectionarray {
			v.Jbirye = v.Yundong30sukbanolim + v.Janyubae1 + v.Janyubae2
		}
	}

	if huansuantotal > 30 { //연동형 캡 30석 초과시
		totaljojung := 0

		type myDataType struct {
			PARTY string
			num   float64
		}
		mySlice := make([]myDataType, 0)

		//다.조정의석 배분 (연동형 캡30석 × 기본수식÷ huansuantotal)
		for _, v := range allelectionarray {
			//조정의석 배분

			//기본수식  (⑥연동배분의석수 x ⑤정당 득표율 - ②지역구의석수) x ⑦준연동 50%
			///가. 연동형 캡 30석 (→환산의석)
			jundagcal := v.Jungdangpercent / 100
			yundongcap30suk := (yundonguisuk*jundagcal - float64(v.Num1cnt)) * 0.5 // 환산의석 기본수식 연동형30석캡 같은 내용

			// 조정의석 배분 (연동형 캡30석 × 기본수식÷ ⑪)
			// 30 * yundongcap30suk / huansuantotal
			jojunguisukvalue := 30 * yundongcap30suk / float64(huansuantotal)

			//jojungpercent := float64(v.Jbirye) * (v.Yundong30suk / 100) / float64(huansuantotal)

			fmt.Println("환산의석 퍼센트 , 조정 퍼센", v.Yundong30suk, jojunguisukvalue)
			v.Choguavalue = math.Round(jojunguisukvalue*100) / 100
			if jojunguisukvalue > 0 { // 0 보다 작으면 다 0 이다

				chogua1 := int(jojunguisukvalue) //  조정의석 정수 형
				fmt.Println("조정 의석", chogua1)
				v.Chogua1 = chogua1 // 초과의석 재조정

				totaljojung = totaljojung + chogua1

				// 조정 퍼센트의 소수점
				sosujum := jojunguisukvalue - float64(chogua1)

				mySlice = append(mySlice, myDataType{v.PARTY, sosujum})

			}

		}

		sort.Slice(mySlice, func(i, j int) bool {
			return mySlice[i].num > mySlice[j].num
		})

		janyuuisuk := 30 - totaljojung

		fmt.Println("janyuuisuk", janyuuisuk)
		n := 0
		for n < janyuuisuk {

			partyname := mySlice[n].PARTY

			for _, v := range allelectionarray {

				if partyname == v.PARTY {
					v.Chogua2 = 1
					fmt.Println("환산의석 초과 잔여분 소수점 처리 partyname ", partyname, 1)
				}

			}

			n = n + 1
		}

		// 준 연동 대표의석수 총 계산 30석 초과일 경우 초과 재조정 부분 합산
		for _, v := range allelectionarray {
			v.Jbirye = v.Chogua1 + v.Chogua2
		}

	}

	//병립형 17석 산출

	type myByungliptype struct {
		PARTY string
		num   float64
	}
	myByunglip := make([]myByungliptype, 0)
	byunglipsuktotal := 0
	for _, v := range allelectionarray {

		if v.Haldangjungdang == true { // 할당정당만으로 병립형을 체크 한다 3% 미만은 제외
			biryevalue := 17 * (v.BiryePercent / 100)
			fmt.Println("병립석 : ", v.PARTY, v.Jungdangpercent, biryevalue)

			birye1 := int(biryevalue)                        // 병립형 값의 정수 부분을 산출
			v.Bbiryevalue = math.Round(biryevalue*100) / 100 // 00.00 으로 맞추가 비례value 반올림
			v.Bbirye1 = birye1

			byunglipsosujum := biryevalue - float64(birye1)

			myByunglip = append(myByunglip, myByungliptype{v.PARTY, byunglipsosujum})

			byunglipsuktotal = byunglipsuktotal + birye1
		}

	}

	janyubyunglipsuk := 17 - byunglipsuktotal

	if janyubyunglipsuk > 0 {

		sort.Slice(myByunglip, func(i, j int) bool {
			return myByunglip[i].num > myByunglip[j].num
		})

		fmt.Println("myByunglip : ", myByunglip)

		n := 0
		for n < janyubyunglipsuk {

			fmt.Println("myslice ", myByunglip[n].PARTY, myByunglip[n].num)

			for _, v := range allelectionarray {
				if v.PARTY == myByunglip[n].PARTY {
					v.Bbirye2 = 1
				}
			}
			n = n + 1
		}

	}

	//fmt.Println("GetCoronaDataWorldRealTime worldrealtimestatus", worldrealtimestatus)
	result := ResultAllEelection{}

	result.ElectionList = allelectionarray

	return result

}

func (handler *Handler) ScrapCollyBiryeElection() error {
	//fmt.Println("ScrapCollyCorona_roylabdata")

	newcolly := colly.NewCollector()

	newcolly.Limit(&colly.LimitRule{
		//DomainGlob:  ".*edmundmartin.*",
		Parallelism: 1,
		Delay:       5 * time.Second,
	})

	//main := Main{}
	newcolly.OnHTML("body", func(e *colly.HTMLElement) {

		fmt.Println("ddddddddddd")
		fmt.Println("e.Dom", e.DOM)

		title := e.DOM.Find("tr")

		//maininfo := MainInfo{}

		title.Each((func(i int, s *goquery.Selection) {

			fmt.Println("<tr>: ", i, s.Text())

			td := s.Find("td")
			//birye := BiryeElection{}

			td.Each((func(n int, s *goquery.Selection) {

				fmt.Println("<td>: ", i, n, s.Text())
				if i > 2 {
					// if n == 0 {
					// 	fmt.Println("<td>: ", i, n, s.Text())
					// }

				}

			}))

			// err := handler.Ldb.AccountDB.SetBiryeElection(birye.PARTY, birye.Cnt)
			// if err != nil {
			// 	fmt.Println("Error Set RoyLabData!! : ", err.Error())
			// }

		}))

	})

	newcolly.OnRequest(func(r *colly.Request) {
		fmt.Println("test r ", r.Body)
		fmt.Println("Visiting", r.URL)
		//fmt.Println("r.Body", r.Body)

	})

	newcolly.Visit("https://www.nec.go.kr/vt/main.do")

	return nil

}

func (handler *Handler) ScrapCollyFirstElection() error {
	//fmt.Println("ScrapCollyCorona_roylabdata")

	newcolly := colly.NewCollector()

	newcolly.Limit(&colly.LimitRule{
		//DomainGlob:  ".*edmundmartin.*",
		Parallelism: 1,
		Delay:       5 * time.Second,
	})

	//main := Main{}
	newcolly.OnHTML("body", func(e *colly.HTMLElement) {

		fmt.Println("ddddddddddd")
		fmt.Println("e.Dom", e.DOM)

		title := e.DOM.Find("tr")

		//maininfo := MainInfo{}

		title.Each((func(i int, s *goquery.Selection) {

			fmt.Println("<tr>: ", i, s.Text())

			td := s.Find("td")
			//birye := BiryeElection{}

			td.Each((func(n int, s *goquery.Selection) {

				fmt.Println("<td>: ", i, n, s.Text())
				if i > 2 {
					// if n == 0 {
					// 	fmt.Println("<td>: ", i, n, s.Text())
					// }

				}

			}))

			// err := handler.Ldb.AccountDB.SetFirstElection(birye.PARTY, birye.Cnt)
			// if err != nil {
			// 	fmt.Println("Error Set RoyLabData!! : ", err.Error())
			// }

		}))

	})

	newcolly.OnRequest(func(r *colly.Request) {
		fmt.Println("test r ", r.Body)
		fmt.Println("Visiting", r.URL)
		//fmt.Println("r.Body", r.Body)

	})

	newcolly.Visit("https://www.nec.go.kr/vt/main.do")

	return nil

}
