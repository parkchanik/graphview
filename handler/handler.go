package handler

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"net/http"
	"optool/config"
	"optool/db"
	. "optool/structures"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/gin-gonic/gin"
	"github.com/gocolly/colly"
)

type Handler struct {
	Ldb    *db.LoginServerDB
	config *config.Config
}

func (handler *Handler) Initialize(config *config.Config) {

	handler.config = config

	handler.setDB()

}

func (handler *Handler) setDB() {

	ldb := &db.LoginServerDB{}

	adb, err := ldb.ConnectAccountDB(handler.config)
	if err != nil {
		fmt.Println("Error ConnectAccountDB Msg:", err.Error())
		panic(err)
	}

	// gdbconfig, err := adb.GetGameDBConfig()
	// if err != nil {
	// 	fmt.Println("Error GetGameDBConfig Msg:", err.Error())
	// 	panic(err)
	// }

	// handler.config.GameDBCfg = gdbconfig

	// gdb, err := ldb.ConnectGameDB(handler.config)
	// if err != nil {
	// 	fmt.Println("Error ConnectGameDB Msg:", err.Error())
	// 	panic(err)
	// }

	// sdblist, err := ldb.ConnectSessionDB(handler.config)
	// if err != nil {
	// 	fmt.Println("Error ConnectSessionDB Msg:", err.Error())
	// 	panic(err)
	// }

	ldb.AccountDB = adb
	//ldb.SessionDBList = sdblist
	//ldb.GameDBList = gdb

	handler.Ldb = ldb

}

func Status(config *config.Config, c *gin.Context) {

	c.JSON(http.StatusOK, config)

}

func (handler *Handler) GetTableColumnInfo() []TableInfo { //[]TableInfo {

	//resultarray := make([]ResultCharacterList, 0)

	gamedb, b := handler.Ldb.GameDBList.GetGameDB("A")
	if b != true {
		fmt.Println("error get gamedb")
	}

	tableinfo, _ := gamedb.GetTableColumnInfo()

	tablemap := make(map[string][]ColumnInfo)

	for k, v := range tableinfo {
		fmt.Println("key", k)
		fmt.Println("value", v)

		colinfo := ColumnInfo{}

		colinfo.ColumnName = v.ColumnName
		colinfo.ColumnType = v.ColumnType
		colinfo.ColumnComment = v.ColumnComment
		colinfo.ColumnKey = v.ColumnKey

		columninfo := tablemap[v.TableName]

		columninfo = append(columninfo, colinfo)

		tablemap[v.TableName] = columninfo

	}

	tableinfoarr := []TableInfo{}

	for k, v := range tablemap {

		tableinfo := TableInfo{}
		tableinfo.TableName = k
		tableinfo.ColumnInfo = v

		tableinfoarr = append(tableinfoarr, tableinfo)
	}

	fmt.Println(tableinfoarr)

	return tableinfoarr

}

func (handler *Handler) ScrapCollyFIFA() error {
	rankaddress := make([]string, 0)

	newcolly := colly.NewCollector()

	newcolly.OnHTML("ul.fi-ranking-schedule__nav", func(e *colly.HTMLElement) {
		//	e.Request.Visit(e.Attr("href"))

		ulbody := e.DOM.Find("li")

		//fmt.Println("ulbody", ulbody.Text())

		ulbody.Children().Each(func(i int, s *goquery.Selection) {

			//ahref := e.DOM.Find("a")

			//valuestring, _ := ahref.Attr("href")
			valuestring, _ := s.Attr("href")
			//time.Sleep(time.Second * 5)
			//fmt.Println("ahref", valuestring, b)
			fmt.Println("ahref s.Text", s.Text())
			fmt.Println("ahref s.Attr", valuestring)

			rankaddress = append(rankaddress, valuestring)
			//e.Request.Visit("https://www.fifa.com" + valuestring)
			//detailcolly.Visit("https://www.fifa.com" + valuestring)
			//fmt.Println("s.text", s.Text())
			//fmt.Println("find href", s.Find("a").Text())
		})

		//fmt.Println("ulbody", ulbody)
	})

	newcolly.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	newcolly.Visit("https://www.fifa.com/fifa-world-ranking/ranking-table/men/#AFC")

	//////////////////////////////////////////////////////////////////////////
	detailcolly := colly.NewCollector()

	/*<div class="fi-selected-item">25 July 2019</div>*/
	detailcolly.OnHTML("body.fifa-world-ranking", func(e *colly.HTMLElement) {

		NowData := e.DOM.Find("div.fi-selected-item")
		fmt.Println("tr#data-team-id", NowData.Text())

		tbody := e.DOM.Find("tbody")

		tbody.Children().Each(func(i int, s *goquery.Selection) {

			// rankstring := ""
			// countrystring := ""
			// countrysmallstring := ""
			// regionstring := ""
			// pointsstring := ""

			// rank := s.Find(".fi-table__rank span")
			// if rank.Text() != "" {
			// 	//fmt.Println("Rank : ", rank.Text())
			// 	rankstring = rank.Text()
			// }

			// country := s.Find("div.fi-t__n span.fi-t__nText")
			// if country.Text() != "" {
			// 	//fmt.Println("Country : ", country.Text())
			// 	countrystring = country.Text()
			// }

			// countrysmall := s.Find("div.fi-t__n span.fi-t__nTri")
			// if countrysmall.Text() != "" {
			// 	//fmt.Println("Country : ", countrysmall.Text())
			// 	countrysmallstring = countrysmall.Text()
			// }

			// region := s.Find("td.fi-table__confederation span")
			// if region.Text() != "" {
			// 	//fmt.Println("region : ", region.Text())
			// 	regionstring = region.Text()
			// }

			// points := s.Find("td.fi-table__points span")
			// if points.Text() != "" {
			// 	//fmt.Println("region : ", region.Text())
			// 	pointsstring = points.Text()
			// }

			// err := handler.Ldb.AccountDB.SetDataFifa(NowData.Text(), rankstring, countrystring, countrysmallstring, regionstring, pointsstring)
			// if err != nil {
			// 	fmt.Println("----------------------------- SetDataFile Error : ", err.Error())
			// }
			// fmt.Println("List : ", NowData.Text(), rankstring, countrystring, countrysmallstring, regionstring, pointsstring)
		})
	})

	detailcolly.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	//fmt.Println("rankaddress", rankaddress)

	for key, value := range rankaddress {

		fmt.Println(" k", key)
		fmt.Println(" v", value)
		detailcolly.Visit("https://www.fifa.com" + value + "#AFC")
		time.Sleep(time.Second * 5)
	}

	return nil

}

