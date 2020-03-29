package logger

import (
	"database/sql/driver"
	"fmt"
	"io"
	"log"
	"math"
	"os"
	"reflect"
	"regexp"
	"runtime"
	"time"
	"unicode"

	"github.com/gin-gonic/gin"

	"github.com/sirupsen/logrus"

	//"jcm/logger/sentry"

	lumberjack "gopkg.in/natefinch/lumberjack.v2"
)

//var logging *logrus.Logger
//var ginlogging *logrus.Logger

var dblogging *logrus.Logger

func SqlLog(errmsg string, latency int, sqlstr string, parameters ...interface{}) {

	dblogging.WithFields(logrus.Fields{"sql": sqlstr, "parameters": parameters, "latency": latency}).Info(errmsg)
}

func DBLoggerInit(filename, fileextension string, maxsize, maxbackup, maxage int, stdout, debug, jsonformat string) {

	var path string

	if runtime.GOOS == "windows" {
		path = ".\\log\\"
		fmt.Println("runtime.GOOS =", runtime.GOOS)
	} else if runtime.GOOS == "linux" {
		path = "./log/"
		fmt.Println("runtime.GOOS =", runtime.GOOS)
	}
	//logrus.Logger
	logger := logrus.New()

	if jsonformat == "Y" {
		logger.SetFormatter(&logrus.JSONFormatter{})
	}

	f := path + filename + "." + fileextension

	lumberjackLogger := &lumberjack.Logger{
		Filename:   f,       // It defaults to os.TempDir() if empty.
		MaxSize:    maxsize, // megabytes
		MaxBackups: maxbackup,
		MaxAge:     maxage, //days
		LocalTime:  true,
	}

	if stdout == "Y" {
		mWriter := io.MultiWriter(os.Stderr, lumberjackLogger)
		logger.SetOutput(mWriter)
	} else {
		logger.SetOutput(lumberjackLogger)
	}

	if debug == "Y" {
		logger.SetLevel(logrus.DebugLevel)
	} else {
		logger.SetLevel(logrus.InfoLevel)
	}

	dblogging = logger

}

/*
func Init() {

	logging = logrus.New()
	ginlogging = logrus.New()

	//logentry = logrus.NewEntry(logging)
	//SetAddHook("http://f34a98a1a3744c2586fba51d9811be9f@10.125.11.71:9000/6")
	//SetLogrusConfig("", "")

	//logentry = logrus.NewEntry(logging)

	//logging.SetFormatter(&logrus.TextFormatter{})

	//raven.SetDSN("https://e2afdd3e659e4084893dbb8f41441208:251d30c348954ddeb5ee2abafae4bbe5@sentry.io/1372572")
	//dsn := "https://e2afdd3e659e4084893dbb8f41441208:251d30c348954ddeb5ee2abafae4bbe5@sentry.io/1372572"

}
*/

//var logmap map[string]*logrus.Logger

var panicLogger *log.Logger

func init() {
	panicLogger = log.New(os.Stderr, "[PanicLogger]", log.LstdFlags)
}

func LogPanic(r interface{}) {
	panicLogger.Println("--------------------------------------------------------------")
	now := time.Now()
	panicLogger.Printf("[%d/%d %d:%d:%d]\n", now.Month(), now.Day(), now.Hour(), now.Minute(), now.Second())
	panicLogger.Println(r)
	panicLogger.Println(string(StackBuffer()))
}

func StackBuffer() []byte {
	var buffer []byte
	bufferSize := 2048
	for {
		buffer = make([]byte, bufferSize)
		n := runtime.Stack(buffer, false)
		if n <= bufferSize {
			break
		}

		bufferSize *= 2
	}
	return buffer
}

type Logger struct {
	log *logrus.Logger
}

