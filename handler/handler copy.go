package handler

// import (
// 	"encoding/json"
// 	"fmt"
// 	"github.com/PuerkitoBio/goquery"
// 	"github.com/gin-gonic/gin"
// 	"github.com/gocolly/colly"
// 	"net/http"
// 	"optool/config"
// 	"optool/db"
// 	. "optool/structures"
// 	"regexp"
// 	"strconv"
// 	"strings"
// 	"time"
// )

// type Handler struct {
// 	Ldb    *db.LoginServerDB
// 	config *config.Config
// }

// func (handler *Handler) Initialize(config *config.Config) {

// 	handler.config = config

// 	handler.setDB()

// }

// func (handler *Handler) setDB() {

// 	ldb := &db.LoginServerDB{}

// 	adb, err := ldb.ConnectAccountDB(handler.config)
// 	if err != nil {
// 		fmt.Println("Error ConnectAccountDB Msg:", err.Error())
// 		panic(err)
// 	}

// 	// gdbconfig, err := adb.GetGameDBConfig()
// 	// if err != nil {
// 	// 	fmt.Println("Error GetGameDBConfig Msg:", err.Error())
// 	// 	panic(err)
// 	// }

// 	// handler.config.GameDBCfg = gdbconfig

// 	// gdb, err := ldb.ConnectGameDB(handler.config)
// 	// if err != nil {
// 	// 	fmt.Println("Error ConnectGameDB Msg:", err.Error())
// 	// 	panic(err)
// 	// }

// 	// sdblist, err := ldb.ConnectSessionDB(handler.config)
// 	// if err != nil {
// 	// 	fmt.Println("Error ConnectSessionDB Msg:", err.Error())
// 	// 	panic(err)
// 	// }

// 	ldb.AccountDB = adb
// 	//ldb.SessionDBList = sdblist
// 	//ldb.GameDBList = gdb

// 	handler.Ldb = ldb

// }

// func Status(config *config.Config, c *gin.Context) {

// 	c.JSON(http.StatusOK, config)

// }

// func (handler *Handler) GetCharacterDetail(dbid string, CharacterID string) []ResultCharacterDetail {

// 	gamedb, b := handler.Ldb.GameDBList.GetGameDB(dbid)
// 	if b != true {
// 		fmt.Println("Error Get Game DB")
// 	}

// 	result, err := gamedb.GetCharacterDetail(CharacterID)
// 	if err != nil {
// 		fmt.Println("Error GetCharacterDetail : ", err.Error())
// 	}

// 	return result

// }

// func (handler *Handler) GetCharacterList(CharacterName string) []ResultCharacterList {

// 	//characterinfo := CharacterInfo{}

// 	resultarray := make([]ResultCharacterList, 0)
// 	//totalcharactercnt := 0

// 	//charactercntfromdbkey := make(map[string]int)
// 	//charactercntfromserver := make(map[string]int)

// 	//charactercntdb := []CharacterCountDB{}
// 	//charactercntserver := []CharacterCountDB{}

// 	gamedbmap := handler.Ldb.GameDBList.GetGameDBMap()

// 	for k, v := range gamedbmap {
// 		//fmt.Println("k , v ", k, v)
// 		etcarray, err := v.GetCharacterListFromName(CharacterName)
// 		if err != nil {
// 			fmt.Println("error ", err.Error())
// 		}

// 		for _, value := range etcarray {
// 			//fmt.Println("characterinfo value", key, value)

// 			resultinfo := ResultCharacterList{}

// 			///characterinfo.CharacterID = value.CharacterID

// 			err := json.Unmarshal(value.Infos, &resultinfo)
// 			if err != nil {
// 				fmt.Println("value.Infos unmarshal error : ", err.Error())
// 			}

// 			resultinfo.AccountID = value.AccountID
// 			resultinfo.CharacterID = value.CharacterID
// 			resultinfo.DBID = k
// 			resultinfo.CreateTime = value.CreateTime
// 			resultinfo.LoginTime = value.LoginTime
// 			resultinfo.ServerGroupID = value.ServerGroupID

// 			resultarray = append(resultarray, resultinfo)
// 			fmt.Println("resultinfo : ", resultinfo)
// 		}

// 		fmt.Println("resultarrayarray ", resultarray)

// 	}

// 	/*

// 		//charactercntfromdbkey 를 array 로 변환
// 		for k, v := range charactercntfromdbkey {

// 			charcnt := CharacterCountDB{k, v}

// 			charactercntdb = append(charactercntdb, charcnt)
// 		}

// 		for k, v := range charactercntfromserver {

// 			charcnt := CharacterCountDB{k, v}

// 			charactercntserver = append(charactercntserver, charcnt)
// 		}
// 		charactercountinfo.TotalCharacterCount = totalcharactercnt
// 		charactercountinfo.CharacterCountDB = charactercntdb
// 		charactercountinfo.CharacterCountServer = charactercntserver
// 	*/
// 	return resultarray

// }

// func (handler *Handler) GetCharacterCount() CharacterCountInfo {

// 	charactercountinfo := CharacterCountInfo{}

// 	totalcharactercnt := 0

// 	charactercntfromdbkey := make(map[string]int)
// 	charactercntfromserver := make(map[string]int)

