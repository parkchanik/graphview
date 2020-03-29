package structures

type BaseData struct {
	Name  string `json:"name"`
	Type  string `json:"type"`
	Value int    `json:"value"`
	Date  string `json:"date"`
}

type ContentData struct {
	Category string `json:"category"`
	Subject  string `json:"subject"`
	EndDate  string `json:"endate"`
	Agree    int    `json:"agree"`
}