func LoggerInit(filename, fileextension string, maxsize, maxbackup, maxage int, stdout, debug, jsonformat string) *Logger {

	var path string

	if runtime.GOOS == "windows" {
		path = ".\\log\\"
		fmt.Println("runtime.GOOS =", runtime.GOOS)
	} else if runtime.GOOS == "linux" {
		path = "./log/"
		fmt.Println("runtime.GOOS =", runtime.GOOS)
	}
	//logrus.Logger
	logger := logrus.New()

	if jsonformat == "Y" {
		logger.SetFormatter(&logrus.JSONFormatter{})
	}

	f := path + filename + "." + fileextension

	lumberjackLogger := &lumberjack.Logger{
		Filename:   f,       // It defaults to os.TempDir() if empty.
		MaxSize:    maxsize, // megabytes
		MaxBackups: maxbackup,
		MaxAge:     maxage, //days
		LocalTime:  true,
	}

	if stdout == "Y" {
		mWriter := io.MultiWriter(os.Stderr, lumberjackLogger)
		logger.SetOutput(mWriter)
	} else {
		logger.SetOutput(lumberjackLogger)
	}

	if debug == "Y" {
		logger.SetLevel(logrus.DebugLevel)
	} else {
		logger.SetLevel(logrus.InfoLevel)
	}

	rtn := &Logger{
		logger,
	}

	return rtn

	/*
		if z.LogLevel == "debug" {
				logmap[z.Key].SetLevel(logrus.DebugLevel)
			} else {
				logmap[z.Key].SetLevel(logrus.InfoLevel)
			}

		}
	*/

}

func (l *Logger) GinLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		// other handler can change c.Path so:
		path := c.Request.URL.Path
		start := time.Now()
		c.Next()
		stop := time.Since(start)
		latency := int(math.Ceil(float64(stop.Nanoseconds()) / 1000000.0))
		statusCode := c.Writer.Status()
		clientIP := c.ClientIP()
		clientUserAgent := c.Request.UserAgent()
		referer := c.Request.Referer()
		hostname, err := os.Hostname()
		if err != nil {
			hostname = "unknow"
		}
		dataLength := c.Writer.Size()
		if dataLength < 0 {
			dataLength = 0
		}

		fields := logrus.Fields{
			//"logtype":    "ginlog",
			"hostname":   hostname,
			"statusCode": statusCode,
			"latency":    latency, // time to process
			"clientIP":   clientIP,
			"method":     c.Request.Method,
			"path":       path,
			"referer":    referer,
			"dataLength": dataLength,
			"userAgent":  clientUserAgent,
		}
		/*
			entry := logrus.NewEntry(logging).WithFields(logrus.Fields{
				"logtype":    "ginlog",
				"hostname":   hostname,
				"statusCode": statusCode,
				"latency":    latency, // time to process
				"clientIP":   clientIP,
				"method":     c.Request.Method,
				"path":       path,
				"referer":    referer,
				"dataLength": dataLength,
				"userAgent":  clientUserAgent,
			})
		*/
		if len(c.Errors) > 0 {
			l.log.Error(c.Errors.ByType(gin.ErrorTypePrivate).String())
		} else {
			msg := fmt.Sprintf("%s - %s [%s] \"%s %s\" %d %d \"%s\" \"%s\" (%dms)", clientIP, hostname, time.Now().Format("02/Jan/2006:15:04:05 -0700"), c.Request.Method, path, statusCode, dataLength, referer, clientUserAgent, latency)

			if statusCode > 499 {
				//entry.Error(msg)
				l.log.WithFields(fields).Error(msg)
			} else if statusCode > 399 {
				l.log.WithFields(fields).Warn(msg)
			} else {
				l.log.WithFields(fields).Info(msg)
				//entry.Info(msg)
			}
		}
	}
}

func (l *Logger) SqlLog(errmsg string, latency int, sqlstr string, parameters ...interface{}) {

	l.log.WithFields(logrus.Fields{"sql": sqlstr, "parameters": parameters, "latency": latency}).Info(errmsg)
}

func (l *Logger) Info(format string, args ...interface{}) {
	l.log.Info(fmt.Sprintf(format, args...))
}
func (l *Logger) Error(format string, args ...interface{}) {
	l.log.Error(fmt.Sprintf(format, args...))
}

func (l *Logger) Debug(format string, args ...interface{}) {
	l.log.Debug(fmt.Sprintf(format, args...))
}