// 	charactercntdb := []CharacterCountDB{}
// 	charactercntserver := []CharacterCountDB{}

// 	gamedbmap := handler.Ldb.GameDBList.GetGameDBMap()

// 	for k, v := range gamedbmap {
// 		//fmt.Println(" gamedbmap key : ", k)
// 		//fmt.Println(" gamedbmap Value : ", v)

// 		//servergroupid := handler.config.SessionDBCfg[k].ServerGroupID
// 		charactercntarray, err := v.GetCharacterServerGroupIDCount()
// 		if err != nil {
// 			fmt.Println("error ", err.Error())
// 		}

// 		for _, v := range charactercntarray {

// 			//fmt.Println("v.ServerGroupID : ", v.ServerGroupID)
// 			//fmt.Println("v.Count : ", v.Count)

// 			//total character count
// 			totalcharactercnt = totalcharactercnt + v.Count
// 			charactercntfromdbkey[k] = charactercntfromdbkey[k] + v.Count
// 			charactercntfromserver[v.ServerGroupID] = charactercntfromserver[v.ServerGroupID] + v.Count

// 		}

// 		//totaluser := TotalUser{k, totalscore}

// 		//totaluserarray = append(totaluserarray, totaluser)

// 	}

// 	//charactercntfromdbkey ? array ? ??
// 	for k, v := range charactercntfromdbkey {

// 		charcnt := CharacterCountDB{k, v}

// 		charactercntdb = append(charactercntdb, charcnt)
// 	}

// 	//CharacterCountDB
// 	//CharacterCountInfo
// 	//charactercntfromserver ? array ? ??
// 	for k, v := range charactercntfromserver {

// 		charcnt := CharacterCountDB{k, v}

// 		charactercntserver = append(charactercntserver, charcnt)
// 	}
// 	charactercountinfo.TotalCharacterCount = totalcharactercnt
// 	charactercountinfo.CharacterCountDB = charactercntdb
// 	charactercountinfo.CharacterCountServer = charactercntserver

// 	return charactercountinfo

// }

// func (handler *Handler) GetTableColumnInfo() []TableInfo { //[]TableInfo {

// 	//resultarray := make([]ResultCharacterList, 0)

// 	gamedb, b := handler.Ldb.GameDBList.GetGameDB("A")
// 	if b != true {
// 		fmt.Println("error get gamedb")
// 	}

// 	tableinfo, _ := gamedb.GetTableColumnInfo()

// 	tablemap := make(map[string][]ColumnInfo)

// 	for k, v := range tableinfo {
// 		fmt.Println("key", k)
// 		fmt.Println("value", v)

// 		colinfo := ColumnInfo{}

// 		colinfo.ColumnName = v.ColumnName
// 		colinfo.ColumnType = v.ColumnType
// 		colinfo.ColumnComment = v.ColumnComment
// 		colinfo.ColumnKey = v.ColumnKey

// 		columninfo := tablemap[v.TableName]

// 		columninfo = append(columninfo, colinfo)

// 		tablemap[v.TableName] = columninfo

// 	}

// 	tableinfoarr := []TableInfo{}

// 	for k, v := range tablemap {

// 		tableinfo := TableInfo{}
// 		tableinfo.TableName = k
// 		tableinfo.ColumnInfo = v

// 		tableinfoarr = append(tableinfoarr, tableinfo)
// 	}

// 	fmt.Println(tableinfoarr)

// 	return tableinfoarr

// }

// func (handler *Handler) ScrapCollyFIFA() error {
// 	rankaddress := make([]string, 0)

// 	newcolly := colly.NewCollector()

// 	newcolly.OnHTML("ul.fi-ranking-schedule__nav", func(e *colly.HTMLElement) {
// 		//	e.Request.Visit(e.Attr("href"))

// 		ulbody := e.DOM.Find("li")

// 		//fmt.Println("ulbody", ulbody.Text())

// 		ulbody.Children().Each(func(i int, s *goquery.Selection) {

// 			//ahref := e.DOM.Find("a")

// 			//valuestring, _ := ahref.Attr("href")
// 			valuestring, _ := s.Attr("href")
// 			//time.Sleep(time.Second * 5)
// 			//fmt.Println("ahref", valuestring, b)
// 			fmt.Println("ahref s.Text", s.Text())
// 			fmt.Println("ahref s.Attr", valuestring)

// 			rankaddress = append(rankaddress, valuestring)
// 			//e.Request.Visit("https://www.fifa.com" + valuestring)
// 			//detailcolly.Visit("https://www.fifa.com" + valuestring)
// 			//fmt.Println("s.text", s.Text())
// 			//fmt.Println("find href", s.Find("a").Text())
// 		})

// 		//fmt.Println("ulbody", ulbody)
// 	})

// 	newcolly.OnRequest(func(r *colly.Request) {
// 		fmt.Println("Visiting", r.URL)
// 	})

// 	newcolly.Visit("https://www.fifa.com/fifa-world-ranking/ranking-table/men/#AFC")

// 	//////////////////////////////////////////////////////////////////////////
// 	detailcolly := colly.NewCollector()

// 	/*<div class="fi-selected-item">25 July 2019</div>*/
// 	detailcolly.OnHTML("body.fifa-world-ranking", func(e *colly.HTMLElement) {

