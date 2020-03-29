package accountdb

import (
	"fmt"
	"optool/config"
	"strconv"

	//	. "jcm/errorcode"
	"optool/logger"
	. "optool/structures"

	_ "github.com/go-sql-driver/mysql"

	"optool/db/sqlxwrap"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type AccountDB struct {
	sqlwrap *sqlxwrap.SqlxWrap
}

type GormAccountDB struct {
	//sqldb *sqlx.DB
	sqlgormdb *gorm.DB
}

//func ConnectAccountDB(Username, Password, Address, Port, DBname string, ConnMaxLifetime, MaxIdleConns, MaxOpenConns int) (*AccountDB, bool) {
func ConnectAccountDB(adbconfig config.AccountDBConfig, logconfig config.LogMapConfig) (*GormAccountDB, error) {
	Username := adbconfig.Username

	Password := adbconfig.Password
	Address := adbconfig.Address
	Port := adbconfig.Port
	DBname := adbconfig.DBname
	//ConnMaxLifetime := adbconfig.ConnMaxLifetime
	//MaxIdleConns := adbconfig.MaxIdleConns
	//MaxOpenConns := adbconfig.MaxOpenConns

	//logger := logger.LoggerInit(logfile)
	//logconfig := config.LogMap["ginlog"]

	//parseTime=true 는 mysql 의 datetime 을 time.Time 으로 받기 위해 한다
	dbURI := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
		Username,
		Password,
		Address,
		Port,
		DBname)

	fmt.Println("dbURI : ", dbURI)

	gormURI := dbURI + "?charset=utf8&parseTime=True&loc=Local"
	fmt.Println("gormURI : ", gormURI)
	db, err := gorm.Open("mysql", gormURI)
	if err != nil {
		panic(err)
	}

	db.SetLogger(&logger.GormLogger{})
	db.LogMode(true)

	gormdb := &GormAccountDB{
		db,
	}

	return gormdb, err

}

func (db *AccountDB) GetGameDBConfig() ([]config.GameDBConfig, error) {

	var gdbcon []config.GameDBConfig

	sqlstr := "SELECT DB_ID , DB_Address , DB_Port , DB_Name , UserName , Pwd , ConnMaxLifeTime , MaxIdleConns , MaxOpenConns ,EnableYN FROM GAMEDBCONFIG WHERE EnableYN = ?"

	err := db.sqlwrap.Select(&gdbcon, sqlstr, "Y")

	return gdbcon, err

}

func (db *GormAccountDB) GetkoreaMaxDate() string {

	var max string
	row := db.sqlgormdb.Table("Koreastatus").Select("MAX(updatetime)").Row()
	row.Scan(&max)

	return max

}

// func (db *GormAccountDB) GetManWomanMaxDate() string {

// 	var max string
// 	row := db.sqlgormdb.Table("ManWomanCount").Select("MAX(updatetime)").Row()
// 	row.Scan(&max)

// 	return max

// }

// func (db *GormAccountDB) GetAgeMaxDate() string {

// 	var max string
// 	row := db.sqlgormdb.Table("AgeCount").Select("MAX(updatetime)").Row()
// 	row.Scan(&max)

// 	return max

// }

func (db *GormAccountDB) Getkoreastatus(updatetime string) KoreaStatus {

	var st KoreaStatus
	if err := db.sqlgormdb.Where("updatetime = ?", updatetime).First(&st).Error; err != nil {
		fmt.Println("Getkoreastatus Error :  ", err.Error())
	}

	return st

}

func (db *GormAccountDB) GetManWomanstatusIdx() int {

	var max int
	row := db.sqlgormdb.Table("ManWomanCount").Select("MAX(idx)").Row()
	row.Scan(&max)

	return max

}

func (db *GormAccountDB) GetManWomanstatus(idx int) ManWomanCount {

	var st ManWomanCount
	if err := db.sqlgormdb.Where("idx = ?", idx).First(&st).Error; err != nil {
		fmt.Println("GetManWomanstatus Error :  ", err.Error())
	}

	return st

}

func (db *GormAccountDB) GetAgestatusIdx() int {

	var max int
	row := db.sqlgormdb.Table("AgeCount").Select("MAX(idx)").Row()
	row.Scan(&max)

	return max

}

