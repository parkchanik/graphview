package handler

import (
	"fmt"
	. "optool/structures"
	"strconv"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/gocolly/colly"
)

func (handler *Handler) ScrapCollyCorona_worldometers() error {
	fmt.Println(" why ???????????????????????????????????????????????????")

	newcolly := colly.NewCollector()

	newcolly.Limit(&colly.LimitRule{
		//DomainGlob:  ".*edmundmartin.*",
		Parallelism: 1,
		Delay:       5 * time.Second,
	})

	//main := Main{}
	newcolly.OnHTML("tbody", func(e *colly.HTMLElement) {

		fmt.Println("ddddddddddd")
		fmt.Println("e.Dom", e.DOM)

		title := e.DOM.Find("tr")

		//maininfo := MainInfo{}
		title.Each((func(i int, s *goquery.Selection) {

			//fmt.Println("<tr>: ", i, s.Text())

			td := s.Find("td")

			td.Each((func(n int, s *goquery.Selection) {

				if n == 0 {
					fmt.Println("<td>: ", i, n, s.Text())
				}
				if n == 1 {
					fmt.Println("<td>: ", i, n, s.Text())
				}
				if n == 3 {
					fmt.Println("<td>: ", i, n, s.Text())
				}

			}))

			// if i == 0 { // 국내 발생 현황
			// 	fmt.Println("제목 : ", i, s.Text())

			// 	koreastr := s.Text()
			// 	//코로나바이러스감염증-19 국 발생 현황(2.24일 16시 기준)
			// 	// 마지막 괄호뒤를 찾아 낸다
			// 	pos := strings.LastIndex(koreastr, "(")

			// 	fmt.Println("--------------------- koreastr[pos:", koreastr[pos:])

			// 	cm := regexp.MustCompile("[0-9]+")
			// 	numberarray := cm.FindAllString(koreastr[pos:], -1)

			// 	fmt.Println("국내 발생 현황 numberarray : ", numberarray)

			// }

		}))

		// blwrap := e.DOM.Find(".data_table")

		// // countryinfolist := []CountryInfo{}
		// blwrap.Each(func(i int, s *goquery.Selection) {

		// 	if i == 0 {
		// 		//fmtPrintln("Text -------------------------------------- : ", i, s.Text())
		// 		// 국내
		// 		//fmt.Println("국내 LL: ", s.Text())
		// 		li := s.Find("tr")
		// 		//countryinfo := CountryInfo{}
		// 		//countryinfo.CountryName = "대한민국"

		// 		li.Each(func(y int, s *goquery.Selection) {

		// 			if y < 4 { // 해외 국가 뺀다

		// 				cnt1 := s.Text()
		// 				cnt1 = strings.Replace(cnt1, ",", "", 1)

		// 				cm := regexp.MustCompile("[0-9]+")
		// 				numberarray := cm.FindString(cnt1)

		// 				cnt1int, err :=strconv.Atoi(numberarray)
		// 				if err != nil {
		// 					mt.Println(".data_table strconv.Atoi(numberarray) err ", err.Error())
		// 				}
		// 				//countryino.Cnt1 = cnt1int
		// 				if y == 0 {
		// 					maininfo.KoreaCnt1 = cnt1int
		// 					fmt.Println("KoreCnt1: ", cnt1int)
		// 				} else if y == 1 {
		// 					maininfo.KoreaCnt2 = cnt1int
		// 					fmt.Println("KoreCnt2: ", cnt1int)
		// 				} else if y == 2 {
		// 					maininfo.KoreaCnt3 = cnt1int
		// 					fmt.Println("KoreCnt3: ", cnt1int)
		// 				} else if y == 3 {
		// 					maininfo.KoreaCnt4 = cnt1int
		// 					mt.Println("KoreaCnt4: ", cnt1int)
		//
		// 			}

		// 		})

		// 		//countryinfolist = append(countryinfolist, countryinfo)

		// 	}

		// })

		//	main.CountryInfo = countyinfolist
		//	main.MainInfo = maininfo
		//fmt.Println("countryinfolist", countryinfolist)

		// Example Goquery usage
		//	fmt.Println("test", goquerySelection.Find("bl_body").Children().Text())
	})

	newcolly.OnRequest(func(r *colly.Request) {
		fmt.Println("test r ", r.Body)
		fmt.Println("Visiting", r.URL)
		//fmt.Println("r.Body", r.Body)

	})

	newcolly.Visit("https://www.worldometers.info/coronavirus/")

	return nil

}

func (handler *Handler) ScrapCollyCorona_roylabdata() error {
	//fmt.Println("ScrapCollyCorona_roylabdata")

	newcolly := colly.NewCollector()

	newcolly.Limit(&colly.LimitRule{
		//DomainGlob:  ".*edmundmartin.*",
		Parallelism: 1,
		Delay:       5 * time.Second,
	})

	//main := Main{}
	newcolly.OnHTML("table", func(e *colly.HTMLElement) {

		fmt.Println("ddddddddddd")
		fmt.Println("e.Dom", e.DOM)

		title := e.DOM.Find("tr")

		//maininfo := MainInfo{}

		title.Each((func(i int, s *goquery.Selection) {

			//fmt.Println("<tr>: ", i, s.Text())

			td := s.Find("td")
			roylabdata := RoyLabData{}

			td.Each((func(n int, s *goquery.Selection) {

				if i > 2 {
					// if n == 0 {
					// 	fmt.Println("<td>: ", i, n, s.Text())
					// }
					if n == 1 {
						//fmt.Println("<td>: ", i, n, s.Text())
						str := s.Text()
						if strings.Contains(str, "'") {
							str = strings.Replace(str, "'", "\\'", -1)
						}

						roylabdata.Nation = str
					}
					if n == 2 {
						//fmt.Println("<td>: ", i, n, s.Text())
						str := s.Text()
						confirmed, err := strconv.Atoi(str)
						if err != nil {
							fmt.Println("err :", err.Error())
						}
						roylabdata.Confirmed = confirmed
					}
					if n == 3 {
						str := s.Text()
						deaths, err := strconv.Atoi(str)
						if err != nil {
							fmt.Println("err :", err.Error())
						}
						roylabdata.Deaths = deaths
					}
					if n == 4 {
						str := s.Text()
						recovered, err := strconv.Atoi(str)
						if err != nil {
							fmt.Println("err :", err.Error())
						}
						roylabdata.Recovered = recovered
					}
				}

			}))

			//fmt.Println("roylabdata : ", roylabdata)
			if roylabdata.Nation != "" {
				err := handler.Ldb.AccountDB.SetRoyLabData(roylabdata.Nation, roylabdata.Confirmed, roylabdata.Deaths, roylabdata.Recovered)
				if err != nil {
					fmt.Println("Error Set RoyLabData!! : ", roylabdata.Nation, roylabdata.Confirmed, roylabdata.Deaths, roylabdata.Recovered, err.Error())
				}
			}

		}))

	})

	newcolly.OnRequest(func(r *colly.Request) {
		fmt.Println("test r ", r.Body)
		fmt.Println("Visiting", r.URL)
		//fmt.Println("r.Body", r.Body)

	})

	newcolly.Visit("https://docs.google.com/spreadsheets/d/e/2PACX-1vQuDj0R6K85sdtI8I-Tc7RCx8CnIxKUQue0TCUdrFOKDw9G3JRtGhl64laDd3apApEvIJTdPFJ9fEUL/pubhtml?gid=0&single=true")

	return nil

}
