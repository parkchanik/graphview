package structures

type CountryInfo struct {
	CountryName string `json:"countryname"`
	Cnt1        int    `json:"cnt1"`
	Cnt2        int    `json:"cnt2"`
}

type MainInfo struct {
	KoreaUpdateTime  string `json:"koreaupdatetime"`
	KoreaMonth       int    `json:"koreamonth"`
	KoreaDay         int    `json:"koreaday"`
	KoreaHour        int    `json:"koreahour"`
	AbroadUpdateTime string `json:"abroadupdatetime"`
	AbroadMonth      int    `json:"abroadmonth"`
	AbroadDay        int    `json:"abroadday"`
	AbroadHour       int    `json:"abroadhour"`
	KoreaCnt1        int    `json:"koreacnt1"`
	KoreaCnt2        int    `json:"koreacnt2"`
	KoreaCnt3        int    `json:"koreacnt3"`
	KoreaCnt4        int    `json:"koreacnt4"`
	WorldCnt1        int    `json:"worldcnt1"`
	WorldCnt2        int    `json:"worldcnt2"`
}

type SecondInfo struct {
	KoreaUpdateTime string `json:"koreaupdatetime"`
	KoreaMonth      int    `json:"koreamonth"`
	KoreaDay        int    `json:"koreaday"`
	KoreaHour       int    `json:"koreahour"`
	KoreaCnt1       int    `json:"koreacnt1"`
	KoreaCnt2       int    `json:"koreacnt2"`
	KoreaCnt3       int    `json:"koreacnt3"`
	KoreaCnt4       int    `json:"koreacnt4"`
}

type Main struct {
	CountryInfo []CountryInfo `json:"countryinfo"`
	MainInfo    MainInfo      `json:"maininfo"`
}

// type MainSecond struct {
// 	KoreaListInfo []KoreaStatusList `json:"korealist"`
// 	SecondInfo    SecondInfo        `json:"secondinfo"`
// }

type KoreaStatus struct {
	UpdateTime *string `gorm:"type:varchar(10);column:updatetime;PRIMARY_KEY"`
	KoreaMonth *int    `gorm:"type:int;column:koreamonth"`
	KoreaDay   *int    `gorm:"type:int;column:koreaday"`
	KoreaHour  *int    `gorm:"type:int;column:koreahour"`
	KoreaCnt1  *int    `gorm:"type:int;column:cnt1"`
	KoreaCnt2  *int    `gorm:"type:int;column:cnt2"`
	KoreaCnt3  *int    `gorm:"type:int;column:cnt3"`
	KoreaCnt4  *int    `gorm:"type:int;column:cnt4"`
}

func (KoreaStatus) TableName() string {
	return "Koreastatus"
}

type WorldNowStatus struct {
	UpdateTime *string `gorm:"type:varchar(10);column:updatetime;PRIMARY_KEY"`
	WorldMonth *int    `gorm:"type:int;column:worldmonth"`
	WorldDay   *int    `gorm:"type:int;column:worldday"`
	WorldHour  *int    `gorm:"type:int;column:worldhour"`
	WorldCnt1  *int    `gorm:"type:int;column:cnt1"`
	WorldCnt2  *int    `gorm:"type:int;column:cnt2"`
	WorldCnt3  *int    `gorm:"type:int;column:cnt3"`
	WorldCnt4  *int    `gorm:"type:int;column:cnt4"`
}

func (WorldNowStatus) TableName() string {
	return "WorldNowstatus"
}

type WorldStatus struct {
	UpdateTime   *string `gorm:"type:varchar(10);column:updatetime;PRIMARY_KEY"`
	CountryName  *string `gorm:"type:varchar(500);column:countryname;PRIMARY_KEY"`
	Province     *string `gorm:"type:varchar(500);column:province;PRIMARY_KEY"`
	Lat          *string `gorm:"type:varchar(100);column:lat"`
	Lon          *string `gorm:"type:varchar(100);column:lon"`
	ConfirmValue *int    `gorm:"type:int;column:confirm_value"`
	//DeathValue   *int    `gorm:"type:int;column:death_value"`
	//RecoverValue *int    `gorm:"type:int;column:recover_value"`
	CreateTime *int `gorm:"type:int;column:create_time"`
}

func (WorldStatus) TableName() string {
	return "Worldstatus"
}

