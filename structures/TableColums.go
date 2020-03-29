package structures

type TableColumnsInfo struct {
	TableName     string `db:"TABLE_NAME"`
	ColumnName    string `db:"COLUMN_NAME"`
	ColumnType    string `db:"DATA_TYPE"` //`db:"COLUMN_TYPE"`
	ColumnComment string `db:"COLUMN_COMMENT"`
	ColumnKey     string `db:"COLUMN_KEY"`
}

type TableInfo struct {
	TableName  string
	ColumnInfo []ColumnInfo
}

type ColumnInfo struct {
	ColumnName    string
	ColumnType    string
	ColumnComment string
	ColumnKey     string
}
