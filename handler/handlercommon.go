package handler

import "fmt"

func PercentageChangeString(totalcnt, valuecnt int) string {
	totalfl := float64(totalcnt)
	valuefl := float64(valuecnt)

	returndata := (valuefl / totalfl) * 100

	returnstr := fmt.Sprintf("%.1f", returndata)

	return returnstr

}
