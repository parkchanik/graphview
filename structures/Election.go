package structures

type Election struct {
	PARTY    *string  `gorm:"type:VARCHAR(100);column:PARTY;PRIMARY_KEY"`
	PARENT   *string  `gorm:"type:VARCHAR(100);column:PARENT;"`
	PARTYNUM *int     `gorm:"type:int;column:PARTYNUM;"`
	Cnt      *int     `gorm:"type:int;column:cnt"`
	Num1cnt  *int     `gorm:"type:int;column:num1cnt"`
	PERCENT  *float64 `gorm:"type:float;column:PERCENT"`
	Color    *string  `gorm:"type:VARCHAR(100);column:color"`
}

func (Election) TableName() string {
	return "ELECTION"
}

type ResultEelection struct {
	ElectionList []Election `json:"electionlist"`
	//SecondInfo    SecondInfo        `json:"secondinfo"`
}

type ResultAllEelection struct {
	ElectionList []*AllElection `json:"electionlist"`
	//SecondInfo    SecondInfo        `json:"secondinfo"`
}

type AllElection struct {
	PARTY           string
	PARENT          string
	PARTYNUM        int
	Cnt             int
	Num1cnt         int
	Color           string
	BiryePercent    float64 // 비례 득표율
	Haldangjungdang bool    // 의석 할당정당 여부 true 의석할당정당
	Jungdangpercent float64 // 정당 득표율
	//Huansanuisukpercent float64 // 환산의석
	Yundong30suk        float64 // 연동형 30 석 소수점까지
	Yundong30sukbanolim int     // 연동형 30석 반올림 해서 정수로
	Janyubaevalue       float64 // 잔여의석 배분: 연동형  캡 30석- ⑧환산토탈  × 정당득표율
	Janyubae1           int     // 잔여 의석 배분 1
	Janyubae2           int     // 잔여 의석 배분 2
	//Huansanuisuk        int     // 환산의석
	Choguavalue   float64 // 초과조정분
	Chogua1       int     // 초과2
	Chogua2       int     //초과2
	Jbirye        int     //준연동형 비례ⓑ 초과일 경우 Chogua1 + Chogua2 , 아닐경우  Yundong30sukbanolim + Janyubae1 + Janyubae2
	Bbiryevalue   float64 // 병립형 비례 퍼센트
	Bbirye1       int     //병립형 비례1 병립형value 의 정수 부분
	Bbirye2       int     //병립형 비례1로 해서 17석이 안될경우 소수점 큰 순으로
	Chairmancount int     //의석수ⓐ+ⓑ+ⓒ
	Chairmanper   string  //의석 비율(%)

}

type BiryeElection struct {
	PARTY string
	Cnt   int
}
