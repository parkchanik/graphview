package passwordCipherLib

/*

import (
	. "github.com/smartystreets/goconvey/convey"
	"ss/commonlib/logger"
	"testing"
)

func TestPasswordCihper(t *testing.T) {
	logger.SetTestLogWriter(t)

	Convey("주어진 버퍼를 암호화 한다", t, func() {
		txt := "동해물과 백두산이 마르고 닳도록"
		key := make([]byte, 32)
		for i := 0; i < 32; i++ {
			key[i] = byte(i)
		}

		original := []byte(txt)
		enc, err := Encrypt(key, original)
		So(err, ShouldBeNil)

		Convey("암호화한 데이터를 복호화해서 원본과 비교한다", func() {
			dec, err := Decrypt(key, enc)
			So(err, ShouldBeNil)
			So(dec, ShouldResemble, original)
		})
	})

	Convey("주어진 문자열을 암호화 한다", t, func() {
		txt := "동해물과 백두산이 마르고 닳도록"
		key := make([]byte, 32)
		for i := 0; i < 32; i++ {
			key[i] = byte(i)
		}

		enc, err := EncryptString(key, txt)
		So(err, ShouldBeNil)

		Convey("암호화한 데이터를 복호화해서 원본과 비교한다", func() {
			dec, err := DecryptString(key, enc)
			So(err, ShouldBeNil)
			So(dec, ShouldEqual, txt)
		})
	})

	Convey("GeneralKey로 암호화한 스트링을 복호화한다", t, func() {
		txt := "70E3FB5512CEF815362CC0D65F46F8F7B150BB84239C7D9B15EB"
		dec, err := DecryptString(Generalkey, txt)
		So(err, ShouldBeNil)
		So(dec, ShouldEqual, "1234567890")
	})
}
*/