func (db *GormAccountDB) GetAgestatus(idx int) AgeCount {

	var st AgeCount
	if err := db.sqlgormdb.Where("idx = ?", idx).First(&st).Error; err != nil {
		fmt.Println("GetAgestatus Error :  ", err.Error())
	}

	return st

}

func (db *GormAccountDB) Getkoreahistory(updatetime string) []KoreaStatusList {

	var koreastatuslist []KoreaStatusList

	//qry := "CALL P_CHALLENGEGEAR_SHCEDULE (" + scheduleidxstr + " , '" + mode + "' , @o_error_msg ,  @o_return);SELECT @o_error_msg AS ErrorMsg , @o_return AS ReturnCode;"
	qry := "SELECT A.updatetime , A.cnt1 AS cnt1a, A.cnt3 AS cnt3a, B.cnt1 AS cnt1b , B.cnt3 AS cnt3b , A.cnt1 - B.cnt1 AS addcnt FROM Koreastatus A JOIN Koreastatus B"
	qry = qry + " ON A.updatetime = DATE_FORMAT(DATE_ADD(CAST(B.updatetime AS DATE), INTERVAL 1 DAY) , '%Y-%m-%d')"
	//qry := "CALL P_CHALLENGEGEAR_SHCEDULE (? , ? , ? , ?);"

	fmt.Println("before koreastatuslist ", koreastatuslist)
	if err := db.sqlgormdb.Raw(qry).Scan(&koreastatuslist).Error; err != nil {
		// fmt.Println("error  :", err.Error())
		return koreastatuslist
	}

	fmt.Println("after koreastatuslist ", koreastatuslist)

	return koreastatuslist

}

func (db *GormAccountDB) GetWorldMaxDate() string {

	var max string
	row := db.sqlgormdb.Table("WorldNowstatus").Select("MAX(updatetime)").Row()
	row.Scan(&max)

	return max

}

func (db *GormAccountDB) GetGroupExampleMaxDate() string {

	var max string
	row := db.sqlgormdb.Table("GroupExample").Select("MAX(updatetime)").Row()
	row.Scan(&max)

	return max

}

func (db *GormAccountDB) GetGroupExample(updatetime string) []GroupExample {

	var st []GroupExample
	if err := db.sqlgormdb.Where("updatetime = ?", updatetime).Find(&st).Error; err != nil {
		fmt.Println("GetGroupExample Error :  ", err.Error())
	}

	return st

}

func (db *GormAccountDB) GetWorldstatusMaxDate() string {

	var max string
	row := db.sqlgormdb.Table("Worldstatus").Select("MAX(updatetime)").Row()
	row.Scan(&max)

	return max

}

func (db *GormAccountDB) GetWorldStatusList(updatetime string) []WorldStatusList {

	var worldstatuslist []WorldStatusList

	//qry := "CALL P_CHALLENGEGEAR_SHCEDULE (" + scheduleidxstr + " , '" + mode + "' , @o_error_msg ,  @o_return);SELECT @o_error_msg AS ErrorMsg , @o_return AS ReturnCode;"
	qry := "SELECT  A.countryname , SUM(A.confirm_value) confirmvalue, SUM(B.death_value)  deathvalue "
	qry = qry + " FROM Worldstatus A JOIN WorldstatusDeath B "
	qry = qry + " ON A.updatetime = B.updatetime  "
	qry = qry + " AND A.countryname = B.countryname  "
	qry = qry + " AND A.province = B.province "
	qry = qry + " WHERE A.updatetime = '" + updatetime + "' "
	qry = qry + " GROUP BY  A.countryname , B.countryname "
	qry = qry + " ORDER BY  SUM(A.confirm_value) DESC "

	fmt.Println("before koreastatuslist ", worldstatuslist)
	if err := db.sqlgormdb.Raw(qry).Scan(&worldstatuslist).Error; err != nil {
		// fmt.Println("error  :", err.Error())
		return worldstatuslist
	}

	fmt.Println("after koreastatuslist ", worldstatuslist)

	return worldstatuslist

}

func (db *GormAccountDB) GetKoreaRealTimestatusIdx() int {

	var max int
	row := db.sqlgormdb.Table("KoreaRealTimestatus").Select("MAX(idx)").Row()
	row.Scan(&max)

	return max

}

