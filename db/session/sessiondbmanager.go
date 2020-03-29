package session

import (
	"fmt"
	"optool/config"
	"sync"
)

type SessionDBList struct {
	sessiondb map[string]*SessionDB
	rwlock    sync.RWMutex
}

func ConnectSessionDBList(sessiondbconfig map[string]config.SessionDBConfig, logconfig config.LogMapConfig) (*SessionDBList, error) {

	sdbmap := make(map[string]*SessionDB)

	for k, v := range sessiondbconfig {
		fmt.Println("sessiondbconfig key : ", k)
		fmt.Println("sessiondbconfig ServerGroupID : ", v.ServerGroupID)
		db, err := ConnectSessionDB(v.Addr, v.ServerGroupID)
		if err != nil {

			//logger.Error("ConnectError , ConnectGameDB (%s)", gamedbconfig)
			return nil, err
		}

		sdbmap[k] = db
	}

	sdblist := &SessionDBList{}
	sdblist.sessiondb = sdbmap

	return sdblist, nil
}

func (l *SessionDBList) GetSessionDB(key string) (*SessionDB, bool) {

	l.rwlock.RLock()
	defer l.rwlock.RUnlock()
	db, ok := l.sessiondb[key]

	if !ok {
		return nil, false
	}

	return db, true
}

func (l *SessionDBList) GetSessionDBMap() map[string]*SessionDB {

	return l.sessiondb
}
