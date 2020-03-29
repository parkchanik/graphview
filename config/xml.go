package config

type xmlQueryServerListConfig struct {
	QueryServerList []xmlQueryServerMap `xml:"QueryServer"`
}

type xmlQueryServerMap struct {
	URI  string `xml:"URI,attr"`
	Name string `xml:"Name,attr"`
}

type xmlConfig struct {
	AccountDB             xmlAccountDB             `xml:"AccountDB"`
	SessionDB             xmlSessionDB             `xml:"SessionDB"`
	LogConfig             xmlLogConfig             `xml:"LogConfig"`
	QueryServerListConfig xmlQueryServerListConfig `xml:"QueryServerList"`
}

type xmlSessionDB struct {
	RedisMap []xmlRedisInfo `xml:"RedisInfo"`
}

type xmlRedisInfo struct {
	Region        string `xml:"Region,attr"`
	Addr          string `xml:"Addr,attr"`
	ServerGroupID string `xml:"ServerGroupID,attr"`
	Password      string `xml:"Password,attr"` //추후 레디스 패스워드 세팅시 추가
}

type xmlLogConfig struct {
	LogMap []xmlLogMap `xml:"LogMap"`
}

type xmlAccountDB struct {
	Info xmlInfo
}
type xmlGameDB struct {
	Infos []xmlInfo `xml:"Info"`
}
type xmlInfo struct {
	ID       string `xml:"ID,attr"`
	Username string `xml:"Username,attr"`
	Password string `xml:"Password,attr"`
	Address  string `xml:"Address,attr"`
	Port     string `xml:"Port,attr"`
	DBname   string `xml:"DBname,attr"`

	ConnMaxLifetime int `xml:"ConnMaxLifetime,attr"`
	MaxIdleConns    int `xml:"MaxIdleConns,attr"`
	MaxOpenConns    int `xml:"MaxOpenConns,attr"`
}

type xmlLogMap struct {
	Key           string `xml:"Key,attr"`
	FileName      string `xml:"FileName,attr"`
	FileExtension string `xml:"FileExtension,attr"`
	MaxSize       int    `xml:"MaxSize,attr"`
	MaxBackup     int    `xml:"MaxBackup,attr"`
	MaxAge        int    `xml:"MaxAge,attr"`
	StdOut        string `xml:"StdOut,attr"`
	Debug         string `xml:"Debug,attr"`
	JSONFormat    string `xml:"JSONFormat,attr"`
}

type xmlAddress struct {
	Value string `xml:"Address,attr"`
}

type xmlServerConfig struct {
	OpenFieldMaxUser int `xml:"OpenFieldMaxUser,attr"`
}
type xmlAbsoluteRegion struct {
	Value string `xml:"Value,attr"`
}
