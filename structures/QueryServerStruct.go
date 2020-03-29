package structures

import "time"

type StatusList struct {
	List []StatusWorkers `json:"list"`
}

type StatusWorkers struct {
	Acid         uint
	Lastseq      int
	Curseq       int
	WorkList     []StatusWork
	StartTime    time.Time
	Lastexectime time.Time
}

type StatusWork struct {
	Acid          uint
	ServerGroupID string
	Seq           int
	DBID          string
	WorkType      string
	WorkTarget    string
}
