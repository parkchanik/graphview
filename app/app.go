package app

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"

	"optool/config"
	"optool/handler"

	//	_ "LoginServer/docs"

	. "optool/structures"

	//"jcm/ginlogger"

	"optool/logger"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	//"jcm/ginlogrus"
)

type App struct {
	Router  *gin.Engine
	handler *handler.Handler
	config  *config.Config
}

// App initialize with predefined configuration
//func (a *App) Initialize(config *config.Config) {

func (a *App) Initialize() {

	config := config.LoadConfigFromFile()

	lhandler := &handler.Handler{}

	//a.LogInit(config)

	logconfig := config.LogMap["dblog"]

	FileName := logconfig.FileName
	FileExtension := logconfig.FileExtension
	MaxSize := logconfig.MaxSize
	MaxBackup := logconfig.MaxBackup
	MaxAge := logconfig.MaxAge
	StdOut := logconfig.StdOut
	Debug := logconfig.Debug
	JSONFormat := logconfig.JSONFormat

	logger.DBLoggerInit(FileName, FileExtension, MaxSize, MaxBackup, MaxAge, StdOut, Debug, JSONFormat)

	a.config = config
	lhandler.Initialize(config)

	a.handler = lhandler

	////////////////// gin 세팅///////////////////////////////////////////////////////////////////////
	//a.Router = gin.New()
	a.Router = gin.Default()
	////////////////////////////////////////////

	//a.Router.Use(logger.GinLoggerHandle())

	// set route
	a.setRouters()

}

func (a *App) Run(port string) {

	// go func() {

	// 	for {
	// 		err := a.handler.ScrapCollyCorona_roylabdata()
	// 		if err != nil {
	// 			fmt.Println("ScrapCollyCorona_roylabdata Error : ", err.Error())
	// 		} else {
	// 			fmt.Println("ScrapCollyCorona_roylabdata Success ")
	// 		}

	// 		time.Sleep(time.Minute * 10)

	// 	}

	// }()

	err := a.Router.Run(port)
	if err != nil {
		//a.serverlog.Error("Error LoginServer Start")
		panic(err)
	}

}