// 		NowData := e.DOM.Find("div.fi-selected-item")
// 		fmt.Println("tr#data-team-id", NowData.Text())

// 		tbody := e.DOM.Find("tbody")

// 		tbody.Children().Each(func(i int, s *goquery.Selection) {

// 			// rankstring := ""
// 			// countrystring := ""
// 			// countrysmallstring := ""
// 			// regionstring := ""
// 			// pointsstring := ""

// 			// rank := s.Find(".fi-table__rank span")
// 			// if rank.Text() != "" {
// 			// 	//fmt.Println("Rank : ", rank.Text())
// 			// 	rankstring = rank.Text()
// 			// }

// 			// country := s.Find("div.fi-t__n span.fi-t__nText")
// 			// if country.Text() != "" {
// 			// 	//fmt.Println("Country : ", country.Text())
// 			// 	countrystring = country.Text()
// 			// }

// 			// countrysmall := s.Find("div.fi-t__n span.fi-t__nTri")
// 			// if countrysmall.Text() != "" {
// 			// 	//fmt.Println("Country : ", countrysmall.Text())
// 			// 	countrysmallstring = countrysmall.Text()
// 			// }

// 			// region := s.Find("td.fi-table__confederation span")
// 			// if region.Text() != "" {
// 			// 	//fmt.Println("region : ", region.Text())
// 			// 	regionstring = region.Text()
// 			// }

// 			// points := s.Find("td.fi-table__points span")
// 			// if points.Text() != "" {
// 			// 	//fmt.Println("region : ", region.Text())
// 			// 	pointsstring = points.Text()
// 			// }

// 			// err := handler.Ldb.AccountDB.SetDataFifa(NowData.Text(), rankstring, countrystring, countrysmallstring, regionstring, pointsstring)
// 			// if err != nil {
// 			// 	fmt.Println("----------------------------- SetDataFile Error : ", err.Error())
// 			// }
// 			// fmt.Println("List : ", NowData.Text(), rankstring, countrystring, countrysmallstring, regionstring, pointsstring)
// 		})
// 	})

// 	detailcolly.OnRequest(func(r *colly.Request) {
// 		fmt.Println("Visiting", r.URL)
// 	})

// 	//fmt.Println("rankaddress", rankaddress)

// 	for key, value := range rankaddress {

// 		fmt.Println(" k", key)
// 		fmt.Println(" v", value)
// 		detailcolly.Visit("https://www.fifa.com" + value + "#AFC")
// 		time.Sleep(time.Second * 5)
// 	}

// 	return nil

// }

// // regexp 를 안쓰고 slice 로 데이터를 뽑아 내려고 한 내용
// func ParsingStr(v string) CountryInfo {

// 	countryinfo := CountryInfo{}
// 	trimv := strings.TrimSpace(v)
// 	start1 := strings.Index(trimv, " ")
// 	start1 = start1 + 1
// 	end1 := strings.Index(trimv, "명")

// 	cm := regexp.MustCompile("[0-9]+")

// 	fmt.Println("cm.FindString(trimv) : ", cm.FindAllString(trimv, -1))
// 	countryname := trimv[:start1] // 국가명
// 	fmt.Println("countryname ", countryname)
// 	countryinfo.CountryName = countryname

// 	cnt1str := trimv[start1:end1]
// 	cnt1str = strings.TrimSpace(cnt1str)
// 	fmt.Println("cnt1str", cnt1str)
// 	cnt1int, err := strconv.Atoi(cnt1str)
// 	if err != nil {
// 		fmt.Println("strconv.Atoi(cnt1str) Error :  ", err.Error())
// 		countryinfo.Cnt1 = -99
// 	} else {
// 		countryinfo.Cnt1 = cnt1int
// 	}

// 	// 뒤에 괄호가 없을때를 처리 해야한다
// 	start2 := strings.LastIndex(trimv, " ")
// 	end2 := strings.LastIndex(trimv, ")")
// 	if start2 == -1 || end2 == -1 {
// 		//fmt.Println("str1start2 == -1 || str1end2 == -1 ")
// 		countryinfo.Cnt2 = 0
// 	} else {

// 		cnt2str := trimv[start2:end2]
// 		cnt2str = strings.TrimSpace(cnt2str)
// 		cnt2str = strings.Replace(cnt2str, "명", "", 0)
// 		cnt2int, err := strconv.Atoi(cnt2str)
// 		if err != nil {
// 			fmt.Println("strconv.Atoi(cnt2str) Error :  ", err.Error())
// 			countryinfo.Cnt2 = -99
// 		} else {
// 			countryinfo.Cnt2 = cnt2int
// 		}
// 	}
// 	return countryinfo

// }

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

// 	// fmt.Println("cm.FindString(trimv) : ", cm.FindAllString(trimv, -1))
// 	// countryname := trimv[:start1] // 국가명
// 	// fmt.Println("countryname ", countryname)
// 	// countryinfo.CountryName = countryname

// 	// cnt1str := trimv[start1:end1]
// 	// cnt1str = strings.TrimSpace(cnt1str)
// 	// fmt.Println("cnt1str", cnt1str)
// 	// cnt1int, err := strconv.Atoi(cnt1str)
// 	// if err != nil {
// 	// 	fmt.Println("strconv.Atoi(cnt1str) Error :  ", err.Error())
// 	// 	countryinfo.Cnt1 = -99
// 	// } else {
// 	// 	countryinfo.Cnt1 = cnt1int
// 	// }

