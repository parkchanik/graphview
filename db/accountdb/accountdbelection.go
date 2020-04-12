package accountdb

import (
	"fmt"
	"strconv"

	//	. "jcm/errorcode"

	. "optool/structures"

	_ "github.com/go-sql-driver/mysql"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func (db *GormAccountDB) SetElection(Party string, Cnt int) error {

	// confirmed := strconv.Itoa(Confirmed)
	// deaths := strconv.Itoa(Deaths)
	// recoverd := strconv.Itoa(Recovered)
	Cntstr := strconv.Itoa(Cnt)

	sql := "INSERT INTO ELECTION(PARTY , cnt) "
	sql = sql + " VALUES( '" + Party + "'"
	sql = sql + "," + Cntstr + ")"

	//fmt.Println(sql)

	if err := db.sqlgormdb.Exec(sql).Error; err != nil {

		return err
	}

	return nil

}

func (db *GormAccountDB) GetElection() []Election {

	var electionlist []Election

	qry := "SELECT PARTY , PARENT ,PARTYNUM , cnt , num1cnt , PERCENT , color FROM ELECTION"

	if err := db.sqlgormdb.Raw(qry).Scan(&electionlist).Error; err != nil {
		fmt.Println("error  :", err.Error())
		return electionlist
	}

	return electionlist

}

func (db *GormAccountDB) SetBiryeElection(Party string, Cnt int) error {

	Cntstr := strconv.Itoa(Cnt)

	sql := "INSERT INTO ELECTION(PARTY , cnt) "
	sql = sql + " VALUES( '" + Party + "'"
	sql = sql + "," + Cntstr + ")"
	sql = sql + " ON DUPLICATE KEY UPDATE "
	sql = sql + " cnt =" + Cntstr + ")"

	//fmt.Println(sql)

	if err := db.sqlgormdb.Exec(sql).Error; err != nil {

		return err
	}

	return nil

}

func (db *GormAccountDB) SetFirstElection(Party string, Cnt int) error {

	Cntstr := strconv.Itoa(Cnt)

	sql := "INSERT INTO FIRSTELECTION(PARTY , cnt) "
	sql = sql + " VALUES( '" + Party + "'"
	sql = sql + "," + Cntstr + ")"
	sql = sql + " ON DUPLICATE KEY UPDATE "
	sql = sql + " cnt =" + Cntstr + ")"

	//fmt.Println(sql)

	if err := db.sqlgormdb.Exec(sql).Error; err != nil {

		return err
	}

	return nil

}
