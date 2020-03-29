package structures

import (
	"encoding/xml"
)

type DataBody struct {
	//Response Response `xml:"response"`
	XMLName  xml.Name `xml:"response"`
	Response string   `xml:"response"`
}

type Response struct {
	XMLName xml.Name `xml:"response"`
	Header  Header   `xml:"header"`
	Body    Body     `xml:"body"`
}
type Header struct {
	XMLName    xml.Name `xml:"header"`
	ResultCode string   `xml:"resultCode"`
	ResultMsg  string   `xml:"resultMsg"`
}

type Body struct {
	XMLName xml.Name `xml:"body"`
	Items   Items    `xml:"items"`
}

type Items struct {
	XMLName xml.Name `xml:"items"`
	Item    []Item   `xml:"item"`
}

type Item struct {
	XMLName   xml.Name `xml:"item"`
	DataTime  string   `xml:"dataTime"`
	CityName  string   `xml:"cityName"`
	So2Value  string   `xml:"so2Value"`
	CoValue   string   `xml:"coValue"`
	O3Value   string   `xml:"o3Value"`
	No2Value  string   `xml:"no2Value"`
	Pm10Value string   `xml:"pm10Value"`
	Pm25Value string   `xml:"pm25Value"`
}
