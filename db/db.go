package db

import (
	"optool/config"
	"optool/db/accountdb"
	"optool/db/gamedb"
	"optool/db/session"
	//. "optool/structures"
)

type LoginServerDB struct {
	AccountDB     *accountdb.GormAccountDB
	SessionDBList *session.SessionDBList
	GameDBList    *gamedb.GameDBList
	//ServerLogger  *logger.Logger
}

func (ldb *LoginServerDB) ConnectAccountDB(config *config.Config) (*accountdb.GormAccountDB, error) {

	AccountConfig := config.AccountDBCfg

	DBLogConfig := config.LogMap["dblog"]

	accountsqlx, err := accountdb.ConnectAccountDB(AccountConfig, DBLogConfig)

	return accountsqlx, err

}

func (ldb *LoginServerDB) ConnectSessionDB(config *config.Config) (*session.SessionDBList, error) {

	SessionDBConfig := config.SessionDBCfg

	DBLogConfig := config.LogMap["dblog"]
	//sessiondb, err := session.ConnectSessionDB(config.SessionDBCfg)
	sessiondblist, err := session.ConnectSessionDBList(SessionDBConfig, DBLogConfig)

	return sessiondblist, err

}

func (ldb *LoginServerDB) ConnectGameDB(config *config.Config) (*gamedb.GameDBList, error) {

	gamedbconfig := config.GameDBCfg
	DBLogConfig := config.LogMap["dblog"]
	gamedblist, err := gamedb.ConnectGameDBList(gamedbconfig, DBLogConfig)

	return gamedblist, err

}