func (db *GormAccountDB) GetKoreaRealTimestatus(idx int) KoreaRealTimestatus {

	var st KoreaRealTimestatus
	if err := db.sqlgormdb.Where("idx = ?", idx).Find(&st).Error; err != nil {
		fmt.Println("GetKoreaRealTimestatus Error :  ", err.Error())
	}

	return st

}

func (db *GormAccountDB) GetWorldNowStatus(updatetime string) WorldNowStatus {

	var st WorldNowStatus
	if err := db.sqlgormdb.Where("updatetime = ?", updatetime).Find(&st).Error; err != nil {
		fmt.Println("GetWorldNowStatus Error :  ", err.Error())
	}

	return st

}

func (db *GormAccountDB) GetWorldListMaxDate() string {

	var max string
	row := db.sqlgormdb.Table("Worldstatus").Select("MAX(updatetime)").Row()
	row.Scan(&max)

	return max

}

func (db *GormAccountDB) GetWorldList(updatetime string) []WorldStatus {

	var st []WorldStatus
	if err := db.sqlgormdb.Where("updatetime = ?", updatetime).Find(&st).Error; err != nil {
		fmt.Println("Getkoreastatus Error :  ", err.Error())
	}

	return st

}

func (db *GormAccountDB) GetWorldRealTimeList() []WorldRealTimestatus {

	var st []WorldRealTimestatus
	if err := db.sqlgormdb.Find(&st).Error; err != nil {
		fmt.Println("GetWorldRealTimeList Error :  ", err.Error())
	}

	//fmt.Println("st : ", st)

	return st

}

func (db *GormAccountDB) SetKoreaStatus(st KoreaStatus) error {

	// tx := db.sqlgormdb.Begin()
	// //var st KoreaStatus

	// if err := tx.Create(&st).Error; err != nil {
	// 	tx.Rollback()
	// 	return err
	// }

	// tx.Commit()

	count := 0

	db.sqlgormdb.Where("koreahour = ?", st.KoreaHour).Find(&st).Count(&count)

	if count > 0 {
		return nil
	}
	fmt.Println("SetKoreaStatus ------------------ count : ", count)

	fmt.Println("SetKoreaStatus")
	if err := db.sqlgormdb.Save(&st).Error; err != nil {

		return err
	}

	return nil
}

func (db *GormAccountDB) SetWorldNowStatus(st WorldNowStatus) error {

	//count := 0

	// db.sqlgormdb.Where("worldhour = ?", st.WorldHour).Find(&st).Count(&count)

	// if count > 0 {
	// 	return nil
	// }
	// fmt.Println("SetWorldNowStatus ------------------ count : ", count)

	fmt.Println("SetWorldNowStatus")
	if err := db.sqlgormdb.Save(&st).Error; err != nil {

		return err
	}

	return nil
}

func (db *GormAccountDB) SetWorldStatus(st WorldStatus) error {

	if err := db.sqlgormdb.Save(&st).Error; err != nil {

		return err
	}

	return nil
}

func (db *GormAccountDB) GetWorldDailyNowList() []WorldNewStatus {

	var worldnewstatuslist []WorldNewStatus

	// qry := "SELECT country , SUM(Confirmed) AS confirmed, SUM(Deaths) AS deaths, SUM(Recovered) AS recovered "
	// qry = qry + " FROM   WorldNewStatus "
	// qry = qry + " GROUP BY Country "
	// qry = qry + " ORDER BY SUM(Confirmed) DESC "

	qry := "SELECT B.CountryCode AS countrycode ,A.country , B.name1 ,B.name2 ,B.name3 ,B.name4 , confirmed , deaths ,recovered , B.continent  FROM ( "
	qry = qry + " SELECT country , SUM(Confirmed) AS confirmed, SUM(Deaths) AS deaths, SUM(Recovered) AS recovered  "
	qry = qry + " FROM   WorldNewStatus  "
	qry = qry + " GROUP BY Country ) A "
	qry = qry + " LEFT JOIN CountryInfo B "
	qry = qry + "  ON A.country = B.ExcelCountry  "

	fmt.Println("before koreastatuslist ", worldnewstatuslist)
	if err := db.sqlgormdb.Raw(qry).Scan(&worldnewstatuslist).Error; err != nil {
		// fmt.Println("error  :", err.Error())
		return worldnewstatuslist
	}

	fmt.Println("after koreastatuslist ", worldnewstatuslist)

	return worldnewstatuslist

}