// regexp 를 안쓰고 slice 로 데이터를 뽑아 내려고 한 내용
func ParsingStr(v string) CountryInfo {

	countryinfo := CountryInfo{}
	trimv := strings.TrimSpace(v)
	start1 := strings.Index(trimv, " ")
	start1 = start1 + 1
	end1 := strings.Index(trimv, "명")

	cm := regexp.MustCompile("[0-9]+")

	fmt.Println("cm.FindString(trimv) : ", cm.FindAllString(trimv, -1))
	countryname := trimv[:start1] // 국가명
	fmt.Println("countryname ", countryname)
	countryinfo.CountryName = countryname

	cnt1str := trimv[start1:end1]
	cnt1str = strings.TrimSpace(cnt1str)
	fmt.Println("cnt1str", cnt1str)
	cnt1int, err := strconv.Atoi(cnt1str)
	if err != nil {
		fmt.Println("strconv.Atoi(cnt1str) Error :  ", err.Error())
		countryinfo.Cnt1 = -99
	} else {
		countryinfo.Cnt1 = cnt1int
	}

	// 뒤에 괄호가 없을때를 처리 해야한다
	start2 := strings.LastIndex(trimv, " ")
	end2 := strings.LastIndex(trimv, ")")
	if start2 == -1 || end2 == -1 {
		//fmt.Println("str1start2 == -1 || str1end2 == -1 ")
		countryinfo.Cnt2 = 0
	} else {

		cnt2str := trimv[start2:end2]
		cnt2str = strings.TrimSpace(cnt2str)
		cnt2str = strings.Replace(cnt2str, "명", "", 0)
		cnt2int, err := strconv.Atoi(cnt2str)
		if err != nil {
			fmt.Println("strconv.Atoi(cnt2str) Error :  ", err.Error())
			countryinfo.Cnt2 = -99
		} else {
			countryinfo.Cnt2 = cnt2int
		}
	}
	return countryinfo

}

// func ParsingStrRegexp(v string) CountryInfo {

// 	countryinfo := CountryInfo{}
// 	trimv := strings.TrimSpace(v)
// 	// start1 := strings.Index(trimv, " ")
// 	// start1 = start1 + 1
// 	// end1 := strings.Index(trimv, "명")
// 	replacestr := strings.ReplaceAll(trimv, ",", "")
// 	// 숫자만 찾아 낸다

// 	cmcountry := regexp.MustCompile("[가-힣]+")
// 	stringarray := cmcountry.FindAllString(replacestr, -1)

// 	for k, v := range stringarray {

// 		if k == 0 {

// 			countryinfo.CountryName = v
// 		}
// 	}
// 	cm := regexp.MustCompile("[0-9]+")
// 	numberarray := cm.FindAllString(replacestr, -1)

// 	for k, v := range numberarray {
// 		if k == 0 {
// 			cnt1, err := strconv.Atoi(v)
// 			if err != nil {
// 				fmt.Println("cnt1 , err := strconv.Atoi(v) Error :  ", err.Error())
// 			}
// 			countryinfo.Cnt1 = cnt1
// 		}

// 		if k == 1 {
// 			cnt2, err := strconv.Atoi(v)
// 			if err != nil {
// 				fmt.Println("cnt2 , err := strconv.Atoi(v) Error :  ", err.Error())
// 			}

// 			countryinfo.Cnt2 = cnt2

// 		}
// 	}

// fmt.Println("cm.FindString(trimv) : ", cm.FindAllString(trimv, -1))
// countryname := trimv[:start1] // 국가명
// fmt.Println("countryname ", countryname)
// countryinfo.CountryName = countryname

// cnt1str := trimv[start1:end1]
// cnt1str = strings.TrimSpace(cnt1str)
// fmt.Println("cnt1str", cnt1str)
// cnt1int, err := strconv.Atoi(cnt1str)
// if err != nil {
// 	fmt.Println("strconv.Atoi(cnt1str) Error :  ", err.Error())
// 	countryinfo.Cnt1 = -99
// } else {
// 	countryinfo.Cnt1 = cnt1int
// }

// // 뒤에 괄호가 없을때를 처리 해야한다
// start2 := strings.LastIndex(trimv, " ")
// end2 := strings.LastIndex(trimv, ")")
// if start2 == -1 || end2 == -1 {
// 	//fmt.Println("str1start2 == -1 || str1end2 == -1 ")
// 	countryinfo.Cnt2 = 0
// } else {

// 	cnt2str := trimv[start2:end2]
// 	cnt2str = strings.TrimSpace(cnt2str)
// 	cnt2str = strings.Replace(cnt2str, "명", "", 0)
// 	cnt2int, err := strconv.Atoi(cnt2str)
// 	if err != nil {
// 		fmt.Println("strconv.Atoi(cnt2str) Error :  ", err.Error())
// 		countryinfo.Cnt2 = -99
// 	} else {
// 		countryinfo.Cnt2 = cnt2int
// 	}
// }
// 	return countryinfo

// }

