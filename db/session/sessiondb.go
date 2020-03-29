package session

import (
	"fmt"
	. "optool/structures"
	"time"

	"github.com/gomodule/redigo/redis"
)

const SESSION_DB_CONN = 5

const (
	KEY_SERVERLIST       = "serverlist"
	KEY_ALIVESERVER      = "aliveserver"
	KEY_ALIVEQUERYSERVER = "queryserver:alive"
	KEY_SESSIONINFO      = "sessioninfo"
	KEY_QUERYSERVERLIST  = "queryserver:info"
	KEY_USERQUERYSERVER  = "queryserver:user"
	KEY_CLIENTMAPPING    = "clikeymap"
)

type SessionDB struct {
	pool          *redis.Pool
	servergroupid string
}

func ConnectSessionDB(Addr string, serverGroupID string) (*SessionDB, error) {
	// create redis pool
	pool := &redis.Pool{
		MaxIdle:   SESSION_DB_CONN,
		MaxActive: SESSION_DB_CONN,
		Dial: func() (redis.Conn, error) {
			var (
				c   redis.Conn
				err error
			)

			for i := 0; i < SESSION_DB_CONN; i++ {
				c, err = redis.Dial("tcp", Addr)
				if err == nil {
					break
				}

				time.Sleep(time.Second)
			}

			if err != nil {
				return nil, err
			}

			return c, nil
		},
		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			_, err := c.Do("PING")
			return err
		},
		Wait: true,
	}

	// test connection
	c := pool.Get()
	defer c.Close()

	_, err := c.Do("PING")
	if err != nil {
		//return nil, errs.New("can not connect session redisDB. address: %s", address)
		return nil, err
	}

	return &SessionDB{pool, serverGroupID}, nil
}

//GetSelectServer 유저가 접속시 OpenWorldIndex 로 서버 선택
func (s *SessionDB) GetUnionsAllServerList(serverGroupID string) ([]SessionServerList, []ActiveserverList, error) {

	p := s.pool.Get()
	defer p.Close()

	/*
		type SessionServerList struct {
			Key   string
			Value []Scores
		}

		type Scores struct {
			Value string
			Score int
		}
	*/
	//slistkey := serverid + ":" + KEY_SERVERLIST + ":" + strconv.Itoa(mindex) //serverlist

	k := serverGroupID + ":config_worldcount"

	hr, err := redis.Values(p.Do("HGETALL", k))
	if err != nil {
		fmt.Println("ERROR HGETALL MSG:", err.Error())
		return nil, nil, err
	}

	//fmt.Println("hr = ", hr)

	//hrmap := make(map[string]string)

	var worldindexarray []SessionServerList
	var activeworldindexarray []ActiveserverList

	// world count 에서 가져온 내용
	for i := 0; i < len(hr); i += 2 {
		key, _ := redis.String(hr[i], nil)
		//value, _ := redis.String(hr[i+1], nil)

		//hrmap[key] = value

		serverlistkey := serverGroupID + ":serverlist:" + key

		sm, err := redis.IntMap(p.Do("ZRANGE", serverlistkey, 0, -1, "WITHSCORES"))
		if err != nil {
			fmt.Println("error redis.IntMap(p.Do(ZRANGE, sl.Key, 0, -1, WITHSCORES", err.Error())
			return nil, nil, err
		}

		var slinfoarray []ServerListInfo

		for k, v := range sm {

			//fmt.Println("key = ", k)

			aliveserverkey := serverGroupID + ":aliveserver:" + k

			alivemap, err := redis.StringMap(p.Do("HGETALL", aliveserverkey))
			if err != nil {
				fmt.Println("alivemap", err.Error())
				return nil, nil, err
			}

			//fmt.Println("alivemap = ", alivemap)

			slinfo := ServerListInfo{k, aliveserverkey, v, alivemap}

			slinfoarray = append(slinfoarray, slinfo)

		}

		sl := SessionServerList{serverlistkey, slinfoarray}

		worldindexarray = append(worldindexarray, sl)

		//// active serverlist 추가

		activeserverlistkey := serverGroupID + ":active_serverlist:" + key

		acmap, err := redis.IntMap(p.Do("ZRANGE", activeserverlistkey, 0, -1, "WITHSCORES"))
		if err != nil {
			fmt.Println("error redis.IntMap(p.Do(ZRANGE, sl.Key, 0, -1, WITHSCORES", err.Error())
			return nil, nil, err
		}

		var activeinfoarray []ActiveServerListInfo

		for k, v := range acmap {

			activeserverkey := serverGroupID + ":aliveserver:" + k

			activemap, err := redis.StringMap(p.Do("HGETALL", activeserverkey))
			if err != nil {
				fmt.Println("activeserveriplist", err.Error())
				//	return nil, err
			}

			activeinfo := ActiveServerListInfo{k, activeserverkey, v, activemap}

			activeinfoarray = append(activeinfoarray, activeinfo)

		}

		asl := ActiveserverList{activeserverlistkey, activeinfoarray}

		activeworldindexarray = append(activeworldindexarray, asl)

	}

	return worldindexarray, activeworldindexarray, nil

}
