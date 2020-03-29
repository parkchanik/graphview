package structures

type DashBoardItem struct {
	ServerTotalUser    []TotalUser        `json:serveralltotaluser"`
	AccountIDCount     int                `json:"accountidcnt"`
	CharacterCountInfo CharacterCountInfo `json:"charactercountinfo"`
}

type TotalUser struct {
	ServerGroupID string `json:servergroupid"`
	TotalUser     int    `json:totaluser"`
}

type CharacterCount struct {
	ServerGroupID string `db:"servergroup_id" json:"servergroupid"`
	Count         int    `db:"cnt" json:"cnt"`
}

type CharacterCountDB struct {
	Key   string `json:"key"`
	Count int    `json:"cnt"`
}

type CharacterCountInfo struct {
	TotalCharacterCount  int                `json:"totalcount"`
	CharacterCountDB     []CharacterCountDB `json:"charactercountdb"`
	CharacterCountServer []CharacterCountDB `json:"charactercountserver"`
}

type ReturnAllServerList struct {
	AllList []ReturnServerList
}

type ReturnServerList struct {
	ServerGroupID    string              `json:servergroupud"`
	AliveServerList  []SessionServerList `json:"aliveserverlist"`
	ActiveServerList []ActiveserverList  `json:"activeserverlist"`
}

type SessionServerList struct {
	Key   string           `json:"serverlistkey"`
	Value []ServerListInfo `json:"serverlistinfo"`
}

func (ServerList *SessionServerList) GetServerListTotalScore() int {

	totalscore := 0

	for _, v := range ServerList.Value {

		//fmt.Println(" value : ", v)
		//fmt.Println(" key : ", k)

		//fmt.Println(" Score :", v.Score)

		totalscore = totalscore + v.Score

	}

	return totalscore
}

type ServerListInfo struct {
	Value string            `json:"value"`
	Key   string            `json:"alivekey"`
	Score int               `json:"score"`
	Info  map[string]string `json:"aliveinfo"`
}

type ActiveserverList struct {
	Key   string                 `json:"activeserverlistkey"`
	Value []ActiveServerListInfo `json:"serverlistinfo"`
	//Value []string `json:"iplist"`

}

type ActiveServerListInfo struct {
	Value string            `json:"value"`
	Key   string            `json:"alivekey"`
	Score int               `json:"score"`
	Info  map[string]string `json:"aliveinfo"`
}
