package config

import (
	"encoding/xml"
	"fmt"
	"io"
	"os"
)

type Config struct {
	AccountDBCfg AccountDBConfig
	//SessionDBCfg   SessionDBConfig
	SessionDBCfg    map[string]SessionDBConfig
	GameDBCfg       []GameDBConfig
	LogMap          map[string]LogMapConfig
	QueryServerList map[string]QueryServerMapConfig
}

type QueryServerMapConfig struct {
	URI  string
	Name string
}

type LogMapConfig struct {
	Key           string
	FileName      string
	FileExtension string
	MaxSize       int
	MaxBackup     int
	MaxAge        int
	StdOut        string
	Debug         string
	JSONFormat    string
}

type AccountDBConfig struct {
	Username        string
	Password        string
	Address         string
	Port            string
	DBname          string
	ConnMaxLifetime int //Connection Pool 관련
	MaxIdleConns    int
	MaxOpenConns    int
}

type GameDBConfig struct {
	DBID            string `db:"DB_ID"`
	Address         string `db:"DB_Address"`
	Port            int    `db:"DB_Port"`
	DBname          string `db:"DB_Name"`
	Username        string `db:"UserName"`
	Password        string `db:"Pwd"`
	ConnMaxLifetime int    `db:"ConnMaxLifeTime"`
	MaxIdleConns    int    `db:"MaxIdleConns"`
	MaxOpenConns    int    `db:"MaxOpenConns"`
	EnableYN        string `db:"EnableYN"`
}

type SessionDBConfig struct {
	Region        string
	Addr          string
	ServerGroupID string
	Password      string
}

func LoadConfigFromFile() *Config {

	path, _ := os.Getwd()
	fmt.Println("now path = ", path)

	configFile, err := os.Open("./config/config.xml")
	if err != nil {
		panic(err)
	}
	defer configFile.Close()

	return loadConfig(configFile)
}

func loadConfig(r io.Reader) *Config {
	var xmlData xmlConfig
	err := xml.NewDecoder(r).Decode(&xmlData)
	if err != nil {
		panic(err)
	}

	return &Config{

		QueryServerList: loadQueryServerListConfig(xmlData.QueryServerListConfig),
		AccountDBCfg:    loadAccountDBConfig(xmlData.AccountDB),
		SessionDBCfg:    loadSessionDBConfig(xmlData.SessionDB),
		LogMap:          loadLogConfig(xmlData.LogConfig),
	}
}

func loadAccountDBConfig(xmlData xmlAccountDB) AccountDBConfig {

	// PassWord, err := passwordCipherLib.DecryptString(passwordCipherLib.Generalkey, xmlData.Info.Password)
	// if err != nil {
	// 	panic(err)
	// }

	return AccountDBConfig{
		Username: xmlData.Info.Username,
		Password: xmlData.Info.Password, //xmlData.Info.Password, // 추후 패스워드 decrypt 부분 처리
		Address:  xmlData.Info.Address,
		Port:     xmlData.Info.Port,
		DBname:   xmlData.Info.DBname,

		ConnMaxLifetime: xmlData.Info.ConnMaxLifetime,
		MaxIdleConns:    xmlData.Info.MaxIdleConns,
		MaxOpenConns:    xmlData.Info.MaxOpenConns,
	}

}

func loadLogConfig(xmlData xmlLogConfig) map[string]LogMapConfig {

	logconfig := make(map[string]LogMapConfig)

	for i := 0; i < len(xmlData.LogMap); i++ {

		logconfig[xmlData.LogMap[i].Key] = LogMapConfig{
			Key:           xmlData.LogMap[i].Key,
			FileName:      xmlData.LogMap[i].FileName,
			FileExtension: xmlData.LogMap[i].FileExtension,
			MaxSize:       xmlData.LogMap[i].MaxSize,
			MaxBackup:     xmlData.LogMap[i].MaxBackup,
			MaxAge:        xmlData.LogMap[i].MaxAge,
			StdOut:        xmlData.LogMap[i].StdOut,
			Debug:         xmlData.LogMap[i].Debug,
			JSONFormat:    xmlData.LogMap[i].JSONFormat,
		}

	}

	return logconfig

}

func loadQueryServerListConfig(xmlData xmlQueryServerListConfig) map[string]QueryServerMapConfig {

	logconfig := make(map[string]QueryServerMapConfig)

	for i := 0; i < len(xmlData.QueryServerList); i++ {

		logconfig[xmlData.QueryServerList[i].Name] = QueryServerMapConfig{
			URI:  xmlData.QueryServerList[i].URI,
			Name: xmlData.QueryServerList[i].Name,
		}

	}

	return logconfig

}

func loadSessionDBConfig(xmlData xmlSessionDB) map[string]SessionDBConfig {

	sessionconfig := make(map[string]SessionDBConfig)

	for i := 0; i < len(xmlData.RedisMap); i++ {

		sessionconfig[xmlData.RedisMap[i].Region] = SessionDBConfig{
			Addr:          xmlData.RedisMap[i].Addr,
			Password:      xmlData.RedisMap[i].Password,
			ServerGroupID: xmlData.RedisMap[i].ServerGroupID,
		}

	}

	return sessionconfig
}
