package handler

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
	"optool/structures"
)

func (handler *Handler) GetMise() error {

	url := "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst?serviceKey=obv4xWHTognbuGrTuYlp2h1fnS27G%2BoQYnXeKgHYP6RTZPZCur7lazL58BJxKNkbMxXZOKnM1S8EeKXye3CHAQ%3D%3D&numOfRows=50&pageNo=1&sidoName=경기&searchCondition=HOUR"

	/*
		시도 이름(서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종)
	*/

	res, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
		//return "",err
	}

	defer res.Body.Close()

	// Response 체크.
	respBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)

	}
	resultinfo := structures.Response{}

	err = xml.Unmarshal(respBody, &resultinfo)
	if err != nil {
		fmt.Println("respBody unmarshal error : ", err.Error())
	}

	str := string(respBody)
	fmt.Println("str", str)
	//fmt.Println("result 111: ", resultinfo)
	for _, v := range resultinfo.Body.Items.Item {
		fmt.Println("DataTime : ", v.DataTime)
		fmt.Println("CityName : ", v.CityName)
		fmt.Println("Pm25Value : ", v.Pm25Value)

	}

	cnt := len(resultinfo.Body.Items.Item)
	fmt.Println("cnt : ", cnt)
	//fmt.Println("result : "  , resultinfo.Response.Body.Items)
	//println(resultinfo)
	return nil
}