func (db *GormAccountDB) GetWorldDailyNowListSummary() []WorldNewStatus {

	var worldnewstatuslist []WorldNewStatus

	// qry := "SELECT country , SUM(Confirmed) AS confirmed, SUM(Deaths) AS deaths, SUM(Recovered) AS recovered "
	// qry = qry + " FROM   WorldNewStatus "
	// qry = qry + " GROUP BY Country "
	// qry = qry + " ORDER BY SUM(Confirmed) DESC "

	qry := "SELECT B.CountryCode AS countrycode ,A.Excelcountry AS country , B.name1 ,B.name2 ,B.name3 ,B.name4 , confirmed , deaths ,recovered , B.continent  FROM  "
	qry = qry + " WorldNewStatusSummary A "
	qry = qry + " JOIN CountryInfo B  "
	qry = qry + " ON A.Excelcountry = B.ExcelCountry   "
	qry = qry + " ORDER BY A.confirmed DESC "

	fmt.Println("before koreastatuslist ", worldnewstatuslist)
	if err := db.sqlgormdb.Raw(qry).Scan(&worldnewstatuslist).Error; err != nil {
		// fmt.Println("error  :", err.Error())
		return worldnewstatuslist
	}

	fmt.Println("after koreastatuslist ", worldnewstatuslist)

	return worldnewstatuslist

}

func (db *GormAccountDB) GetWorldDailyNowListContinent(continent string) []WorldNewStatus {

	var worldnewstatuslist []WorldNewStatus

	// qry := "SELECT country , SUM(Confirmed) AS confirmed, SUM(Deaths) AS deaths, SUM(Recovered) AS recovered "
	// qry = qry + " FROM   WorldNewStatus "
	// qry = qry + " GROUP BY Country "
	// qry = qry + " ORDER BY SUM(Confirmed) DESC "

	qry := "SELECT B.CountryCode AS countrycode , A.country , B.name1 ,B.name2 ,B.name3 ,B.name4 , confirmed , deaths ,recovered , B.continent  FROM ( "
	qry = qry + " SELECT country , SUM(Confirmed) AS confirmed, SUM(Deaths) AS deaths, SUM(Recovered) AS recovered  "
	qry = qry + " FROM   WorldNewStatus  "
	qry = qry + " GROUP BY Country ) A "
	qry = qry + " LEFT JOIN CountryInfo B "
	qry = qry + "  ON A.country = B.ExcelCountry  "
	qry = qry + "   WHERE B.Continent LIKE '%" + continent + "%' "

	fmt.Println("before koreastatuslist ", worldnewstatuslist)
	if err := db.sqlgormdb.Raw(qry).Scan(&worldnewstatuslist).Error; err != nil {
		// fmt.Println("error  :", err.Error())
		return worldnewstatuslist
	}

	fmt.Println("after koreastatuslist ", worldnewstatuslist)

	return worldnewstatuslist

}

// git 에서 얻어온 내용 업데이트
func (db *GormAccountDB) SetWorldDailyStatus(Province, CountryName, LastUpdateTime, Confirmed, Deaths, Recovered, Latitude, Longitude string) error {

	//confirmedint := strconv.Atoi(Confirmed)
	//deathsint := strconv.Atoi(Deaths)
	//recoerverdint := strconv.Atoi(Recovered)

	sql := "INSERT INTO WorldNewStatus(Province,Country,LastUpdate,Confirmed,Deaths,Recovered,Latitude,Longitude) "
	sql = sql + " VALUES( '" + Province + "' , '" + CountryName + "','" + LastUpdateTime + "'"
	sql = sql + "," + Confirmed + "," + Deaths + "," + Recovered + ","
	sql = sql + "'" + Latitude + "','" + Longitude + "')"
	sql = sql + " ON DUPLICATE KEY UPDATE "
	sql = sql + " Confirmed = IF ( Confirmed < " + Confirmed + "," + Confirmed + ", Confirmed)"
	sql = sql + " , Deaths = IF ( Deaths < " + Deaths + "," + Deaths + ", Deaths)"
	sql = sql + " , Recovered = IF ( Recovered < " + Recovered + "," + Recovered + ", Recovered)"

	if err := db.sqlgormdb.Exec(sql).Error; err != nil {

		return err
	}

	return nil
}