// 	// // 뒤에 괄호가 없을때를 처리 해야한다
// 	// start2 := strings.LastIndex(trimv, " ")
// 	// end2 := strings.LastIndex(trimv, ")")
// 	// if start2 == -1 || end2 == -1 {
// 	// 	//fmt.Println("str1start2 == -1 || str1end2 == -1 ")
// 	// 	countryinfo.Cnt2 = 0
// 	// } else {

// 	// 	cnt2str := trimv[start2:end2]
// 	// 	cnt2str = strings.TrimSpace(cnt2str)
// 	// 	cnt2str = strings.Replace(cnt2str, "명", "", 0)
// 	// 	cnt2int, err := strconv.Atoi(cnt2str)
// 	// 	if err != nil {
// 	// 		fmt.Println("strconv.Atoi(cnt2str) Error :  ", err.Error())
// 	// 		countryinfo.Cnt2 = -99
// 	// 	} else {
// 	// 		countryinfo.Cnt2 = cnt2int
// 	// 	}
// 	// }
// 	return countryinfo

// }

// func (handler *Handler) ScrapCollyCorona() Main {
// 	fmt.Println(" why ???????????????????????????????????????????????????")

// 	newcolly := colly.NewCollector()

// 	newcolly.Limit(&colly.LimitRule{
// 		//DomainGlob:  ".*edmundmartin.*",
// 		Parallelism: 1,
// 		Delay:       5 * time.Second,
// 	})

// 	main := Main{}
// 	newcolly.OnHTML("div.bv_content", func(e *colly.HTMLElement) {

// 		fmt.Println("ddddddddddd")
// 		fmt.Println("e.Dom", e.DOM)

// 		title := e.DOM.Find(".s_descript")

// 		maininfo := MainInfo{}
// 		title.Each((func(i int, s *goquery.Selection) {

// 			if i == 0 { // 국내 발생 현황
// 				fmt.Println("제목 : ", i, s.Text())

// 				koreastr := s.Text()
// 				//코로나바이러스감염증-19 국내 발생 현황(2.24일 16시 기준)
// 				// 마지막 괄호뒤를 찾아 낸다
// 				pos := strings.LastIndex(koreastr, "(")

// 				fmt.Println("koreastr[pos:", koreastr[pos:])

// 				cm := regexp.MustCompile("[0-9]+")
// 				numberarray := cm.FindAllString(koreastr[pos:], -1)

// 				for k, v := range numberarray {
// 					if k == 0 { // 월
// 						month, err := strconv.Atoi(v)
// 						if err != nil {
// 							fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
// 						}

// 						maininfo.KoreaMonth = month
// 					}

// 					if k == 1 { //일
// 						day, err := strconv.Atoi(v)
// 						if err != nil {
// 							fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
// 						}
// 						maininfo.KoreaDay = day
// 					}

// 					if k == 2 { // 시
// 						hour, err := strconv.Atoi(v)
// 						if err != nil {
// 							fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
// 						}
// 						maininfo.KoreaHour = hour
// 					}
// 				}

// 				fmt.Println("국내 발생 현황 numberarray : ", numberarray)

// 			}
// 			if i == 1 { // 국외 발생 현황
// 				fmt.Println("제목 : ", i, s.Text())
// 				abroadstr := s.Text()

// 				//pos := strings.LastIndex(abroadstr, "(")

// 				abroadstr = strings.Replace(abroadstr, ",", "", 2)

// 				//fmt.Println("abroad[pos:", abroadstr[pos:])
// 				fmt.Println("abroadstr ", abroadstr)

// 				cm := regexp.MustCompile("[0-9]+")
// 				//numberarray := cm.FindAllString(abroadstr[pos:], -1)
// 				numberarray := cm.FindAllString(abroadstr, -1)

// 				for k, v := range numberarray {

// 					if k == 1 { // 월
// 						worldcnt, err := strconv.Atoi(v)
// 						if err != nil {
// 							fmt.Println("strconv.Atoi(numberarray) err worldcnt1 ", i, v, err.Error())
// 						}

// 						maininfo.WorldCnt1 = worldcnt
// 					}

// 					if k == 2 { // 월
// 						worldcnt2, err := strconv.Atoi(v)
// 						if err != nil {
// 							fmt.Println("strconv.Atoi(numberarray) err worldcnt2 ", i, v, err.Error())
// 						}

// 						maininfo.WorldCnt2 = worldcnt2
// 					}

// 					if k == 3 { // 월
// 						month, err := strconv.Atoi(v)
// 						if err != nil {
// 							fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
// 						}

// 						maininfo.AbroadMonth = month
// 					}

// 					if k == 4 { //일
// 						day, err := strconv.Atoi(v)
// 						if err != nil {
// 							fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
// 						}
// 						maininfo.AbroadDay = day
// 					}

// 					if k == 5 { // 시
// 						hour, err := strconv.Atoi(v)
// 						if err != nil {
// 							fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
// 						}
// 						maininfo.AbroadHour = hour
// 					}
// 				}

// 				fmt.Println("해외 발생 현황 numberarray : ", numberarray)