type WorldStatusDeath struct {
	UpdateTime  *string `gorm:"type:varchar(10);column:updatetime;PRIMARY_KEY"`
	CountryName *string `gorm:"type:varchar(500);column:countryname;PRIMARY_KEY"`
	Province    *string `gorm:"type:varchar(500);column:province;PRIMARY_KEY"`
	Lat         *string `gorm:"type:varchar(100);column:lat"`
	Lon         *string `gorm:"type:varchar(100);column:lon"`
	DeathValue  *int    `gorm:"type:int;column:death_value"`
	CreateTime  *int    `gorm:"type:int;column:create_time"`
}

func (WorldStatusDeath) TableName() string {
	return "WorldstatusDeath"
}

type ResultData1 struct {
	WorldStatus []WorldStatus `json:"worldinfo"`
	MainInfo    MainInfo      `json:"maininfo"`
}
type ResultData2 struct {
	KoreaListInfo []KoreaStatusList `json:"korealist"`
	SecondInfo    SecondInfo        `json:"secondinfo"`
}

// type MainSecond struct {
// 	KoreaListInfo []KoreaStatusList `json:"korealist"`
// 	SecondInfo    SecondInfo        `json:"secondinfo"`
// }
type KoreaStatusList struct {
	Updatetime string
	Cnt1a      int
	Cnt3a      int
	Cnt1b      int
	Cnt3b      int
	Addcnt     int
}

type ManWomanCount struct {
	Idx        *int    `gorm:"AUTO_INCREMENT;type:int;column:idx;PRIMARY_KEY"`
	UpdateTime *string `gorm:"type:varchar(10);column:updatetime"`
	Hour       *int    `gorm:"type:int;column:cnthour"`
	ManCnt     *string `gorm:"type:varchar(100);column:mancnt"`
	WomanCnt   *string `gorm:"type:varchar(100);column:womancnt"`
}

func (ManWomanCount) TableName() string {
	return "ManWomanCount"
}

type AgeCount struct {
	Idx        *int    `gorm:"AUTO_INCREMENT;type:int;column:idx;PRIMARY_KEY"`
	UpdateTime *string `gorm:"type:varchar(10);column:updatetime"`
	Hour       *int    `gorm:"type:int;column:cnthour"`
	Cnt0       *string `gorm:"type:varchar(50);column:cnt0"`
	Cnt10      *string `gorm:"type:varchar(50);column:cnt10"`
	Cnt20      *string `gorm:"type:varchar(50);column:cnt20"`
	Cnt30      *string `gorm:"type:varchar(50);column:cnt30"`
	Cnt40      *string `gorm:"type:varchar(50);column:cnt40"`
	Cnt50      *string `gorm:"type:varchar(50);column:cnt50"`
	Cnt60      *string `gorm:"type:varchar(50);column:cnt60"`
	Cnt70      *string `gorm:"type:varchar(50);column:cnt70"`
	Cnt80      *string `gorm:"type:varchar(50);column:cnt80"`
}

func (AgeCount) TableName() string {
	return "AgeCount"
}

type ResultDataManWomanAge struct {
	MWdateTime string `json:"mwupdatetime"`
	//MWMonth       int            `json:"mwmonth"`
	//MWDay         int            `json:"mwday"`
	MWHour        int    `json:"mwhour"`
	AgeUpdateTime string `json:"ageupdatetime"`
	//AgeMonth      int            `json:"agemonth"`
	//AgeDay        int            `json:"ageday"`
	AgeHour      int            `json:"agehour"`
	ManWomanList []ManWomanList `json:"manwomancount"`
	AgeList      []AgeList      `json:"agecount"`
}

type AgeList struct {
	Age  int `json:"age"`
	Cnt1 int `json:"cnt1"`
	Cnt2 int `json:"cnt2"`
}

type ManWomanList struct {
	Sex  int    `json:"sex"`
	Cnt1 string `json:"cnt1"`
	Cnt2 string `json:"cnt2"`
	Cnt3 string `json:"cnt3"`
	Cnt4 string `json:"cnt4"`
}