func (handler *Handler) ScrapCollyCorona() Main {
	fmt.Println(" why ???????????????????????????????????????????????????")

	newcolly := colly.NewCollector()

	newcolly.Limit(&colly.LimitRule{
		//DomainGlob:  ".*edmundmartin.*",
		Parallelism: 1,
		Delay:       5 * time.Second,
	})

	main := Main{}
	newcolly.OnHTML("div.bv_content", func(e *colly.HTMLElement) {

		fmt.Println("ddddddddddd")
		//fmt.Println("e.Dom", e.DOM)

		title := e.DOM.Find(".s_descript")

		maininfo := MainInfo{}
		title.Each((func(i int, s *goquery.Selection) {

			if i == 0 { // 국내 발생 현황
				fmt.Println("제목 : ", i, s.Text())

				koreastr := s.Text()
				//코로나바이러스감염증-19 국내 발생 현황(2.24일 16시 기준)
				// 마지막 괄호뒤를 찾아 낸다
				pos := strings.LastIndex(koreastr, "(")

				fmt.Println("--------------------- koreastr[pos:", koreastr[pos:])

				cm := regexp.MustCompile("[0-9]+")
				numberarray := cm.FindAllString(koreastr[pos:], -1)

				for k, v := range numberarray {
					if k == 0 { // 월
						month, err := strconv.Atoi(v)
						if err != nil {
							fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
						}

						maininfo.KoreaMonth = month
					}

					if k == 1 { //일
						day, err := strconv.Atoi(v)
						if err != nil {
							fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
						}
						maininfo.KoreaDay = day
					}

					if k == 2 { // 시
						hour, err := strconv.Atoi(v)
						if err != nil {
							fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
						}
						maininfo.KoreaHour = hour
					}
				}

				fmt.Println("국내 발생 현황 numberarray : ", numberarray)

			}

			// if i == 2 { // 국외 발생 현황
			// 	fmt.Println("제목 : ", i, s.Text())
			// 	abroadstr := s.Text()

			// 	//pos := strings.LastIndex(abroadstr, "(")

			// 	abroadstr = strings.Replace(abroadstr, ",", "", 2)

			// 	//fmt.Println("abroad[pos:", abroadstr[pos:])
			// 	fmt.Println("abroadstr ", abroadstr)

			// 	cm := regexp.MustCompile("[0-9]+")
			// 	//numberarray := cm.FindAllString(abroadstr[pos:], -1)
			// 	numberarray := cm.FindAllString(abroadstr, -1)

			// 	for k, v := range numberarray {

			// 		if k == 1 { // 월
			// 			worldcnt, err := strconv.Atoi(v)
			// 			if err != nil {
			// 				fmt.Println("strconv.Atoi(numberarray) err worldcnt1 ", i, v, err.Error())
			// 			}

			// 			maininfo.WorldCnt1 = worldcnt
			// 		}

			// 		if k == 2 { // 월
			// 			worldcnt2, err := strconv.Atoi(v)
			// 			if err != nil {
			// 				fmt.Println("strconv.Atoi(numberarray) err worldcnt2 ", i, v, err.Error())
			// 			}

			// 			maininfo.WorldCnt2 = worldcnt2
			// 		}

			// 		if k == 3 { // 월
			// 			month, err := strconv.Atoi(v)
			// 			if err != nil {
			// 				fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
			// 			}

			// 			maininfo.AbroadMonth = month
			// 		}

			// 		if k == 4 { //일
			// 			day, err := strconv.Atoi(v)
			// 			if err != nil {
			// 				fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
			// 			}
			// 			maininfo.AbroadDay = day
			// 		}

			// 		if k == 5 { // 시
			// 			hour, err := strconv.Atoi(v)
			// 			if err != nil {
			// 				fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
			// 			}
			// 			maininfo.AbroadHour = hour
			// 		}
			// 	}

			// 	//fmt.Println("해외 발생 현황 numberarray : ", numberarray)

			// }

		}))

		blwrap := e.DOM.Find(".data_table")

		countryinfolist := []CountryInfo{}
		blwrap.Each(func(i int, s *goquery.Selection) {

			if i == 0 {
				//fmt.Println("Text -------------------------------------- : ", i, s.Text())
				// 국내
				//fmt.Println("국내 ALL: ", s.Text())
				li := s.Find("tr")
				//countryinfo := CountryInfo{}
				//countryinfo.CountryName = "대한민국"

				li.Each(func(y int, s *goquery.Selection) {

					if y < 4 { // 해외 국가 뺀다

						cnt1 := s.Text()
						cnt1 = strings.Replace(cnt1, ",", "", 1)

						cm := regexp.MustCompile("[0-9]+")
						numberarray := cm.FindString(cnt1)

						cnt1int, err := strconv.Atoi(numberarray)
						if err != nil {
							fmt.Println(".data_table strconv.Atoi(numberarray) err ", err.Error())
						}
						//countryinfo.Cnt1 = cnt1int
						if y == 0 {
							maininfo.KoreaCnt1 = cnt1int
							fmt.Println("KoreaCnt1: ", cnt1int)
						} else if y == 1 {
							maininfo.KoreaCnt2 = cnt1int
							fmt.Println("KoreaCnt2: ", cnt1int)
						} else if y == 2 {
							maininfo.KoreaCnt3 = cnt1int
							fmt.Println("KoreaCnt3: ", cnt1int)
						} else if y == 3 {
							maininfo.KoreaCnt4 = cnt1int
							fmt.Println("KoreaCnt4: ", cnt1int)
						}
					}

				})

				//countryinfolist = append(countryinfolist, countryinfo)

			}

		})

		main.CountryInfo = countryinfolist
		main.MainInfo = maininfo
		//fmt.Println("countryinfolist", countryinfolist)

		// Example Goquery usage
		//fmt.Println("test", goquerySelection.Find("bl_body").Children().Text())
	})

	newcolly.OnRequest(func(r *colly.Request) {
		fmt.Println("test r ", r.Body)
		fmt.Println("Visiting", r.URL)
		//fmt.Println("r.Body", r.Body)

	})

	newcolly.Visit("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=")

	return main
}

func (handler *Handler) GetCoronaDataGroupExample() ResultGroupData {

	updatetime := handler.Ldb.AccountDB.GetGroupExampleMaxDate()
	fmt.Println("GetCoronaDataGroupExample updatetime : ", updatetime)
	worldlist := handler.Ldb.AccountDB.GetGroupExample(updatetime)
	groupdata := ResultGroupData{}
	groupdata.UpdateTime = updatetime

	regiongrouplist := []RegionGroup{}
	for k, v := range worldlist {
		fmt.Println("k : ", k, v)

		regiongroup := RegionGroup{}

		totalcnt := *v.TotalCnt
		groupcnt := *v.Groupcnt
		etccnt := *v.ETCCnt
		regiongroup.Region = *v.Region
		regiongroup.TotalCnt = totalcnt
		regiongroup.Groupcnt = groupcnt
		regiongroup.ETCCnt = etccnt

		//fmt.Println("v.DetailString , ", *v.DetailString)

		groupdataillist := []GroupDetail{}

		if *v.DetailString != "0" {

			detailarray := strings.Split(*v.DetailString, ",")

			for _, b := range detailarray {
				groupdetail := GroupDetail{}

				pos := strings.Index(b, "(")
				//fmt.Println("ddddddddd ", b, pos)
				detailstr := b[:pos]

				groupdetail.DetailStr = detailstr

				cm := regexp.MustCompile("[0-9]+")
				numberarray := cm.FindAllString(b, -1)

				valuestr := numberarray[0]

				valuecnt, err := strconv.Atoi(valuestr)
				if err != nil {
					fmt.Println("detailarray AtoI Error :", valuestr, err.Error())
					valuecnt = 0
				}

				percentstr := PercentageChangeString(totalcnt, valuecnt)
				groupdetail.Cnt = valuecnt
				groupdetail.Percentage = percentstr
				groupdataillist = append(groupdataillist, groupdetail)

				groupcnt = groupcnt - valuecnt
			}

			if groupcnt > 0 {
				// 집단 남은 것 처리
				groupremain := GroupDetail{}
				groupremain.DetailStr = "집단 등"
				groupremain.Cnt = groupcnt
				remainstr := PercentageChangeString(totalcnt, groupcnt)
				groupremain.Percentage = remainstr

				groupdataillist = append(groupdataillist, groupremain)
			}
		}
		//ETC CNT 처리
		groupdetailetc := GroupDetail{}
		groupdetailetc.DetailStr = "기타"
		groupdetailetc.Cnt = etccnt
		percentstr := PercentageChangeString(totalcnt, etccnt)
		groupdetailetc.Percentage = percentstr

		groupdataillist = append(groupdataillist, groupdetailetc)

		regiongroup.Detail = groupdataillist

		regiongrouplist = append(regiongrouplist, regiongroup)

	}

	groupdata.RegionGroup = regiongrouplist

	return groupdata

}