// 			}

// 		}))

// 		blwrap := e.DOM.Find(".data_table")

// 		countryinfolist := []CountryInfo{}
// 		blwrap.Each(func(i int, s *goquery.Selection) {

// 			fmt.Println("Text -------------------------------------- : ", i, s.Text())

// 			if i == 0 {
// 				// 국내
// 				fmt.Println("국내 ALL: ", s.Text())
// 				li := s.Find("tr")
// 				//countryinfo := CountryInfo{}
// 				//countryinfo.CountryName = "대한민국"

// 				li.Each(func(y int, s *goquery.Selection) {

// 					fmt.Println("tr s.Text() :", y, s.Text())

// 					cnt1 := s.Text()
// 					cnt1 = strings.Replace(cnt1, ",", "", 1)

// 					cm := regexp.MustCompile("[0-9]+")
// 					numberarray := cm.FindString(cnt1)

// 					cnt1int, err := strconv.Atoi(numberarray)
// 					if err != nil {
// 						fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
// 					}
// 					//countryinfo.Cnt1 = cnt1int
// 					if y == 0 {
// 						maininfo.KoreaCnt1 = cnt1int
// 					} else if y == 1 {
// 						maininfo.KoreaCnt2 = cnt1int
// 					} else if y == 2 {
// 						maininfo.KoreaCnt3 = cnt1int
// 					} else if y == 3 {
// 						maininfo.KoreaCnt4 = cnt1int
// 					}

// 					// if y == 0 { // (확진환자)
// 					// 	cnt1 := s.Text()
// 					// 	cnt1 = strings.Replace(cnt1, ",", "", 1)

// 					// 	cm := regexp.MustCompile("[0-9]+")
// 					// 	numberarray := cm.FindString(cnt1)

// 					// 	cnt1int, err := strconv.Atoi(numberarray)
// 					// 	if err != nil {
// 					// 		fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
// 					// 	}
// 					// 	//countryinfo.Cnt1 = cnt1int
// 					// 	maininfo.KoreaCnt1 = cnt1int

// 					// }

// 					// if y == 1 { // (확진환자)
// 					// 	cnt2 := s.Text()
// 					// 	cnt2 = strings.Replace(cnt2, ",", "", 1)
// 					// 	cm := regexp.MustCompile("[0-9]+")
// 					// 	numberarray := cm.FindString(cnt2)
// 					// 	fmt.Println("확진환자 격리해제 numberarray : ", numberarray)

// 					// 	cnt2int, err := strconv.Atoi(numberarray)
// 					// 	if err != nil {
// 					// 		fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
// 					// 	}
// 					// 	//countryinfo.Cnt1 = cnt1int
// 					// 	maininfo.KoreaCnt2 = cnt2int

// 					// }

// 					// if y == 2 { // (확진환자)
// 					// 	cnt3 := s.Text()
// 					// 	cnt3 = strings.Replace(cnt3, ",", "", 1)
// 					// 	cm := regexp.MustCompile("[0-9]+")
// 					// 	numberarray := cm.FindString(cnt3)

// 					// 	cnt3int, err := strconv.Atoi(numberarray)
// 					// 	if err != nil {
// 					// 		fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
// 					// 	}

// 					// 	//countryinfo.Cnt2 = cnt2int
// 					// 	maininfo.KoreaCnt3 = cnt3int

// 					// }

// 					// if y == 3 { // (확진환자)
// 					// 	cnt4 := s.Text()
// 					// 	cnt4 = strings.Replace(cnt4, ",", "", 1)
// 					// 	cm := regexp.MustCompile("[0-9]+")
// 					// 	numberarray := cm.FindString(cnt4)

// 					// 	cnt4int, err := strconv.Atoi(numberarray)
// 					// 	if err != nil {
// 					// 		fmt.Println("strconv.Atoi(numberarray) err ", err.Error())
// 					// 	}

// 					// 	//countryinfo.Cnt2 = cnt2int
// 					// 	maininfo.KoreaCnt4 = cnt4int

// 					// }

// 				})

// 				//countryinfolist = append(countryinfolist, countryinfo)

// 			}

// 			if i == 1 {

// 				//fmt.Println("해외 : ", s.Text())

// 				li := s.Find("tr")

// 				li.Each(func(y int, s *goquery.Selection) {
// 					//fmt.Println("해외 : ", y, s.Text())
// 					countryinfo := CountryInfo{}
// 					if y > 0 {
// 						td := s.Find("td")
// 						td.Each(func(z int, t *goquery.Selection) {
// 							fmt.Println("해외 세부사항: ", z, t.Text())

// 							if z == 0 {
// 								v := t.Text()
// 								trimv := strings.TrimSpace(v)

// 								//replacestr := strings.ReplaceAll(trimv, ",", "")
// 								// 숫자만 찾아 낸다
// 								countryinfo.CountryName = trimv
// 							}

// 							if z == 1 {
// 								v := t.Text()
// 								trimv := strings.TrimSpace(v)

// 								replacestr := strings.ReplaceAll(trimv, ",", "")

// 								cm := regexp.MustCompile("[0-9]+")
// 								numberarray := cm.FindAllString(replacestr, -1)

