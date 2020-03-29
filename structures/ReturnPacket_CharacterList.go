package structures

import "time"

type ResultCharacterList struct {
	CharacterID    string    `json:"character_id"`
	AccountID      int       `json:"account_id"`
	ServerGroupID  string    `json:"servergroup_id"`
	CreateTime     time.Time `json:"create_time"`
	LoginTime      time.Time `json:"login_time"`
	DBID           string    `json:"dbid"`
	Exp            int       `json:"exp"`
	Name           string    `json:"name"`
	Level          int       `json:"level"`
	OpenWorldIndex int       `json:"openworldindex"`
}
