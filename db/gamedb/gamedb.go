package gamedb

import (
	"optool/config"
	"optool/db/sqlxwrap"

	"fmt"
	. "optool/structures"
	"strconv"
	//	. "jcm/db/model"
)

type GameDB struct {
	//sqldb *sqlx.DB
	sqlwrap *sqlxwrap.SqlxWrap
}

//func ConnectGameDB(Username, Password, Address, Port, DBname string, ConnMaxLifetime, MaxIdleConns, MaxOpenConns int) (*GameDB, bool) {
func ConnectGameDB(gdbconfig config.GameDBConfig, logconfig config.LogMapConfig) (*GameDB, error) {

	Username := gdbconfig.Username
	Password := gdbconfig.Password
	Address := gdbconfig.Address
	Port := strconv.Itoa(gdbconfig.Port)
	DBname := gdbconfig.DBname
	ConnMaxLifetime := gdbconfig.ConnMaxLifetime
	MaxIdleConns := gdbconfig.MaxIdleConns
	MaxOpenConns := gdbconfig.MaxOpenConns

	dbURI := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true",
		Username,
		Password,
		Address,
		Port,
		DBname)

	FileName := logconfig.FileName
	FileExtension := logconfig.FileExtension
	MaxSize := logconfig.MaxSize
	MaxBackup := logconfig.MaxBackup
	MaxAge := logconfig.MaxAge
	StdOut := logconfig.StdOut
	Debug := logconfig.Debug
	JSONFormat := logconfig.JSONFormat

	w, err := sqlxwrap.Connect(dbURI, ConnMaxLifetime, MaxIdleConns, MaxOpenConns, Address, DBname, FileName, FileExtension, MaxSize, MaxBackup, MaxAge, StdOut, Debug, JSONFormat)

	gdb := &GameDB{
		//db,
		w,
	}

	return gdb, err
}

func (db *GameDB) GetCharacterListFromName(CharacterName string) ([]ETC2JOINMAIN, error) {

	var ETC2List []ETC2JOINMAIN

	//sqlstr := "SELECT servergroup_id , count(1) cnt FROM CHARACTERS GROUP BY servergroup_id"
	//sqlstr := "SELECT character_id , target , multikey1 , multikey2 , infos FROM ETC2 WHERE target = 'character' AND infos LIKE '%" + CharacterName + "%'"
	sqlstr := "SELECT A.character_id , B.account_id , servergroup_id , create_time , login_time , infos FROM ETC2  A JOIN MAIN B ON A.character_id = B.character_id 	WHERE target = 'character' AND infos LIKE '%" + CharacterName + "%'"

	err := db.sqlwrap.Select(&ETC2List, sqlstr)
	if err != nil {
		return ETC2List, err
	}

	return ETC2List, nil

}

func (db *GameDB) GetCharacterDetail(CharacterID string) ([]ResultCharacterDetail, error) {

	var CharacterDetail []ResultCharacterDetail

	//sqlstr := "SELECT servergroup_id , count(1) cnt FROM CHARACTERS GROUP BY servergroup_id"
	//sqlstr := "SELECT character_id , target , multikey1 , multikey2 , infos FROM ETC2 WHERE target = 'character' AND infos LIKE '%" + CharacterName + "%'"
	sqlstr := "SELECT character_id , target , multikey1 , multikey2 , infos FROM ETC2 WHERE character_id = '" + CharacterID + "'"

	err := db.sqlwrap.Select(&CharacterDetail, sqlstr)
	if err != nil {
		return CharacterDetail, err
	}

	return CharacterDetail, nil

}

func (db *GameDB) GetCharacterServerGroupIDCount() ([]CharacterCount, error) {

	var charlist []CharacterCount

	//sqlstr := "SELECT servergroup_id , count(1) cnt FROM CHARACTERS GROUP BY servergroup_id"
	sqlstr := "SELECT servergroup_id , count(1) cnt FROM MAIN GROUP BY servergroup_id"

	err := db.sqlwrap.Select(&charlist, sqlstr)
	if err != nil {
		return charlist, err
	}

	return charlist, nil

}

func (db *GameDB) GetTableColumnInfo() ([]TableColumnsInfo, error) {

	var tablecolumninfo []TableColumnsInfo

	//sqlstr := "SELECT servergroup_id , count(1) cnt FROM CHARACTERS GROUP BY servergroup_id"
	//sqlstr := "SELECT TABLE_NAME , COLUMN_NAME , COLUMN_TYPE , COLUMN_COMMENT , COLUMN_KEY FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'GAMEDB'"
	sqlstr := "SELECT TABLE_NAME , COLUMN_NAME , DATA_TYPE , COLUMN_COMMENT , COLUMN_KEY FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'GAMEDB'"

	err := db.sqlwrap.Select(&tablecolumninfo, sqlstr)
	if err != nil {
		return tablecolumninfo, err
	}

	return tablecolumninfo, nil

}
