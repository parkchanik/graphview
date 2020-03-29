package structures

type ResultCharacterDetail struct {
	CharacterID string `db:"character_id" json:"character_id"`
	Target      string `db:"target" json:"target"`
	Multikey1   string `db:"multikey1" json:"multikey1"`
	Multikey2   string `db:"multikey2" json:"multikey2"`
	Infos       string `db:"infos" json:"infos"`
}