func (db *GormAccountDB) GetWorldDailyStatusSummaryByCountry() []WorldNewStatusSummary {

	var worldnewstatuslist []WorldNewStatusSummary

	qry := "SELECT country AS excelcountry, SUM(Confirmed) AS confirmed, SUM(Deaths) AS deaths, SUM(Recovered) AS recovered  "
	qry = qry + " FROM   WorldNewStatus  "
	qry = qry + " GROUP BY Country  "

	fmt.Println("before koreastatuslist ", worldnewstatuslist)
	if err := db.sqlgormdb.Raw(qry).Scan(&worldnewstatuslist).Error; err != nil {
		// fmt.Println("error  :", err.Error())
		return worldnewstatuslist
	}

	return worldnewstatuslist

}

func (db *GormAccountDB) SetWorldWorldNewStatusSummary(CountryName string, Confirmed, Deaths, Recovered int) error {

	confirmed := strconv.Itoa(Confirmed)
	deaths := strconv.Itoa(Deaths)
	recoverd := strconv.Itoa(Recovered)

	sql := "INSERT INTO WorldNewStatusSummary(Excelcountry , Confirmed , Deaths , Recovered) "
	sql = sql + " VALUES( '" + CountryName + "'"
	sql = sql + "," + confirmed + "," + deaths + "," + recoverd + ")"
	sql = sql + " ON DUPLICATE KEY UPDATE "
	sql = sql + " Confirmed = IF ( Confirmed < " + confirmed + "," + confirmed + ", Confirmed)"
	sql = sql + " , Deaths = IF ( Deaths < " + deaths + "," + deaths + ", Deaths)"
	sql = sql + " , Recovered = IF ( Recovered < " + recoverd + "," + recoverd + ", Recovered)"

	if err := db.sqlgormdb.Exec(sql).Error; err != nil {

		return err
	}

	return nil

}

func (db *GormAccountDB) SetWorldStatusDeath(st WorldStatusDeath) error {

	if err := db.sqlgormdb.Save(&st).Error; err != nil {

		return err
	}

	return nil
}

func (db *AccountDB) GetMaxAccountID() (int, error) {
	var maxid int

	sqlstr := "SELECT MAX(id) FROM ACCOUNT.ACCOUNT_INFO"
	err := db.sqlwrap.Get(&maxid, sqlstr)

	if err != nil {
		fmt.Println(err.Error())

	}

	return maxid, err
}

func (db *AccountDB) GetServerNowUser() ([]ServerNowUser, error) {

	var servernowuser []ServerNowUser

	sqlstr := "SELECT servername , count FROM ACCOUNT_LOG.TESTCOUNT"
	err := db.sqlwrap.Select(&servernowuser, sqlstr)

	if err != nil {
		fmt.Println(err.Error())

	}

	return servernowuser, err
}

func (db *AccountDB) SetCheatHistory(ServerGroupID, CharacterName, Message, Result string) error {

	tx := db.sqlwrap.MustBegin()

	defer func() {

		if r := recover(); r != nil {

			db.sqlwrap.Rollback(tx)

			fmt.Println("Queryx panic call recover : ", r)

		}

	}()

	sqlstr := "INSERT INTO CHEATHISTORY(servergroupid , charactername , message , result , create_time) VALUES ( ? , ? , ? , ? , NOW() )"

	_, err := db.sqlwrap.ExecInTran(tx, sqlstr, ServerGroupID, CharacterName, Message, Result)
	if err != nil {
		db.sqlwrap.Rollback(tx)
		return err
	}

	db.sqlwrap.Commit(tx)

	return nil

}

func (db *AccountDB) SetDataFifa(date string, rank string, country string, countrysmall string, group string, point string) error {

	tx := db.sqlwrap.MustBegin()

	defer func() {

		if r := recover(); r != nil {

			db.sqlwrap.Rollback(tx)

			fmt.Println("Queryx panic call recover : ", r)

		}

	}()

	sqlstr := "INSERT INTO fifa(datestring , rank , country , countrysmall , points , region) VALUES ( ? , ? , ? , ? , ? , ? )"
	//fmt.Println("sqlstr", sqlstr)
	_, err := db.sqlwrap.ExecInTran(tx, sqlstr, date, rank, country, countrysmall, point, group)
	if err != nil {
		db.sqlwrap.Rollback(tx)
		return err
	}

	db.sqlwrap.Commit(tx)

	return nil

}
