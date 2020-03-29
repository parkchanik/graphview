package main

import (
	"flag"
	"fmt"
	"optool/app"
	"runtime"
	"strconv"
)

func main() {

	runtime.GOMAXPROCS(runtime.NumCPU())

	fmt.Println(runtime.GOMAXPROCS(0))

	port := flag.Int("port", 9888, "Server Port")
	flag.Parse()

	strport := ":" + strconv.Itoa(*port)

	//config := config.LoadConfigFromFile()

	app := &app.App{}
	//app.Initialize(config)
	app.Initialize()

	app.Run(strport)

}

/*

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./frontend/build", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	api.GET("/fetchdata", FetchData)
	// Start and run the server
	router.Run(":5000")
}

type testdata struct {
	DateFormatted string `json:"dateFormatted"`
	TemperatureC  int    `json:"temperatureC"`
	Summary       string `json:"summary"`
	TemperatureF  int    `json:"temperatureF"`
}

func FetchData(c *gin.Context) {

	//temp1 := testdata{"2019-11-01", 49, "Freezing", 120}
	temp1 := testdata{}
	temp1.DateFormatted = "2019-11-01"
	temp1.TemperatureC = 49
	temp1.Summary = "Freezing"
	temp1.TemperatureF = 120
	temp2 := testdata{"2019-11-02", 19, "Freezing1", 130}
	temp3 := testdata{"2019-11-03", 29, "Freezing2", 130}

	temparray := make([]testdata, 0, 1)

	temparray = append(temparray, temp1)
	temparray = append(temparray, temp2)
	temparray = append(temparray, temp3)

	fmt.Println("temparray", temparray)

	jsonarray, err := json.Marshal(temparray)
	if err != nil {
		fmt.Println("json marshal err ", err.Error())

	}
	fmt.Println("temparray after", temparray)
	fmt.Println("jsonarray", string(jsonarray))
	c.JSON(http.StatusOK, temparray)

}
*/