func (handler *Handler) GetCoronaDataWorldStatus() ResultData4 {

	updatetime := handler.Ldb.AccountDB.GetWorldstatusMaxDate()

	worldlist := handler.Ldb.AccountDB.GetWorldStatusList(updatetime)

	result := ResultData4{}

	result.WorldListInfo = worldlist

	return result

}
func (handler *Handler) GetCoronaDataKoreaRealTime() ResultData3 {

	idx := handler.Ldb.AccountDB.GetKoreaRealTimestatusIdx()

	korearealtimestatus := handler.Ldb.AccountDB.GetKoreaRealTimestatus(idx)

	result := ResultData3{}

	result.KoreaRealTime = korearealtimestatus

	return result

}

func (handler *Handler) GetCoronaDataWorldRealTime() ResultDataWorldRealTimeList {

	//idx := handler.Ldb.AccountDB.GetKoreaRealTimestatusIdx()

	worldrealtimestatus := handler.Ldb.AccountDB.GetWorldRealTimeList()
	//fmt.Println("GetCoronaDataWorldRealTime worldrealtimestatus", worldrealtimestatus)
	result := ResultDataWorldRealTimeList{}

	result.WorldRealTimeListInfo = worldrealtimestatus

	return result

}

func (handler *Handler) GetCoronaDataKorea() ResultData2 {

	updatetime := handler.Ldb.AccountDB.GetkoreaMaxDate()

	koreastatus := handler.Ldb.AccountDB.Getkoreastatus(updatetime)

	secondinfo := SecondInfo{}

	secondinfo.KoreaUpdateTime = updatetime
	secondinfo.KoreaMonth = *koreastatus.KoreaMonth
	secondinfo.KoreaDay = *koreastatus.KoreaDay
	secondinfo.KoreaHour = *koreastatus.KoreaHour

	secondinfo.KoreaCnt1 = *koreastatus.KoreaCnt1
	secondinfo.KoreaCnt2 = *koreastatus.KoreaCnt2
	secondinfo.KoreaCnt3 = *koreastatus.KoreaCnt3
	secondinfo.KoreaCnt4 = *koreastatus.KoreaCnt4

	koreastatuslist := handler.Ldb.AccountDB.Getkoreahistory(updatetime)

	resultdata2 := ResultData2{}

	resultdata2.SecondInfo = secondinfo
	resultdata2.KoreaListInfo = koreastatuslist

	return resultdata2

}

func (handler *Handler) GetCoronaData1() ResultData1 {

	updatetime := handler.Ldb.AccountDB.GetkoreaMaxDate()

	koreastatus := handler.Ldb.AccountDB.Getkoreastatus(updatetime)

	fmt.Println("KoreaStatus", koreastatus)

	maininfo := MainInfo{}

	maininfo.KoreaUpdateTime = updatetime
	maininfo.KoreaMonth = *koreastatus.KoreaMonth
	maininfo.KoreaDay = *koreastatus.KoreaDay
	maininfo.KoreaHour = *koreastatus.KoreaHour

	maininfo.KoreaCnt1 = *koreastatus.KoreaCnt1
	maininfo.KoreaCnt2 = *koreastatus.KoreaCnt2
	maininfo.KoreaCnt3 = *koreastatus.KoreaCnt3
	maininfo.KoreaCnt4 = *koreastatus.KoreaCnt4

	worldupdatetime := handler.Ldb.AccountDB.GetWorldMaxDate()

	maininfo.AbroadUpdateTime = worldupdatetime

	worldnowstatus := handler.Ldb.AccountDB.GetWorldNowStatus(worldupdatetime)

	maininfo.AbroadMonth = *worldnowstatus.WorldMonth
	maininfo.AbroadDay = *worldnowstatus.WorldDay
	maininfo.AbroadHour = *worldnowstatus.WorldHour

	maininfo.WorldCnt1 = *worldnowstatus.WorldCnt1
	maininfo.WorldCnt2 = *worldnowstatus.WorldCnt3
	worldlist := handler.Ldb.AccountDB.GetWorldList(worldupdatetime)

	resultdata1 := ResultData1{}

	resultdata1.MainInfo = maininfo
	resultdata1.WorldStatus = worldlist

	return resultdata1

}

