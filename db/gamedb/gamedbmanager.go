package gamedb

import (
	"optool/config"
	"sync"

	_ "github.com/go-sql-driver/mysql"
)

type GameDBList struct {
	gamedb map[string]*GameDB
	rwlock sync.RWMutex
}

func ConnectGameDBList(gamedbconfig []config.GameDBConfig, logconfig config.LogMapConfig) (*GameDBList, error) {

	gdbmap := make(map[string]*GameDB)
	for i := 0; i < len(gamedbconfig); i++ {

		db, err := ConnectGameDB(gamedbconfig[i], logconfig)
		if err != nil {

			//logger.Error("ConnectError , ConnectGameDB (%s)", gamedbconfig)
			return nil, err
		}
		key := gamedbconfig[i].DBID

		gdbmap[key] = db
	}

	gdblist := &GameDBList{}

	gdblist.gamedb = gdbmap

	return gdblist, nil
}

func (l *GameDBList) GetGameDB(key string) (*GameDB, bool) {

	l.rwlock.RLock()
	defer l.rwlock.RUnlock()
	db, ok := l.gamedb[key]

	if !ok {
		return nil, false
	}

	return db, true
}

func (l *GameDBList) GetGameDBMap() map[string]*GameDB {

	return l.gamedb
}

/*
func (l *GameDBList) GetMainByID(gdb string, mid uint) (Main, bool) {
	fmt.Println("(l *GameDBList) GetMainByID start")
	return l.gamedb[gdb].GetMainByID(mid)
}

func (l *GameDBList) GetMainAllData(gdb string, mid uint) (Main, error) {
	fmt.Println("GetMainAllData")
	return l.gamedb[gdb].GetMainAllData(mid)

}

func (l *GameDBList) AddCharacter(gdb string, m *Characters) (int, error) {
	fmt.Println("AddCharacter")
	return l.gamedb[gdb].AddCharacter(m)

}
*/
