package structures

type ServerNowUser struct {
	ServerName string `db:"servername" json:"skill"`
	Count      int    `db:"count" json:"value"`
}