// 								for k, v := range numberarray {
// 									if k == 0 {
// 										cnt1, err := strconv.Atoi(v)
// 										if err != nil {
// 											fmt.Println("cnt1 , err := strconv.Atoi(v) Error :  ", k, err.Error())
// 										}
// 										countryinfo.Cnt1 = cnt1
// 									}

// 									if k == 1 {
// 										cnt1, err := strconv.Atoi(v)
// 										if err != nil {
// 											fmt.Println("cnt1 , err := strconv.Atoi(v) Error :  ", k, err.Error())
// 										}
// 										countryinfo.Cnt2 = cnt1
// 									}

// 								}

// 							}

// 							countryinfolist = append(countryinfolist, countryinfo)

// 						})

// 					}

// 					// if y == 0 { // 중국
// 					// 	str := s.Text()
// 					// 	str = strings.Replace(str, ",", "", 1)
// 					// 	countryinfo := ParsingStrRegexp(str)
// 					// 	countryinfolist = append(countryinfolist, countryinfo)
// 					// }

// 					// if y == 1 { // 아시아
// 					// 	str := s.Text()
// 					// 	str = strings.Replace(str, "(아시아)", "", 1)
// 					// 	strarray := strings.Split(str, ",")

// 					// 	for _, v := range strarray {
// 					// 		//fmt.Println("아시아", v)
// 					// 		//홍콩 70명(사망 2) 이 내용을 파싱해서 CountryInfo 스트럭트로 만든다
// 					// 		countryinfo := ParsingStrRegexp(v)
// 					// 		countryinfolist = append(countryinfolist, countryinfo)
// 					// 		//fmt.Println("countryinfo ", countryinfo)
// 					// 	}
// 					// }

// 					// if y == 2 { // 아메리카
// 					// 	str := s.Text()
// 					// 	str = strings.Replace(str, "(아메리카)", "", 1)
// 					// 	strarray := strings.Split(str, ",")

// 					// 	for _, v := range strarray {
// 					// 		//fmt.Println("아메리카", v)
// 					// 		//홍콩 70명(사망 2) 이 내용을 파싱해서 CountryInfo 스트럭트로 만든다
// 					// 		countryinfo := ParsingStrRegexp(v)
// 					// 		countryinfolist = append(countryinfolist, countryinfo)
// 					// 		//fmt.Println("countryinfo ", countryinfo)
// 					// 	}
// 					// }
// 					// if y == 3 { // 유럽
// 					// 	str := s.Text()
// 					// 	str = strings.Replace(str, "(유럽)", "", 1)
// 					// 	strarray := strings.Split(str, ",")

// 					// 	for _, v := range strarray {
// 					// 		//fmt.Println("유럽", v)
// 					// 		//홍콩 70명(사망 2) 이 내용을 파싱해서 CountryInfo 스트럭트로 만든다
// 					// 		countryinfo := ParsingStrRegexp(v)
// 					// 		countryinfolist = append(countryinfolist, countryinfo)
// 					// 		//fmt.Println("countryinfo ", countryinfo)
// 					// 	}
// 					// }

// 					// if y == 4 { // 오세아니아
// 					// 	str := s.Text()
// 					// 	str = strings.Replace(str, "(오세아니아)", "", 1)
// 					// 	strarray := strings.Split(str, ",")

// 					// 	for _, v := range strarray {
// 					// 		//fmt.Println("오세아니아", v)
// 					// 		//홍콩 70명(사망 2) 이 내용을 파싱해서 CountryInfo 스트럭트로 만든다
// 					// 		countryinfo := ParsingStrRegexp(v)
// 					// 		countryinfolist = append(countryinfolist, countryinfo)
// 					// 		//fmt.Println("countryinfo ", countryinfo)
// 					// 	}
// 					// }

// 					// if y == 5 { // 아프리카
// 					// 	str := s.Text()
// 					// 	str = strings.Replace(str, "(아프리카)", "", 1)
// 					// 	strarray := strings.Split(str, ",")

// 					// 	for _, v := range strarray {
// 					// 		//fmt.Println("아프리카", v)
// 					// 		//홍콩 70명(사망 2) 이 내용을 파싱해서 CountryInfo 스트럭트로 만든다
// 					// 		countryinfo := ParsingStrRegexp(v)
// 					// 		countryinfolist = append(countryinfolist, countryinfo)
// 					// 		//fmt.Println("countryinfo ", countryinfo)
// 					// 	}
// 					// }

// 					// if y == 6 { // 기타
// 					// 	str := s.Text()
// 					// 	fmt.Println("기타 : ", str)
// 					// 	str = strings.Replace(str, "(기타)", "", 1)

// 					// 	countryinfo := ParsingStrRegexp(str)
// 					// 	countryinfo.CountryName = "일본 크루즈"
// 					// 	countryinfolist = append(countryinfolist, countryinfo)

// 					// }

// 				})

// 			}

// 		})

// 		main.CountryInfo = countryinfolist
// 		main.MainInfo = maininfo
// 		//fmt.Println("countryinfolist", countryinfolist)

// 		// Example Goquery usage
// 		//fmt.Println("test", goquerySelection.Find("bl_body").Children().Text())
// 	})

// 	newcolly.OnRequest(func(r *colly.Request) {
// 		fmt.Println("test r ", r.Body)
// 		fmt.Println("Visiting", r.URL)
// 		//fmt.Println("r.Body", r.Body)