func (handler *Handler) GetManWomanAgeCountCorona() ResultDataManWomanAge {

	resultdatamanwomanage := ResultDataManWomanAge{}

	idx := handler.Ldb.AccountDB.GetManWomanstatusIdx()

	manwomanstatus := handler.Ldb.AccountDB.GetManWomanstatus(idx)

	resultdatamanwomanage.MWdateTime = *manwomanstatus.UpdateTime
	//resultdatamanwomanage.MWMonth = *manwomanstatus.Month
	//resultdatamanwomanage.MWDay = *manwomanstatus.Day
	resultdatamanwomanage.MWHour = *manwomanstatus.Hour
	fmt.Println("ManWoman", manwomanstatus)
	fmt.Println("manwomanstatus :ManCnt ", *manwomanstatus.ManCnt)
	mancntstr := *manwomanstatus.ManCnt
	mancntarray := strings.Split(mancntstr, ",")
	// cnt1, err := strconv.Atoi(strings.TrimSpace(mancntarray[0]))
	// if err != nil {
	// 	fmt.Println("strconv.atoi : error :", err.Error())
	// }
	// cnt2, _ := strconv.Atoi(strings.TrimSpace(mancntarray[1]))
	// cnt3, _ := strconv.Atoi(strings.TrimSpace(mancntarray[2]))
	// cnt4, _ := strconv.Atoi(strings.TrimSpace(mancntarray[3]))

	manwomanlist := []ManWomanList{}
	man := ManWomanList{1, mancntarray[0], mancntarray[1], mancntarray[2], mancntarray[3]}
	manwomanlist = append(manwomanlist, man)
	fmt.Println("manwomanstatus :WomanCnt ", *manwomanstatus.WomanCnt)
	womancntstr := *manwomanstatus.WomanCnt
	womancntarray := strings.Split(womancntstr, ",")

	fmt.Println("manwomanstatus :womancntarray[0] ", womancntarray[0])
	fmt.Println("manwomanstatus :womancntarray[1] ", womancntarray[1])
	fmt.Println("manwomanstatus :womancntarray[2] ", womancntarray[2])
	fmt.Println("manwomanstatus :womancntarray[3] ", womancntarray[3])

	// wcnt1, _ := strconv.Atoi(strings.TrimSpace(womancntarray[0]))
	// wcnt2, _ := strconv.Atoi(strings.TrimSpace(womancntarray[1]))
	// wcnt3, _ := strconv.Atoi(strings.TrimSpace(womancntarray[2]))
	// wcnt4, _ := strconv.Atoi(strings.TrimSpace(womancntarray[3]))

	woman := ManWomanList{2, womancntarray[0], womancntarray[1], womancntarray[2], womancntarray[3]}
	manwomanlist = append(manwomanlist, woman)

	resultdatamanwomanage.ManWomanList = manwomanlist

	ageidx := handler.Ldb.AccountDB.GetAgestatusIdx()

	agestatus := handler.Ldb.AccountDB.GetAgestatus(ageidx)

	resultdatamanwomanage.AgeUpdateTime = *agestatus.UpdateTime
	//resultdatamanwomanage.AgeMonth = *agestatus.Month
	//resultdatamanwomanage.AgeDay = *agestatus.Day
	resultdatamanwomanage.AgeHour = *agestatus.Hour

	fmt.Println("agestatus", agestatus)

	agelist := []AgeList{}

	fmt.Println("*agestatus.Cnt0", *agestatus.Cnt0)
	age0 := GetAgeCnt(0, *agestatus.Cnt0)
	agelist = append(agelist, age0)

	age10 := GetAgeCnt(10, *agestatus.Cnt10)
	agelist = append(agelist, age10)
	age20 := GetAgeCnt(20, *agestatus.Cnt20)
	agelist = append(agelist, age20)
	age30 := GetAgeCnt(30, *agestatus.Cnt30)
	agelist = append(agelist, age30)
	age40 := GetAgeCnt(40, *agestatus.Cnt40)
	agelist = append(agelist, age40)
	age50 := GetAgeCnt(50, *agestatus.Cnt50)
	agelist = append(agelist, age50)
	age60 := GetAgeCnt(60, *agestatus.Cnt60)
	agelist = append(agelist, age60)
	age70 := GetAgeCnt(70, *agestatus.Cnt70)
	agelist = append(agelist, age70)
	age80 := GetAgeCnt(80, *agestatus.Cnt80)
	agelist = append(agelist, age80)

	resultdatamanwomanage.AgeList = agelist

	return resultdatamanwomanage

}

func GetAgeCnt(age int, cnt string) AgeList {

	cnt0array := strings.Split(cnt, ",")

	cnt1 := 0
	cnt2 := 0
	cnt1, err := strconv.Atoi(strings.TrimSpace(cnt0array[0]))
	if err != nil {
		cnt1 = 0
	}
	cnt2, err = strconv.Atoi(strings.TrimSpace(cnt0array[1]))
	if err != nil {
		cnt2 = 0
	}
	age0 := AgeList{age, cnt1, cnt2}
	return age0

}

func (handler *Handler) ScrapCoronaAndDBSave() error {

	maininfo := handler.ScrapCollyCorona()

	fmt.Println("maininfo : ", maininfo)
	//maininfo.MainInfo.KoreaMonth
	var koreastatus KoreaStatus

	koreastatus.KoreaMonth = &maininfo.MainInfo.KoreaMonth
	koreastatus.KoreaDay = &maininfo.MainInfo.KoreaDay
	koreastatus.KoreaHour = &maininfo.MainInfo.KoreaHour
	koreastatus.KoreaCnt1 = &maininfo.MainInfo.KoreaCnt1
	koreastatus.KoreaCnt2 = &maininfo.MainInfo.KoreaCnt2
	koreastatus.KoreaCnt3 = &maininfo.MainInfo.KoreaCnt3
	koreastatus.KoreaCnt4 = &maininfo.MainInfo.KoreaCnt4

	//updatetime := time.Date(2020, time.Month(maininfo.MainInfo.KoreaMonth), maininfo.MainInfo.KoreaDay, maininfo.MainInfo.KoreaHour, 0, 0, 0, time.Local)

	updatetimestr := fmt.Sprintf("2020-%02d-%02d", maininfo.MainInfo.KoreaMonth, maininfo.MainInfo.KoreaDay)

	koreastatus.UpdateTime = &updatetimestr
	fmt.Println("koreastatus", koreastatus)

	err := handler.Ldb.AccountDB.SetKoreaStatus(koreastatus)
	// if err != nil {
	// 	return err
	// }
	if err != nil {
		fmt.Println("handler.Ldb.AccountDB.SetKoreaStatus(koreastatus) Error : ", err.Error())
	}
	//abroadmonth := maininfo.MainInfo.AbroadMonth
	//abroadday := maininfo.MainInfo.AbroadDay
	//abroadhour := maininfo.MainInfo.AbroadHour

	// var worldnowstatus WorldNowStatus

	// worldnowstatus.WorldMonth = &abroadmonth
	// worldnowstatus.WorldDay = &abroadday
	// worldnowstatus.WorldHour = &abroadhour
	// worldnowstatus.WorldCnt1 = &maininfo.MainInfo.WorldCnt1
	// worldnowstatus.WorldCnt3 = &maininfo.MainInfo.WorldCnt2

	// updatetimestrworldnow := fmt.Sprintf("2020-%02d-%02d", abroadmonth, abroadday)

	// worldnowstatus.UpdateTime = &updatetimestrworldnow

	// err = handler.Ldb.AccountDB.SetWorldNowStatus(worldnowstatus)
	// if err != nil {
	// 	fmt.Println("handler.Ldb.AccountDB.SetKoreaStatus(koreastatus) Error : ", err.Error())
	// }

	// for _, v := range maininfo.CountryInfo {

	// 	var worldstatus WorldStatus
	// 	worldstatus.AbroadMonth = &abroadmonth
	// 	worldstatus.AbroadDay = &abroadday
	// 	worldstatus.AbroadHour = &abroadhour

	// 	worldstatus.CountryName = &v.CountryName
	// 	worldstatus.AbroadCnt1 = &v.Cnt1
	// 	worldstatus.AbroadCnt3 = &v.Cnt2

	// 	//updatetime := time.Date(2020, time.Month(abroadmonth), abroadday, abroadhour, 0, 0, 0, time.Local)

	// 	updatetimestr := fmt.Sprintf("2020-%02d-%02d", abroadmonth, abroadday)

	// 	worldstatus.UpdateTime = &updatetimestr

	// 	//fmt.Println("k , v ", k, v)
	// 	err := handler.Ldb.AccountDB.SetWorldStatus(worldstatus)

	// 	if err != nil {
	// 		fmt.Println("maininfo.CountryInfo Error : ", abroadmonth, abroadday, abroadhour, v.CountryName, err.Error())
	// 	}
	// }

	return nil

}