type KoreaRealTimestatus struct {
	Idx        *int    `gorm:"AUTO_INCREMENT;type:int;column:idx;PRIMARY_KEY"`
	UpdateTime *string `gorm:"type:datetime;column:updatetime"`
	Cnt1       *int    `gorm:"type:int;column:cnt1"`
	Cnt2       *int    `gorm:"type:int;column:cnt2"`
	Cnt3       *int    `gorm:"type:int;column:cnt3"`
	Cnt4       *int    `gorm:"type:int;column:cnt4"`
}

func (KoreaRealTimestatus) TableName() string {
	return "KoreaRealTimestatus"
}

type ResultData3 struct {
	KoreaRealTime KoreaRealTimestatus `json:"korearealtime"`
}

type WorldStatusList struct {
	Countryname  string
	Confirmvalue int
	Deathvalue   int
}

type ResultData4 struct {
	WorldListInfo []WorldStatusList `json:"worldlist"`
	//SecondInfo    SecondInfo        `json:"secondinfo"`
}

type GroupExample struct {
	UpdateTime   *string `gorm:"type:VARCHAR(10);column:updatetime;PRIMARY_KEY"`
	UpdateHour   *int    `gorm:"type:int;column:updatehour;PRIMARY_KEY"`
	Region       *string `gorm:"type:VARCHAR(100);column:region;PRIMARY_KEY"`
	TotalCnt     *int    `gorm:"type:int;column:totalcnt"`
	Groupcnt     *int    `gorm:"type:int;column:groupcnt"`
	DetailString *string `gorm:"type:VARCHAR(4000);column:detailstring"`
	ETCCnt       *int    `gorm:"type:int;column:etccnt"`
}

func (GroupExample) TableName() string {
	return "GroupExample"
}

// type ResultData5 struct {
// 	GroupExample int `json:"groupexample"`
// }

type ResultGroupData struct {
	UpdateTime  string        `json:"updatetime"`
	RegionGroup []RegionGroup `json:"regiongroup"`
}

type RegionGroup struct {
	Region   string        `json:"region"`
	TotalCnt int           `json:"totalcnt"`
	Groupcnt int           `json:"groupcnt"`
	ETCCnt   int           `json:"etccnt"`
	Detail   []GroupDetail `json:"detail"`
}

type GroupDetail struct {
	DetailStr  string `json:"position"`
	Cnt        int    `json:"cnt"`
	Percentage string `json:"percent"`
}

type WorldRealTimestatus struct {
	Idx         *int    `gorm:"AUTO_INCREMENT;type:int;column:idx;PRIMARY_KEY"`
	UpdateTime  *string `gorm:"type:datetime;column:updatetime"`
	CountryName *string `gorm:"type:VARCHAR(100);column:countryname"`
	EngName     *string `gorm:"type:VARCHAR(100) ;column:engname"`
	Cnt1        *int    `gorm:"type:int;column:cnt1"`
	Cnt2        *int    `gorm:"type:int;column:cnt2"`
	Cnt3        *int    `gorm:"type:int;column:cnt3"`
}

func (WorldRealTimestatus) TableName() string {
	return "worldrealtimestatus"
}

type ResultDataWorldRealTimeList struct {
	WorldRealTimeListInfo []WorldRealTimestatus `json:"worldrealtimelist"`
	//SecondInfo    SecondInfo        `json:"secondinfo"`
}

type ResultDataWorldNewDailyStatus struct {
	WorldNewStatusList []WorldNewStatus `json:"worldrealtimelist"`
	//SecondInfo    SecondInfo        `json:"secondinfo"`
}

type ResultDataWorldNewDailyStatusByContinent struct {
	Europe  WorldNewStatusbyContinent `json:"europe"`
	Asia    WorldNewStatusbyContinent `json:"asia"`
	America WorldNewStatusbyContinent `json:"america"`
	Africa  WorldNewStatusbyContinent `json:"africa"`
	//SecondInfo    SecondInfo        `json:"secondinfo"`
}

type WorldNewStatusbyContinent struct {
	Totalconfirmed int
	Totaldeath     int
	Totalrecovered int
	Worldlist      []WorldNewStatus
}

type WorldNewStatus struct {
	Countrycode string
	Country     string
	Name1       string
	Name2       string
	Name3       string
	Name4       string
	Name5       string
	Name6       string
	Confirmed   int
	Deaths      int
	Recovered   int
	Continent   string
}

type WorldNewStatusSummary struct {
	Excelcountry string
	Confirmed    int
	Deaths       int
	Recovered    int
}
