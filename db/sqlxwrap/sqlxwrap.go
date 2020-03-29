package sqlxwrap

import (

	//	. "jcm/errorcode"

	"database/sql"
	"fmt"
	"math"
	"optool/logger"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type SqlxWrap struct {
	sqldb    *sqlx.DB
	dblogger *logger.Logger
}

func Connect(dbURI string, ConnMaxLifetime, MaxIdleConns, MaxOpenConns int, Address string, DBName string, FileName, FileExtension string, MaxSize, MaxBackup, MaxAge int, StdOut, Debug, JSONFormat string) (*SqlxWrap, error) {

	db, err := sqlx.Connect("mysql", dbURI)

	if err != nil {
		//logger.Error("ConnectError , dbURI = %s , %s", dbURI, err.Error())
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		//	logger.Error("PingError dbURI = %s , %s", dbURI, err.Error())
		return nil, err
	}

	db.SetConnMaxLifetime(time.Duration(int(time.Second) * ConnMaxLifetime))
	db.SetMaxIdleConns(MaxIdleConns) //connection pool 관련
	//오랜 시간 유휴 상태로 남은 연결은 Azure Mysql 등에서 문제가 될 수 있다.
	//유휴 시간이 오래되면 서버측에서 연결을 끊어버리기 때문으로 이 경우에는 db.SetMaxIdleConns(0)을 설정하면 된다.
	db.SetMaxOpenConns(MaxOpenConns)

	logfile := FileName + "_" + DBName + "_" + Address
	logger := logger.LoggerInit(logfile, FileExtension, MaxSize, MaxBackup, MaxAge, StdOut, Debug, JSONFormat)

	fmt.Printf("Connect DB : Open dbURI = %s , SetConnMaxLifetime = %d , MaxIdleConns = %d , MaxOpenConns = %d\n", dbURI, int(time.Second)*ConnMaxLifetime, MaxIdleConns, MaxOpenConns)

	sqlxwrap := &SqlxWrap{
		db,
		logger,
	}

	return sqlxwrap, err
}

func (db *SqlxWrap) Select(dest interface{}, query string, args ...interface{}) error {

	//	logger.DBInfo("info", query, args)
	var errmsg string

	start := time.Now()
	err := db.sqldb.Select(dest, query, args...)
	if err != nil {
		errmsg = err.Error()
	}
	stop := time.Since(start)

	latency := int(math.Ceil(float64(stop.Nanoseconds()) / 1000000.0))

	logger.SqlLog(errmsg, latency, query, args)
	//db.dblogger.SqlLog(errmsg, latency, query, args)

	return err

}

func (db *SqlxWrap) Get(dest interface{}, query string, args ...interface{}) error {

	var errmsg string

	start := time.Now()
	err := db.sqldb.Get(dest, query, args...)
	if err != nil {
		errmsg = err.Error()
	}
	stop := time.Since(start)

	latency := int(math.Ceil(float64(stop.Nanoseconds()) / 1000000.0))
	logger.SqlLog(errmsg, latency, query, args)
	//db.dblogger.SqlLog(errmsg, latency, query, args)

	return err

}

func (db *SqlxWrap) MustBegin() *sqlx.Tx {
	//db.dblogger.Info("begin transaction") //	logger.DBInfo("info", "begin transaction")

	return db.sqldb.MustBegin()

}

func (db *SqlxWrap) Rollback(tx *sqlx.Tx) {
	if tx != nil {

		err := tx.Rollback()
		if err != nil {
			fmt.Println("rollback error ", err.Error())
		} else {
			//	db.dblogger.Info("rollback")
		}
	}
}

func (db *SqlxWrap) Commit(tx *sqlx.Tx) {
	if tx != nil {
		//db.dblogger.Info("commit")
		tx.Commit()
	}
}

func (db *SqlxWrap) ExecInTran(tx *sqlx.Tx, query string, args ...interface{}) (sql.Result, error) {

	var rst sql.Result
	var err error
	var errmsg string

	start := time.Now()

	if tx == nil {
		rst, err = db.sqldb.Exec(query, args...)
	} else {
		rst, err = tx.Exec(query, args...)
	}

	if err != nil {
		errmsg = err.Error()
	}

	stop := time.Since(start)

	latency := int(math.Ceil(float64(stop.Nanoseconds()) / 1000000.0))
	logger.SqlLog(errmsg, latency, query, args)
	//db.dblogger.SqlLog(errmsg, latency, query, args)

	return rst, err

}

func (db *SqlxWrap) NameExecInTran(tx *sqlx.Tx, query string, args interface{}) (sql.Result, error) {

	var rst sql.Result
	var err error
	var errmsg string

	start := time.Now()

	if tx == nil {
		rst, err = db.sqldb.NamedExec(query, args)
	} else {
		rst, err = tx.NamedExec(query, args)
	}

	if err != nil {
		errmsg = err.Error()
	}

	stop := time.Since(start)

	latency := int(math.Ceil(float64(stop.Nanoseconds()) / 1000000.0))
	logger.SqlLog(errmsg, latency, query, args)
	//db.dblogger.SqlLog(errmsg, latency, query, args)

	return rst, err

}

func (db *SqlxWrap) Queryx(query string, args ...interface{}) (*sqlx.Rows, error) {

	/*
		defer func() {
			if r := recover(); r != nil {
				fmt.Println("Queryx panic call recover : ", r)
			}
		}()
	*/
	var errmsg string

	start := time.Now()

	rows, err := db.sqldb.Queryx(query, args...)
	if err != nil {
		errmsg = err.Error()
	}

	stop := time.Since(start)

	latency := int(math.Ceil(float64(stop.Nanoseconds()) / 1000000.0))
	logger.SqlLog(errmsg, latency, query, args)
	//db.dblogger.SqlLog(errmsg, latency, query, args)

	return rows, err

}
