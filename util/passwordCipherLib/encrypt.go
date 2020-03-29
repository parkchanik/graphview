package passwordCipherLib

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"io"
)

func Encrypt(key, buff []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	ciphertext := make([]byte, aes.BlockSize+len(buff))
	iv := ciphertext[:aes.BlockSize]
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return nil, err
	}

	cfb := cipher.NewCFBEncrypter(block, iv)
	cfb.XORKeyStream(ciphertext[aes.BlockSize:], buff)
	return ciphertext, nil
}

func EncryptString(key []byte, s string) (string, error) {
	result, err := Encrypt(key, []byte(s))
	if err != nil {
		return "", err
	}

	return hex.EncodeToString(result), nil
}