// 	})

// 	newcolly.Visit("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=")

// 	return main
// }

// func (handler *Handler) GetCoronaData1() ResultData1 {

// 	updatetime := handler.Ldb.AccountDB.GetkoreaMaxDate()

// 	koreastatus := handler.Ldb.AccountDB.Getkoreastatus(updatetime)

// 	fmt.Println("KoreaStatus", koreastatus)

// 	maininfo := MainInfo{}

// 	maininfo.KoreaUpdateTime = updatetime
// 	maininfo.KoreaMonth = *koreastatus.KoreaMonth
// 	maininfo.KoreaDay = *koreastatus.KoreaDay
// 	maininfo.KoreaHour = *koreastatus.KoreaHour

// 	maininfo.KoreaCnt1 = *koreastatus.KoreaCnt1
// 	maininfo.KoreaCnt2 = *koreastatus.KoreaCnt2
// 	maininfo.KoreaCnt3 = *koreastatus.KoreaCnt3
// 	maininfo.KoreaCnt4 = *koreastatus.KoreaCnt4

// 	worldupdatetime := handler.Ldb.AccountDB.GetWorldMaxDate()

// 	maininfo.AbroadUpdateTime = worldupdatetime

// 	worldnowstatus := handler.Ldb.AccountDB.GetWorldNowStatus(worldupdatetime)

// 	maininfo.AbroadMonth = *worldnowstatus.WorldMonth
// 	maininfo.AbroadDay = *worldnowstatus.WorldDay
// 	maininfo.AbroadHour = *worldnowstatus.WorldHour

// 	maininfo.WorldCnt1 = *worldnowstatus.WorldCnt1
// 	maininfo.WorldCnt2 = *worldnowstatus.WorldCnt3
// 	worldlist := handler.Ldb.AccountDB.GetWorldList(worldupdatetime)

// 	resultdata1 := ResultData1{}

// 	resultdata1.MainInfo = maininfo
// 	resultdata1.WorldStatus = worldlist

// 	return resultdata1

// }

// func (handler *Handler) ScrapCoronaAndDBSave() error {

// 	maininfo := handler.ScrapCollyCorona()

// 	//maininfo.MainInfo.KoreaMonth
// 	var koreastatus KoreaStatus

// 	koreastatus.KoreaMonth = &maininfo.MainInfo.KoreaMonth
// 	koreastatus.KoreaDay = &maininfo.MainInfo.KoreaDay
// 	koreastatus.KoreaHour = &maininfo.MainInfo.KoreaHour
// 	koreastatus.KoreaCnt1 = &maininfo.MainInfo.KoreaCnt1
// 	koreastatus.KoreaCnt2 = &maininfo.MainInfo.KoreaCnt2
// 	koreastatus.KoreaCnt3 = &maininfo.MainInfo.KoreaCnt3
// 	koreastatus.KoreaCnt4 = &maininfo.MainInfo.KoreaCnt4

// 	//updatetime := time.Date(2020, time.Month(maininfo.MainInfo.KoreaMonth), maininfo.MainInfo.KoreaDay, maininfo.MainInfo.KoreaHour, 0, 0, 0, time.Local)

// 	updatetimestr := fmt.Sprintf("2020-%02d-%02d", maininfo.MainInfo.KoreaMonth, maininfo.MainInfo.KoreaDay)

// 	koreastatus.UpdateTime = &updatetimestr
// 	fmt.Println("koreastatus", koreastatus)

// 	err := handler.Ldb.AccountDB.SetKoreaStatus(koreastatus)
// 	// if err != nil {
// 	// 	return err
// 	// }
// 	if err != nil {
// 		fmt.Println("handler.Ldb.AccountDB.SetKoreaStatus(koreastatus) Error : ", err.Error())
// 	}
// 	abroadmonth := maininfo.MainInfo.AbroadMonth
// 	abroadday := maininfo.MainInfo.AbroadDay
// 	abroadhour := maininfo.MainInfo.AbroadHour

// 	var worldnowstatus WorldNowStatus

// 	worldnowstatus.WorldMonth = &abroadmonth
// 	worldnowstatus.WorldDay = &abroadday
// 	worldnowstatus.WorldHour = &abroadhour
// 	worldnowstatus.WorldCnt1 = &maininfo.MainInfo.WorldCnt1
// 	worldnowstatus.WorldCnt3 = &maininfo.MainInfo.WorldCnt2

// 	updatetimestrworldnow := fmt.Sprintf("2020-%02d-%02d", abroadmonth, abroadday)

// 	worldnowstatus.UpdateTime = &updatetimestrworldnow

// 	err = handler.Ldb.AccountDB.SetWorldNowStatus(worldnowstatus)
// 	if err != nil {
// 		fmt.Println("handler.Ldb.AccountDB.SetKoreaStatus(koreastatus) Error : ", err.Error())
// 	}

// 	for k, v := range maininfo.CountryInfo {

// 		var worldstatus WorldStatus
// 		worldstatus.AbroadMonth = &abroadmonth
// 		worldstatus.AbroadDay = &abroadday
// 		worldstatus.AbroadHour = &abroadhour