// Set all required routers
func (a *App) setRouters() {

	// Serve frontend static files
	a.Router.Use(static.Serve("/", static.LocalFile("./frontend/build", true)))
	a.Router.Use(static.Serve("/counter", static.LocalFile("./frontend/build", true)))
	a.Router.Use(static.Serve("/characterinfo", static.LocalFile("./frontend/build", true)))
	a.Router.Use(static.Serve("/rankinfo", static.LocalFile("./frontend/build", true)))
	a.Router.Use(static.Serve("/dashboard", static.LocalFile("./frontend/build", true)))
	a.Router.Use(static.Serve("/queryserver", static.LocalFile("./frontend/build", true)))

	// Setup route group for the API
	api := a.Router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	scrap := a.Router.Group("/scrap")
	{
		scrap.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	//api.GET("/fetchdata", FetchData)
	//api.GET("/CharacterListFromName/:Name", a.GetCharacterListFromCharacterName)
	//api.GET("/CharacterDetail/:DBID/:CharacterID", a.GetCharacterDetail)

	api.GET("/GetMaxAccountID", a.GetMaxAccountID)
	//api.GET("/GetCharacterCount", a.GetCharacterCount)
	api.GET("/GetServerListAll", a.GetServerListAll)

	api.GET("/GetTableColumnInfo", a.GetTableColumnInfo)

	api.GET("/GetQueryServerInfo/:queryservername", a.GetQueryServerInfo)

	scrap.GET("/scrapfifa", a.ScrapCollyFIFA)

	scrap.GET("/scrapblue", a.ScrapCollyBlue)

	scrap.GET("/scrapcorona", a.ScrapCollyCorona)
	scrap.GET("/scrapcoronadbsave", a.ScrapCoronaAndDBSave)

	scrap.GET("/worldstatusalldave", a.WorldStatusAllSave)

	scrap.GET("/worldstatusupdate", a.WorldStatusUpdate)

	scrap.GET("/worldnewdailyupdate", a.WorldNewDailyUpdate)
	scrap.GET("/worldnewdailylist", a.GetCoronaDataWorldDailyNowList)
	scrap.GET("/worldnewdailylistsummary", a.GetCoronaDataWorldDailyNowListSummary)

	scrap.GET("/worldnewdailylistbycontinent", a.GetCoronaDataWorldDailyNowListByContinent)

	scrap.GET("/getcoronadata1", a.GetCoronaData1)
	scrap.GET("/getcoronadatakorea", a.GetCoronaDataKorea)
	scrap.GET("/getcoronamanwomanage", a.GetCoronaManwomanAge)
	scrap.GET("/getcoronarealtime", a.GetCoronaDataKoreaRealTime)

	scrap.GET("/getcoronadataworldstatus", a.GetCoronaDataWorldStatus)
	scrap.GET("/getcoronadatagroup", a.GetCoronaDataGroupExample)

	scrap.GET("/getworldrealtimelist", a.GetCoronaDataWorldRealTime)

	scrap.GET("/Scrapworldometers", a.ScrapCollyCorona_worldometers)

	scrap.GET("/ScrapRoyLab", a.ScrapCollyCorona_roylabdata)

	scrap.GET("/getworlddatabyroylab", a.GetCoronaDataByRoyLabData)
	scrap.GET("/getworlddatabyroylabbyname/:name", a.GetCoronaDataByRoyLabDataName)

	scrap.GET("/getelection", a.GetElection)
	scrap.GET("/getallelection", a.GetAllElection)

	scrap.GET("/ScrapBiryeElection", a.ScrapCollyBiryeElection)

	scrap.GET("/test", a.Test)

	api.GET("/GetServerNowUser", a.GetServerNowUser)

	gonggongdata := a.Router.Group("/gonggong")
	{
		gonggongdata.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	gonggongdata.GET("/getmise", a.GetMise)

}

func (a *App) ScrapCollyCorona_roylabdata(c *gin.Context) {

	fmt.Println("call ScrapCollyCorona_worldometers")
	err := a.handler.ScrapCollyCorona_roylabdata()
	if err != nil {
		fmt.Println("Scrap Error ", err.Error())
	}

}

func (a *App) ScrapCollyBiryeElection(c *gin.Context) {

	fmt.Println("call ScrapCollyBiryeElection")
	err := a.handler.ScrapCollyBiryeElection()
	if err != nil {
		fmt.Println("Scrap Error ", err.Error())
	}

}

func (a *App) ScrapCollyCorona_worldometers(c *gin.Context) {

	fmt.Println("call ScrapCollyCorona_worldometers")
	err := a.handler.ScrapCollyCorona_worldometers()
	if err != nil {
		fmt.Println("Scrap Error ", err.Error())
	}

}

func (a *App) ScrapCollyFIFA(c *gin.Context) {

	fmt.Println("call ScrapCollyFIFA")
	err := a.handler.ScrapCollyFIFA()
	if err != nil {
		fmt.Println("Scrap Error ", err.Error())
	}

}

func (a *App) ScrapCollyBlue(c *gin.Context) {

	fmt.Println("call ScrapCollyBlue")
	err := a.handler.ScrapCollyBlueHouse()
	if err != nil {
		fmt.Println("Scrap Error ", err.Error())
	}

}

func (a *App) ScrapCollyCorona(c *gin.Context) {

	fmt.Println("call ScrapCollyCorona")
	maindata := a.handler.ScrapCollyCorona()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, maindata)

}

func (a *App) Test(c *gin.Context) {

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, "Test")

}
func (a *App) ScrapCoronaAndDBSave(c *gin.Context) {

	fmt.Println("call ScrapCoronaAndDBSave")
	maindata := a.handler.ScrapCoronaAndDBSave()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, maindata)

}

func (a *App) WorldStatusAllSave(c *gin.Context) {

	fmt.Println("call ScrapCoronaAndDBSave")
	maindata := a.handler.WorldStatusSave()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, maindata)

}