// 최신 날짜만 업데이트
func (handler *Handler) WorldStatusUpdate() error {

	err := handler.WorldStatusConfirmUpdate()
	if err != nil {
		fmt.Println("WorldStatusConfirmUpdate ", err.Error())
	}

	err = handler.WorldStatusDeathUpdate()
	if err != nil {
		fmt.Println("WorldStatusConfirmUpdate ", err.Error())
	}

	return nil

}

// 최신 날짜만 업데이트 확진자만
func (handler *Handler) WorldStatusConfirmUpdate() error {

	file, _ := os.Open("D:/Github/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv")
	//file, _ := os.Open("D:/Github/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv")

	// csv reader 생성
	rdr := csv.NewReader(bufio.NewReader(file))

	// csv 내용 모두 읽기
	rows, _ := rdr.ReadAll()

	datemap := make(map[int]string, 0)

	// 행,열 읽기
	for i, row := range rows {

		for j := range row {

			if i == 0 && j <= 3 {

				datemap[j] = "pass"
			}
			if i == 0 && j > 3 {
				fmt.Printf("i=%d , j= %d , rows=%s \n", i, j, rows[0][j])
				rowsarr := strings.Split(rows[0][j], "/")
				yearstr := "20" + rowsarr[2]
				monthstr := rowsarr[0]
				if len(monthstr) == 1 {
					monthstr = "0" + monthstr

				}

				daystr := rowsarr[1]

				if len(daystr) == 1 {
					daystr = "0" + daystr

				}

				datestr := yearstr + "-" + monthstr + "-" + daystr

				datemap[j] = datestr
			}
		}
	}

	fmt.Println("datemap ", datemap)
	fmt.Println("datemap ", len(datemap))
	fmt.Println("datemap [len]", datemap[len(datemap)])
	fmt.Println("datemap [len-1]", datemap[len(datemap)-1])

	lastmap := len(datemap) - 1
	lastmap2 := len(datemap) - 2
	// 행,열 읽기
	for i, _ := range rows {

		if i == 0 {
			continue // 첫라인 패스

		}
		Province := rows[i][0]
		CountryName := rows[i][1]
		Lat := rows[i][2]
		Lon := rows[i][3]
		updatetime := datemap[lastmap]
		value := rows[i][lastmap]

		worldstatus := WorldStatus{}

		worldstatus.Province = &Province
		worldstatus.CountryName = &CountryName
		worldstatus.Lat = &Lat
		worldstatus.Lon = &Lon
		worldstatus.UpdateTime = &updatetime

		valueint, err := strconv.Atoi(value)
		if err != nil {
			fmt.Println("valueint error : ", value, err.Error())
			valueint = 0
		}

		worldstatus.ConfirmValue = &valueint
		//worldstatus.DeathValue = &valueint

		err = handler.Ldb.AccountDB.SetWorldStatus(worldstatus)
		//		err = handler.Ldb.AccountDB.SetWorldStatusDeath(worldstatus)

		if err != nil {
			fmt.Println("SetWorldStatus Error : ", err.Error())
		}

		updatetime2 := datemap[lastmap2]
		value2 := rows[i][lastmap2]

		worldstatus2 := WorldStatus{}

		worldstatus2.Province = &Province
		worldstatus2.CountryName = &CountryName
		worldstatus2.Lat = &Lat
		worldstatus2.Lon = &Lon
		worldstatus2.UpdateTime = &updatetime2

		valueint2, err := strconv.Atoi(value2)
		if err != nil {
			fmt.Println("valueint error : ", value, err.Error())
			valueint = 0
		}

		worldstatus2.ConfirmValue = &valueint2

		err = handler.Ldb.AccountDB.SetWorldStatus(worldstatus2)
		//		err = handler.Ldb.AccountDB.SetWorldStatusDeath(worldstatus)

		if err != nil {
			fmt.Println("SetWorldStatus worldstatus2 Error : ", err.Error())
		}

	}

	return nil

}

// 최신 날짜만 업데이트 사망자만
func (handler *Handler) WorldStatusDeathUpdate() error {

	//file, _ := os.Open("D:/Github/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv")
	file, _ := os.Open("D:/Github/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv")

	// csv reader 생성
	rdr := csv.NewReader(bufio.NewReader(file))

	// csv 내용 모두 읽기
	rows, _ := rdr.ReadAll()

	datemap := make(map[int]string, 0)

	// 행,열 읽기
	for i, row := range rows {

		for j := range row {

			if i == 0 && j <= 3 {

				datemap[j] = "pass"
			}
			if i == 0 && j > 3 {
				fmt.Printf("i=%d , j= %d , rows=%s \n", i, j, rows[0][j])
				rowsarr := strings.Split(rows[0][j], "/")
				yearstr := "20" + rowsarr[2]
				monthstr := rowsarr[0]
				if len(monthstr) == 1 {
					monthstr = "0" + monthstr

				}

				daystr := rowsarr[1]

				if len(daystr) == 1 {
					daystr = "0" + daystr

				}

				datestr := yearstr + "-" + monthstr + "-" + daystr

				datemap[j] = datestr
			}
		}
	}

	fmt.Println("datemap ", datemap)
	fmt.Println("datemap ", len(datemap))
	fmt.Println("datemap [len]", datemap[len(datemap)])
	fmt.Println("datemap [len-1]", datemap[len(datemap)-1])

	lastmap := len(datemap) - 1
	lastmap2 := len(datemap) - 2
	// 행,열 읽기
	for i, _ := range rows {

		if i == 0 {
			continue // 첫라인 패스

		}
		Province := rows[i][0]
		CountryName := rows[i][1]
		Lat := rows[i][2]
		Lon := rows[i][3]
		updatetime := datemap[lastmap]
		value := rows[i][lastmap]

		worldstatus := WorldStatusDeath{}

		worldstatus.Province = &Province
		worldstatus.CountryName = &CountryName
		worldstatus.Lat = &Lat
		worldstatus.Lon = &Lon
		worldstatus.UpdateTime = &updatetime

		valueint, err := strconv.Atoi(value)
		if err != nil {
			fmt.Println("valueint error : ", value, err.Error())
			valueint = 0
		}

		worldstatus.DeathValue = &valueint

		err = handler.Ldb.AccountDB.SetWorldStatusDeath(worldstatus)
		//		err = handler.Ldb.AccountDB.SetWorldStatusDeath(worldstatus)

		if err != nil {
			fmt.Println("SetWorldStatus Error : ", err.Error())
		}

		updatetime2 := datemap[lastmap2]
		value2 := rows[i][lastmap2]

		worldstatus2 := WorldStatusDeath{}

		worldstatus2.Province = &Province
		worldstatus2.CountryName = &CountryName
		worldstatus2.Lat = &Lat
		worldstatus2.Lon = &Lon
		worldstatus2.UpdateTime = &updatetime2

		valueint2, err := strconv.Atoi(value2)
		if err != nil {
			fmt.Println("valueint error : ", value, err.Error())
			valueint = 0
		}

		//worldstatus2.ConfirmValue = &valueint2
		worldstatus2.DeathValue = &valueint2

		err = handler.Ldb.AccountDB.SetWorldStatusDeath(worldstatus2)

		if err != nil {
			fmt.Println("SetWorldStatusDeath worldstatus2 Error : ", err.Error())
		}

	}

	return nil

}

