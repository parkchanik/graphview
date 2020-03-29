package passwordCipherLib

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/hex"
)

func Decrypt(key, buff []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}
	if len(buff) < aes.BlockSize {
		return nil, err //errs.New("ciphertext too short")
	}
	iv := buff[:aes.BlockSize]
	buff = buff[aes.BlockSize:]
	cfb := cipher.NewCFBDecrypter(block, iv)
	cfb.XORKeyStream(buff, buff)

	return buff, nil
}

func DecryptString(key []byte, s string) (string, error) {
	buf, err := hex.DecodeString(s)
	if err != nil {
		return "", err
	}

	result, err := Decrypt(key, buf)
	if err != nil {
		return "", err
	}

	return string(result), nil
}