type GormLogger struct{}

func (*GormLogger) Print(values ...interface{}) {
	var (
		//defaultLogger            = Logger{log.New(os.Stdout, "\r\n", 0)}
		sqlRegexp                = regexp.MustCompile(`\?`)
		numericPlaceHolderRegexp = regexp.MustCompile(`\$\d+`)
	)

	if len(values) > 1 {
		var (
			sql             string
			formattedValues []string
			level           = values[0]
			//currentTime     = "\n\033[33m[" + NowFunc().Format("2006-01-02 15:04:05") + "]\033[0m"
			//currentTime = time.Now().Format("2006-01-02 15:04:05")
			//source = fmt.Sprintf("\033[35m(%v)\033[0m", values[1])
			source = values[1]
		)

		if level == "sql" {
			// duration
			latency := fmt.Sprintf("%.2fms ", float64(values[2].(time.Duration).Nanoseconds()/1e4)/100.0)

			for _, value := range values[4].([]interface{}) {
				indirectValue := reflect.Indirect(reflect.ValueOf(value))
				if indirectValue.IsValid() {
					value = indirectValue.Interface()
					if t, ok := value.(time.Time); ok {
						formattedValues = append(formattedValues, fmt.Sprintf("'%v'", t.Format("2006-01-02 15:04:05")))
					} else if b, ok := value.([]byte); ok {
						if str := string(b); isPrintable(str) {
							formattedValues = append(formattedValues, fmt.Sprintf("'%v'", str))
						} else {
							formattedValues = append(formattedValues, "'<binary>'")
						}
					} else if r, ok := value.(driver.Valuer); ok {
						if value, err := r.Value(); err == nil && value != nil {
							formattedValues = append(formattedValues, fmt.Sprintf("'%v'", value))
						} else {
							formattedValues = append(formattedValues, "NULL")
						}
					} else {
						switch value.(type) {
						case int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64, float32, float64, bool:
							formattedValues = append(formattedValues, fmt.Sprintf("%v", value))
						default:
							formattedValues = append(formattedValues, fmt.Sprintf("'%v'", value))
						}
					}
				} else {
					formattedValues = append(formattedValues, "NULL")
				}

				//fmt.Println(" formattedValues : ", formattedValues)
			}

			// differentiate between $n placeholders or else treat like ?
			if numericPlaceHolderRegexp.MatchString(values[3].(string)) {
				sql = values[3].(string)
				for index, value := range formattedValues {
					placeholder := fmt.Sprintf(`\$%d([^\d]|$)`, index+1)

					//fmt.Println(" placeholder : ", placeholder)

					sql = regexp.MustCompile(placeholder).ReplaceAllString(sql, value+"$1")
				}
			} else {
				formattedValuesLength := len(formattedValues)
				for index, value := range sqlRegexp.Split(values[3].(string), -1) {
					sql += value
					if index < formattedValuesLength {
						sql += formattedValues[index]
					}

					//fmt.Println(" value : ", value)
					//fmt.Println(" sql : ", sql)
				}
			}

			fields := logrus.Fields{
				"type":     level,
				"position": source,
				"latency":  latency,
				"query":    sql,
			}

			msg := ""

			dblogging.WithFields(fields).Info(msg)
		} else {

			fields := logrus.Fields{
				"type":     level,
				"position": source,
			}

			//msg := ""

			dblogging.WithFields(fields).Error(values[2:]...)
		}

	}

	//dblogging.WithFields(fields).Info("msgggggggg")

	//fmt.Println("GormLogger logger.go - values[0] - ", values[0])
	//fmt.Println("GormLogger logger.go - values[1] - ", values[1])
	//fmt.Println("GormLogger logger.go - values[2] - ", values[2])
	//fmt.Println("GormLogger logger.go - values[3] - ", values[3])
	//fmt.Println("GormLogger logger.go - values[4] - ", values[4])
	//fmt.Println("GormLogger logger.go - values[5] - ", values[5])

}
func isPrintable(s string) bool {
	for _, r := range s {
		if !unicode.IsPrint(r) {
			return false
		}
	}
	return true
}