// 전체 업데이트 할때 쓴다
func (handler *Handler) WorldNewDailyUpdate() error {

	filename := "D:/Github/COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/" + "03-21-2020.csv"
	file, _ := os.Open(filename)

	// csv reader 생성
	rdr := csv.NewReader(bufio.NewReader(file))

	// csv 내용 모두 읽기
	rows, _ := rdr.ReadAll()

	// 행,열 읽기
	for i, row := range rows {

		// if i == 0 {
		// 	continue // 첫라인 패스

		// }

		Province := row[0]
		CountryName := row[1]
		LastUpdateTime := row[2]
		Confirmed := row[3]
		Deaths := row[4]
		Recovered := row[5]
		Latitude := row[6]
		Longitude := row[7]

		fmt.Println(i, Province, CountryName, LastUpdateTime, Confirmed, Deaths, Recovered, Latitude, Longitude)
		err := handler.Ldb.AccountDB.SetWorldDailyStatus(Province, CountryName, LastUpdateTime, Confirmed, Deaths, Recovered, Latitude, Longitude)

		if err != nil {
			fmt.Println("SetWorldDailyStatus Error : ", err.Error())
		}

	}

	worlddailysummary := handler.Ldb.AccountDB.GetWorldDailyStatusSummaryByCountry()

	for k, v := range worlddailysummary {
		fmt.Println("SetWorldDailyStatusSummaryByCountry k , v : ", k, v.Excelcountry, v.Confirmed, v.Deaths, v.Recovered)
		err := handler.Ldb.AccountDB.SetWorldWorldNewStatusSummary(v.Excelcountry, v.Confirmed, v.Deaths, v.Recovered)
		if err != nil {
			fmt.Println("SetWorldDailyStatus Error : ", err.Error())
		}

	}

	return nil

}

func (handler *Handler) GetCoronaDataWorldDailyNowList() ResultDataWorldNewDailyStatus {

	//idx := handler.Ldb.AccountDB.GetKoreaRealTimestatusIdx()

	worldrealtimestatus := handler.Ldb.AccountDB.GetWorldDailyNowList()

	//fmt.Println("GetCoronaDataWorldRealTime worldrealtimestatus", worldrealtimestatus)
	result := ResultDataWorldNewDailyStatus{}

	result.WorldNewStatusList = worldrealtimestatus

	return result

}

func (handler *Handler) GetCoronaDataWorldDailyNowListSummary() ResultDataWorldNewDailyStatus {

	//idx := handler.Ldb.AccountDB.GetKoreaRealTimestatusIdx()

	worldrealtimestatus := handler.Ldb.AccountDB.GetWorldDailyNowListSummary()

	//fmt.Println("GetCoronaDataWorldRealTime worldrealtimestatus", worldrealtimestatus)
	result := ResultDataWorldNewDailyStatus{}

	result.WorldNewStatusList = worldrealtimestatus

	return result

}

func (handler *Handler) GetCoronaDataWorldDailyNowListByContinent() ResultDataWorldNewDailyStatusByContinent {

	//idx := handler.Ldb.AccountDB.GetKoreaRealTimestatusIdx()
	// 유럽

	europe := handler.GetCoronaDataByContinent("유럽")
	asia := handler.GetCoronaDataByContinent("아시아")
	africa := handler.GetCoronaDataByContinent("아프리카")
	america := handler.GetCoronaDataByContinent("아메리카")
	//fmt.Println("GetCoronaDataWorldRealTime worldrealtimestatus", worldrealtimestatus)
	result := ResultDataWorldNewDailyStatusByContinent{}

	result.Europe = europe
	result.Asia = asia
	result.Africa = africa
	result.America = america

	return result

}

func (handler *Handler) GetCoronaDataByContinent(continent string) WorldNewStatusbyContinent {

	statusbycontinent := WorldNewStatusbyContinent{}

	list := handler.Ldb.AccountDB.GetWorldDailyNowListContinent(continent)

	confirmed := 0
	deaths := 0
	recovered := 0

	for _, v := range list {
		confirmed = confirmed + v.Confirmed
		deaths = deaths + v.Deaths
		recovered = recovered + v.Recovered
	}

	statusbycontinent.Totalconfirmed = confirmed
	statusbycontinent.Totaldeath = deaths
	statusbycontinent.Totalrecovered = recovered
	statusbycontinent.Worldlist = list

	return statusbycontinent

}

