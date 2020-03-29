package structures

import (
	"encoding/json"
	"time"
)

type ETC2JOINMAIN struct {
	CharacterID   string          `db:"character_id"`
	AccountID     int             `db:"account_id"`
	ServerGroupID string          `db:"servergroup_id"`
	CreateTime    time.Time       `db:"create_time"`
	LoginTime     time.Time       `db:"login_time"`
	Infos         json.RawMessage `db:"infos"`
	//Target        string          `db:"target"`
	//Multikey1     string          `db:"multikey1"`
	//Multikey2     string          `db:"multikey2"`
}