// 		worldstatus.CountryName = &v.CountryName
// 		worldstatus.AbroadCnt1 = &v.Cnt1
// 		worldstatus.AbroadCnt3 = &v.Cnt2

// 		//updatetime := time.Date(2020, time.Month(abroadmonth), abroadday, abroadhour, 0, 0, 0, time.Local)

// 		updatetimestr := fmt.Sprintf("2020-%02d-%02d", abroadmonth, abroadday)

// 		worldstatus.UpdateTime = &updatetimestr

// 		fmt.Println("k , v ", k, v)
// 		err := handler.Ldb.AccountDB.SetWorldStatus(worldstatus)

// 		if err != nil {
// 			fmt.Println("maininfo.CountryInfo Error : ", abroadmonth, abroadday, abroadhour, v.CountryName, err.Error())
// 		}
// 	}

// 	return nil

// }

// func (handler *Handler) ScrapCollyBlueHouse() error {

// 	fmt.Println(" why ???????????????????????????????????????????????????")
// 	newcolly := colly.NewCollector(
// 		colly.AllowedDomains("www1.president.go.kr"),
// 	)

// 	newcolly.Limit(&colly.LimitRule{
// 		//DomainGlob:  ".*edmundmartin.*",
// 		Parallelism: 1,
// 		Delay:       5 * time.Second,
// 	})

// 	i := 0

// 	newcolly.OnHTML("div.bl_body", func(e *colly.HTMLElement) {
// 		//goquerySelection := e.DOM
// 		fmt.Println("ddddddddddd")
// 		fmt.Println("e.Dom", e.DOM)
// 		//fmt.Println("find bl_body", e.DOM.Find("bl_body"))

// 		//ulbody := e.DOM.Find("ul")
// 		//fmt.Println("ulbody", ulbody)

// 		if i > 0 {
// 			blwrap := e.DOM.Find(".bl_wrap")
// 			//fmt.Println("e.Dom.bl_wrap", blwrap.Text())
// 			//blwrap.Children().Each(func(i int, s *goquery.Selection) {
// 			blwrap.Each(func(i int, s *goquery.Selection) {
// 				//if i == 1 {
// 				//fmt.Println("sssssssssssss", s.Text())
// 				//fmt.Println("li", strings.TrimSpace(s.Find("li").Text()))
// 				//fmt.Println("div.bl_category", strings.TrimSpace(s.Find("div.bl_category").Text()))
// 				//list := s.Find("li")

// 				//category := strings.TrimSpace(s.Find("div.bl_category").Text())
// 				//fmt.Println("category : ", category)
// 				//list.Children().Each(func(i int, s *goquery.Selection) {

// 				//fmt.Println(s.Find("div.bl_category"))
// 				//fmt.Println("CATEGORY", strings.TrimSpace(s.Find("div.bl_category").Text()))
// 				data := ContentData{}
// 				category := strings.TrimSpace(s.Find(".bl_category").Text())
// 				//fmt.Println("SUBJECT", strings.TrimSpace(s.Find("div.bl_subject").Text()))

// 				subject := strings.TrimSpace(s.Find(".bl_subject").Text())

// 				//fmt.Println("DATE", strings.TrimSpace(s.Find("div.bl_date").Text()))

// 				enddate := strings.TrimSpace(s.Find(".bl_date").Text())

// 				//fmt.Println("AGREECOUNT", strings.TrimSpace(s.Find("div.bl_agree").Text()))

// 				agree := strings.TrimSpace(s.Find(".bl_agree").Text())

// 				//categoryreplace := strings.Replace(category, "??", " ", -1)
// 				categoryreplace := strings.Split(category, "  ")

// 				//subjectreplace := strings.TrimSpace(strings.Replace(subject, "??", "", -1))
// 				subjectreplace := strings.Split(subject, "  ")

// 				// agreereplace := strings.Replace(agree, "????", " ", -1)
// 				// agreereplace = strings.Replace(agreereplace, "?", " ", -1)
// 				// agreereplace = strings.Replace(agreereplace, ",", " ", -1)
// 				agreereplace := strings.Split(agree, " ")

// 				fmt.Println("categorycategorycategory :", categoryreplace[1])
// 				fmt.Println("subjectsubjectsubject :", subjectreplace[1])
// 				fmt.Println("enddateenddateenddate :", enddate)
// 				fmt.Println("agreeagreeagreeagreeagree :", agreereplace[1])

// 				agreeint, _ := strconv.Atoi(agreereplace[1])

// 				//fmt.Println(categoryreplace) //, subject, date, agree)

// 				data.Category = categoryreplace[1]
// 				data.Subject = subjectreplace[1]
// 				data.EndDate = enddate
// 				data.Agree = agreeint

// 				fmt.Println("data :", data)
// 				//struct ? ??? json ??

// 				//})

// 			})
// 		}

// 		i = i + 1

// 		// Example Goquery usage
// 		//fmt.Println("test", goquerySelection.Find("bl_body").Children().Text())
// 	})

// 	newcolly.OnRequest(func(r *colly.Request) {
// 		fmt.Println("test r ", r.Body)
// 		fmt.Println("Visiting", r.URL)
// 		//fmt.Println("r.Body", r.Body)

// 	})

// 	newcolly.Visit("https://www1.president.go.kr/petitions/best/")

// 	return nil
// }