// 전체 업데이트 할때 쓴다
func (handler *Handler) WorldStatusSave() error {

	//file, _ := os.Open("D:/Github/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv")
	file, _ := os.Open("D:/Github/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv")

	// csv reader 생성
	rdr := csv.NewReader(bufio.NewReader(file))

	// csv 내용 모두 읽기
	rows, _ := rdr.ReadAll()

	datemap := make(map[int]string, 0)

	// 행,열 읽기
	for i, row := range rows {

		for j := range row {
			if i == 0 && j > 3 {
				fmt.Printf("i=%d , j= %d , rows=%s \n", i, j, rows[0][j])
				rowsarr := strings.Split(rows[0][j], "/")
				yearstr := "20" + rowsarr[2]
				monthstr := rowsarr[0]
				if len(monthstr) == 1 {
					monthstr = "0" + monthstr

				}

				daystr := rowsarr[1]

				if len(daystr) == 1 {
					daystr = "0" + daystr

				}

				datestr := yearstr + "-" + monthstr + "-" + daystr

				datemap[j] = datestr
			}
		}
	}

	fmt.Println("datemap ", datemap)

	// 행,열 읽기
	for i, row := range rows {

		if i == 0 {
			continue // 첫라인 패스

		}
		Province := rows[i][0]
		CountryName := rows[i][1]
		Lat := rows[i][2]
		Lon := rows[i][3]

		for j := range row {

			if j > 3 {

				//worldstatus := WorldStatus{}
				worldstatus := WorldStatusDeath{}
				worldstatus.Province = &Province
				worldstatus.CountryName = &CountryName
				worldstatus.Lat = &Lat
				worldstatus.Lon = &Lon
				datestr := datemap[j]
				worldstatus.UpdateTime = &datestr
				value := rows[i][j]

				valueint, err := strconv.Atoi(value)
				if err != nil {
					fmt.Println("valueint error : ", value, err.Error())
					valueint = 0
				}

				//worldstatus.ConfirmValue = &valueint
				worldstatus.DeathValue = &valueint

				fmt.Printf("CountryName : %s , UpdateTime :%s , Value : %d \n", CountryName, datestr, valueint)

				//err = handler.Ldb.AccountDB.SetWorldStatus(worldstatus)
				err = handler.Ldb.AccountDB.SetWorldStatusDeath(worldstatus)

				if err != nil {
					fmt.Println("SetWorldStatus Error : ", err.Error())
				}
			}

			// if i == 0 && j > 3 {
			// 	fmt.Printf("i=%d , j= %d , rows=%s \n", i, j, rows[0][j])
			// }
		}

		// fmt.Println(rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][4])
		// if rows[i][1] == "South Korea" || rows[i][1] == "Italy" || rows[i][1] == "Iran" {
		// 	fmt.Println(rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][4])
		// }

	}

	return nil

	//fmt.Println("k , v ", k, v)
	//err := handler.Ldb.AccountDB.SetWorldStatus(worldstatus)

}

func (handler *Handler) ScrapCollyBlueHouse() error {

	fmt.Println(" why ???????????????????????????????????????????????????")
	newcolly := colly.NewCollector(
		colly.AllowedDomains("www1.president.go.kr"),
	)

	newcolly.Limit(&colly.LimitRule{
		//DomainGlob:  ".*edmundmartin.*",
		Parallelism: 1,
		Delay:       5 * time.Second,
	})

	i := 0

	newcolly.OnHTML("div.bl_body", func(e *colly.HTMLElement) {
		//goquerySelection := e.DOM
		fmt.Println("ddddddddddd")
		fmt.Println("e.Dom", e.DOM)
		//fmt.Println("find bl_body", e.DOM.Find("bl_body"))

		//ulbody := e.DOM.Find("ul")
		//fmt.Println("ulbody", ulbody)

		if i > 0 {
			blwrap := e.DOM.Find(".bl_wrap")
			//fmt.Println("e.Dom.bl_wrap", blwrap.Text())
			//blwrap.Children().Each(func(i int, s *goquery.Selection) {
			blwrap.Each(func(i int, s *goquery.Selection) {
				//if i == 1 {
				//fmt.Println("sssssssssssss", s.Text())
				//fmt.Println("li", strings.TrimSpace(s.Find("li").Text()))
				//fmt.Println("div.bl_category", strings.TrimSpace(s.Find("div.bl_category").Text()))
				//list := s.Find("li")

				//category := strings.TrimSpace(s.Find("div.bl_category").Text())
				//fmt.Println("category : ", category)
				//list.Children().Each(func(i int, s *goquery.Selection) {

				//fmt.Println(s.Find("div.bl_category"))
				//fmt.Println("CATEGORY", strings.TrimSpace(s.Find("div.bl_category").Text()))
				data := ContentData{}
				category := strings.TrimSpace(s.Find(".bl_category").Text())
				//fmt.Println("SUBJECT", strings.TrimSpace(s.Find("div.bl_subject").Text()))

				subject := strings.TrimSpace(s.Find(".bl_subject").Text())

				//fmt.Println("DATE", strings.TrimSpace(s.Find("div.bl_date").Text()))

				enddate := strings.TrimSpace(s.Find(".bl_date").Text())

				//fmt.Println("AGREECOUNT", strings.TrimSpace(s.Find("div.bl_agree").Text()))

				agree := strings.TrimSpace(s.Find(".bl_agree").Text())

				//categoryreplace := strings.Replace(category, "??", " ", -1)
				categoryreplace := strings.Split(category, "  ")

				//subjectreplace := strings.TrimSpace(strings.Replace(subject, "??", "", -1))
				subjectreplace := strings.Split(subject, "  ")

				// agreereplace := strings.Replace(agree, "????", " ", -1)
				// agreereplace = strings.Replace(agreereplace, "?", " ", -1)
				// agreereplace = strings.Replace(agreereplace, ",", " ", -1)
				agreereplace := strings.Split(agree, " ")

				fmt.Println("categorycategorycategory :", categoryreplace[1])
				fmt.Println("subjectsubjectsubject :", subjectreplace[1])
				fmt.Println("enddateenddateenddate :", enddate)
				fmt.Println("agreeagreeagreeagreeagree :", agreereplace[1])

				agreeint, _ := strconv.Atoi(agreereplace[1])

				//fmt.Println(categoryreplace) //, subject, date, agree)

				data.Category = categoryreplace[1]
				data.Subject = subjectreplace[1]
				data.EndDate = enddate
				data.Agree = agreeint

				fmt.Println("data :", data)
				//struct ? ??? json ??

				//})

			})
		}

		i = i + 1

		// Example Goquery usage
		//fmt.Println("test", goquerySelection.Find("bl_body").Children().Text())
	})

	newcolly.OnRequest(func(r *colly.Request) {
		fmt.Println("test r ", r.Body)
		fmt.Println("Visiting", r.URL)
		//fmt.Println("r.Body", r.Body)

	})

	newcolly.Visit("https://www1.president.go.kr/petitions/best/")

	return nil
}

func (handler *Handler) GetCoronaDataByRoyLabData() ResultDataWorldNewDailyStatus {

	//idx := handler.Ldb.AccountDB.GetKoreaRealTimestatusIdx()

	worldrealtimestatus := handler.Ldb.AccountDB.GetWorldDataByRoyLabData()

	//fmt.Println("GetCoronaDataWorldRealTime worldrealtimestatus", worldrealtimestatus)
	result := ResultDataWorldNewDailyStatus{}

	result.WorldNewStatusList = worldrealtimestatus

	return result

}