func (a *App) WorldStatusUpdate(c *gin.Context) {

	fmt.Println("call ScrapCoronaAndDBSave")
	maindata := a.handler.WorldStatusUpdate()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, maindata)

}

func (a *App) WorldNewDailyUpdate(c *gin.Context) {

	fmt.Println("call ScrapCoronaAndDBSave")
	maindata := a.handler.WorldNewDailyUpdate()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, maindata)

}

func (a *App) GetElection(c *gin.Context) {

	fmt.Println("call GetCoronaDataGroupExample")
	coronadata := a.handler.GetElection()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetAllElection(c *gin.Context) {

	fmt.Println("call GetAllElection")
	coronadata := a.handler.GetAllElection()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetCoronaDataWorldDailyNowListByContinent(c *gin.Context) {

	fmt.Println("call GetCoronaDataGroupExample")
	coronadata := a.handler.GetCoronaDataWorldDailyNowListByContinent()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetCoronaDataByRoyLabDataName(c *gin.Context) {

	name := c.Param("name")

	nameint, _ := strconv.Atoi(name)
	fmt.Println("call GetCoronaDataGroupExample")
	coronadata := a.handler.GetCoronaDataByRoyLabDataName(nameint)

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetCoronaDataByRoyLabData(c *gin.Context) {

	fmt.Println("call GetCoronaDataGroupExample")
	coronadata := a.handler.GetCoronaDataByRoyLabData()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetCoronaDataWorldDailyNowList(c *gin.Context) {

	fmt.Println("call GetCoronaDataGroupExample")
	coronadata := a.handler.GetCoronaDataWorldDailyNowList()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}
func (a *App) GetCoronaDataWorldDailyNowListSummary(c *gin.Context) {

	fmt.Println("call GetCoronaDataGroupExample")
	coronadata := a.handler.GetCoronaDataWorldDailyNowListSummary()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetCoronaDataKorea(c *gin.Context) {

	fmt.Println("call GetCoronaDataKorea")
	coronadata := a.handler.GetCoronaDataKorea()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetCoronaDataWorldRealTime(c *gin.Context) {

	fmt.Println("call GetCoronaDataGroupExample")
	coronadata := a.handler.GetCoronaDataWorldRealTime()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetCoronaDataGroupExample(c *gin.Context) {

	fmt.Println("call GetCoronaDataGroupExample")
	coronadata := a.handler.GetCoronaDataGroupExample()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetCoronaDataWorldStatus(c *gin.Context) {

	fmt.Println("call GetCoronaDataKorea")
	coronadata := a.handler.GetCoronaDataWorldStatus()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetCoronaDataKoreaRealTime(c *gin.Context) {

	fmt.Println("call GetCoronaDataKoreaRealTime")
	coronadata := a.handler.GetCoronaDataKoreaRealTime()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetCoronaData1(c *gin.Context) {

	fmt.Println("call GetCoronaData1")
	coronadata := a.handler.GetCoronaData1()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetCoronaManwomanAge(c *gin.Context) {

	fmt.Println("call GetCoronaManwomanAge")
	coronadata := a.handler.GetManWomanAgeCountCorona()

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, coronadata)

}

func (a *App) GetMise(c *gin.Context) {

	fmt.Println("call GetMise")
	err := a.handler.GetMise()
	if err != nil {
		fmt.Println("Scrap Error ", err.Error())
	}

}

func (a *App) TestGet(c *gin.Context) {
	c.JSON(http.StatusCreated, 1)
}

func (a *App) Status(c *gin.Context) {

	//handler.Status(a.config, c)
}

func (a *App) SetMaxUser(c *gin.Context) {

	//handler.SetMaxUser(a.config, c)
}

func (a *App) GetTableColumnInfo(c *gin.Context) {

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	result := a.handler.GetTableColumnInfo()

	fmt.Println("result", result)
	c.JSON(http.StatusOK, result)

}

func (a *App) GetMaxAccountID(c *gin.Context) {

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	//accountidcnt := a.handler.GetMaxAccountID()

	//c.JSON(http.StatusOK, gin.H{"result": accountidcnt})

}

func (a *App) GetServerNowUser(c *gin.Context) {

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	//nowuser := a.handler.GetServerNowUser()

	//c.JSON(http.StatusOK, gin.H{"result": nowuser})

}

func (a *App) GetServerListAll(c *gin.Context) {

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	alldata := ReturnAllServerList{}

	alldata.AllList = []ReturnServerList{}
	sessiondbmap := a.handler.Ldb.SessionDBList.GetSessionDBMap()

	for k, v := range sessiondbmap {
		//fmt.Println(" key : ", k)
		//fmt.Println(" Value : ", v)

		servergroupid := a.config.SessionDBCfg[k].ServerGroupID

		listarray, activearray, err := v.GetUnionsAllServerList(servergroupid) // ?? ??? ?? ??? ??
		if err != nil {
			fmt.Println("error ", err.Error())

		}

		//fmt.Println("Now Time = ", time.Now())
		//fmt.Println("listarray = ", listarray)

		returndata := ReturnServerList{k, listarray, activearray}

		alldata.AllList = append(alldata.AllList, returndata)
	}

	c.JSON(http.StatusOK, alldata)

}

func (a *App) GetQueryServerInfo(c *gin.Context) {

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	queryservername := c.Params.ByName("queryservername")

	fmt.Println("Get queryservername : ", queryservername)

	QueryServerConfig := a.config.QueryServerList[queryservername]

	fmt.Println("URITest : ", QueryServerConfig.URI)

	URI := "http://" + QueryServerConfig.URI
	timeout := time.Duration(time.Second * 1)
	client := http.Client{
		Timeout: timeout,
	}

	resp, err := client.Get(URI)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"message": err.Error(),
		})
		return
	}

	defer resp.Body.Close()

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"message": err.Error(),
		})
		return
	}

	statislist := StatusList{}

	err = json.Unmarshal(data, &statislist)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"message": err.Error(),
		})
		return
	}

	fmt.Println("statislist ---", statislist)
	c.JSON(http.StatusOK, statislist)

	//return curserveralive, nil

}

// func (a *App) GetDataShopping(c *gin.Context) {
// 	url := "https://search.shopping.naver.com/search/all.nhn?origQuery=%EC%98%A4%EB%A9%94%EA%B0%803&pagingIndex=1&pagingSize=140&viewType=list&sort=rel&frm=NVSHPAG&query=%EC%98%A4%EB%A9%94%EA%B0%803"

// 	res, err := http.Get(url)
// 	if err != nil {
// 		fmt.Println(err)
// 		//return "",err
// 	}

// 	docgo, err := goquery.NewDocumentFromReader(res.Body)

// 	title := docgo.Find("title").Text()
// 	fmt.Println("title", title)

// 	divdata := docgo.Find("div.info")

// 	divdata.Children().Each(func(i int, s *goquery.Selection) {
// 		fmt.Println(i)

// 		//fmt.Println(strings.TrimSpace(s.Find("li").Text()))

// 		hrefstring := strings.TrimSpace(s.Find("a").Text())
// 		fmt.Println("hrefstring", hrefstring)

// 	})
// }

// //////////////////////////////////////////////////////////////////////////////???///////////////////////////////////////////////////////////////////

// func (a *App) GetDataOld(c *gin.Context) {
// 	url := "https://www1.president.go.kr/petitions/best"

// 	res, err := http.Get(url)
// 	if err != nil {
// 		fmt.Println(err)
// 		//return "",err
// 	}

// 	body, err := ioutil.ReadAll(res.Body)

// 	if err != nil {
// 		fmt.Println(err)
// 		//return "" , err
// 	}

// 	html := string(body)
// 	//fmt.Println("html string ", html)
// 	doc, err := htmlquery.Parse(strings.NewReader(html))

// 	//list := htmlquery.Find(doc, "//a")
// 	//fmt.Println(*doc)
// 	list := htmlquery.Find(doc, "div.bl_body")

// 	fmt.Println(list)
// 	for _, val := range list {
// 		fmt.Println("======", htmlquery.OutputHTML(val, true))

// 		fmt.Println("=====test====", htmlquery.InnerText(val))
// 	}

// }
