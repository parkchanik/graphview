package accountdb

import (
	"fmt"
	"strconv"

	//	. "jcm/errorcode"

	. "optool/structures"

	_ "github.com/go-sql-driver/mysql"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func (db *GormAccountDB) SetRoyLabData(Nation string, Confirmed, Deaths, Recovered int) error {

	confirmed := strconv.Itoa(Confirmed)
	deaths := strconv.Itoa(Deaths)
	recoverd := strconv.Itoa(Recovered)

	sql := "INSERT INTO RoyLabData(Nation , Confirmed , Deaths , Recovered) "
	sql = sql + " VALUES( '" + Nation + "'"
	sql = sql + "," + confirmed + "," + deaths + "," + recoverd + ")"
	sql = sql + " ON DUPLICATE KEY UPDATE "
	sql = sql + " Confirmed = IF ( Confirmed < " + confirmed + "," + confirmed + ", Confirmed)"
	sql = sql + " , Deaths = IF ( Deaths < " + deaths + "," + deaths + ", Deaths)"
	sql = sql + " , Recovered = IF ( Recovered < " + recoverd + "," + recoverd + ", Recovered)"

	//fmt.Println(sql)

	if err := db.sqlgormdb.Exec(sql).Error; err != nil {

		return err
	}

	return nil

}

func (db *GormAccountDB) GetWorldDataByRoyLabData() []WorldNewStatus {

	var worldnewstatuslist []WorldNewStatus

	qry := "SELECT B.Countrycode AS countrycode , B.Country AS country, B.Name1 AS name1 , B.Name2 AS name2 , B.Name3 AS name3 , B.Name4 AS name4 "
	qry = qry + " , B.Name5 AS name5, B.Name6 AS name6, A.Confirmed AS confirmed, A.Deaths AS deaths , A.Recovered AS recovered , B.Continent AS continent"
	qry = qry + " FROM RoyLabData A JOIN CountryInfo B "
	qry = qry + " ON A.Nation = B.Country  "

	if err := db.sqlgormdb.Raw(qry).Scan(&worldnewstatuslist).Error; err != nil {
		fmt.Println("error  :", err.Error())
		return worldnewstatuslist
	}

	return worldnewstatuslist

}

func (db *GormAccountDB) GetCoronaDataByRoyLabDataName(name int) []WorldNewStatusName {

	var worldnewstatuslist []WorldNewStatusName

	qry := "SELECT B.Countrycode AS countrycode , B.Country AS country, "

	switch name {
	case 1:
		qry = qry + " B.Name1 AS name  "
	case 2:
		qry = qry + " B.Name2 AS name  "
	case 3:
		qry = qry + " B.Name3 AS name  "
	case 4:
		qry = qry + " B.Name4 AS name  "
	case 5:
		qry = qry + " B.Name5 AS name  "
	case 6:
		qry = qry + " B.Name6 AS name  "
	default:
		qry = qry + " B.Name1 AS name  "
	}

	qry = qry + " , A.Confirmed AS confirmed, A.Deaths AS deaths , A.Recovered AS recovered , B.Continent AS continent"
	qry = qry + " FROM RoyLabData A JOIN CountryInfo B "
	qry = qry + " ON A.Nation = B.Country  "

	if err := db.sqlgormdb.Raw(qry).Scan(&worldnewstatuslist).Error; err != nil {
		fmt.Println("error  :", err.Error())
		return worldnewstatuslist
	}

	return worldnewstatuslist

}
