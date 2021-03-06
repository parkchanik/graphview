import React, { Component } from "react";
import * as d3 from "d3";
//import geojson from "./geojson.json";
//import geojson from "./TL_SCCO_CTPRVN.json";
//import geojson from "./TL_SCCO_SIG.json";

//import { geoMercator, geoPath } from "d3-geo";
//import { select } from "d3-selection";
import "./bargraphhistory.css";
import { getCoronaFirst } from "../services/getdata";
import { getCoronaSecond } from "../services/getdata";
import { getCoronaThird } from "../services/getdata";
import { getCoronaMain } from "../services/getdata";
import { getCoronaMainSub } from "../services/getdata";
import { getCoronaWorldNewDailyList } from "../services/getdata";
import { getCoronaWorldNewDailyListByContinent } from "../services/getdata";
import { getCoronaWorldNewDailyListSummary } from "../services/getdata";

import { getCoronaWorldroylab } from "../services/getdata";

//import csvdata from "./readmelocal.csv";
//import ryukimyangcsv from "./ryukimyang.csv";
import ryukimyangcsv from "./data/LIMSEVEN.csv";
//import typelist from "./data/KINGLIST.csv";
export class CoronaWorldList extends Component {
  constructor(props) {
    // const { calldata } = this.props;
    super(props);
    this.state = {
      data: [{ server: "AWS-DEV", date: "2019-01", value: 80 }],
      //currentdata: [{ server: "AWS-DEV", date: "2019-01", value: 80 }],
      currentdata: [],
      // windata: [],
      //ipdata: [],
      //yAxisAttribute: "skill",
      //xAxisAttribute: "value",
      //currentdate: new Date("2019-01"),
      yAxisAttribute: "server",
      xAxisAttribute: "value",

      yAxisAttributeMAIN: "NAME",
      xAxisAttributeWin: "W",
      xAxisAttributeIP: "IP",

      width: 2000,
      height: 1100
    };
    this.chartRef = React.createRef();
    this.drawChart = this.drawChart.bind(this);

    this.yAxisNAME = "name";
    this.xAxisWIN = "W";
    this.xAxisIP = "IP";

    this.margin = { top: 120, right: 30, bottom: 40, left: 90 };

    this.xfirst = null;
    //.domain([0, 70000]); // this.state.width]);

    this.xfirst2 = d3
      .scaleLinear()
      .range([0, 650])
      .domain([0, 100]); // this.state.width]);

    this.yfirst = null;

    this.yfirst2 = d3
      .scaleBand()
      .range([600, 1000])
      .padding(0.1); // this.state.height]);

    this.xsecond = null;
    this.ysecond = null;

    this.xthird = null;
    this.ythird = null;

    this.xfourth = null;
    this.yfourth = null;

    this.xfifth = null;
    this.yfifth = null;

    this.xsixth = null;
    this.ysixth = null;

    // this.graphXpos1 = 0;
    // this.graphXpos2 = 700;
    // this.graphXpos3 = 1400;

    // this.graphYpos1 = 600;

    // this.graphXyposLine1 = 1000;
    // this.graphXyposLine2 = 900;
    //let graph1Xpos = 0;
    // let graph2Xpos = 700;

    this.graphpositionzero = 0;

    this.currentdate = new Date("2019-01");

    this.currentnum = 2013;

    this.alldata = [];
    this.typedata = [];

    this.title1 = null;
    this.title2 = null;
    this.title3 = null;
    this.title4 = null;
    this.month = null;

    this.firstmonth = null;
    this.secondmonth = null;
    this.thirdmonth = null;
    this.fourthmonth = null;

    this.firsttest1 = null;
    this.firsttest2 = null;
    this.firsttest3 = null;
    this.firsttest4 = null;

    this.secondtest1 = null;
    this.secondtest2 = null;
    this.secondtest3 = null;
    this.secondtest4 = null;
    this.secondtest5 = null;
    this.secondtest6 = null;

    this.countdown = 25;
    this.nowpage = 1;
    this.countdownview = null;

    this.maintext1 = null;
    this.maintext2 = null;
    this.maintext3 = null;
    this.maintext4 = null;
    this.maintext5 = null;
    this.maintext6 = null;

    this.mainsubtext1 = null;

    this.fourthtext1 = null;
    this.fourthtext2 = null;

    this.fifthtext1 = null;
    this.fifthtext2 = null;

    this.submainrotation = 0;

    this.rotate = 0;

    this.langtype = 1;
    // this.thirdtext1 = null;
    // this.thirdtext2 = null;
    // this.thirdtext3 = null;
    // this.thirdtext4 = null;
    // this.thirdtext5 = null;
    // this.thirdtext6 = null;
  }

  drawChart() {
    //const data = this.props.data;
    const data = this.state.data;

    //if (data.length == 0) return;
    console.log("drawChart", data);
    // let margin = { top: 20, right: 30, bottom: 40, left: 90 },
    let width = this.state.width - this.margin.left - this.margin.right;
    let height = this.state.height - this.margin.top - this.margin.bottom;

    //let svg = d3.select(".maing");

    let svgTitle = d3.select(".mainTitle");
    let svgSub = d3.select(".mainSub");

    // Add X axis

    this.mainsubtext1 = svgTitle
      .append("text")
      .text("COVID-19 WORLD COUNT")
      .attr("x", 30)
      .attr("y", 60)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "start")
      .attr("font-size", "80px");

    this.mainsubtext2 = svgTitle
      .append("text")
      // .text("CORONAVIRUS PANDEMIC")
      .attr("x", 130)
      .attr("y", 20)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "start")
      .attr("font-size", "30px");

    this.mainsubtext3 = svgTitle
      .append("text")
      //.text("확진자")
      .attr("x", 460)
      .attr("y", 20)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "30px");

    this.mainsubtext4 = svgSub
      .append("text")
      //.text("사망자")
      .attr("x", 600)
      .attr("y", 20)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "30px");

    //////////////////////////////////////////////MainSub////////////////////////////////////////////////////
  }
  componentDidMount() {
    this.drawChart();

    this.getMainList("MainSub");

    this.mainSubInterval = setInterval(() => {
      this.getMainList("MainSub");
    }, 5000);

    // this.mainSubInter2 = setInterval(() => {
    //   this.MoveGroup();
    // }, 10000);

    this.myInterval = setInterval(() => {
      this.countdown = this.countdown - 1;

      var countstr = "" + this.countdown;

      // this.countdownview.text(countstr);

      // if (this.countdown == 0) {
      //   this.countdown = 10;
      //   this.getInfo("Second");
      // }

      this.countdown = 25;
    }, 1000);

    //let timter = setInterval(() => {
    //  this.getQueryServerInfo();
    // this.SetData();
    //}, 2000);
    //this.SetData();
    // this.dataFromTSV();
    // setTimeout(
    //   function() {
    //     this.SetData();
    //   }.bind(this),
    //   2000
    // );
  }

  testgo() {
    console.log("testgo 111111------");
    this.getMainInfo();
  }
  componentWillMount() {
    //this.dataFromTSV();
  }

  async MoveGroup() {
    d3.select(".List")
      .transition()
      .duration(5000)
      .attr("transform", "translate(-250,50)")
      .transition()
      .duration(3000)
      .attr("transform", "translate(10,50)");
  }

  async getMainList(num) {
    const { coronadata } = await getCoronaWorldroylab();

    this.SetMainDataList(coronadata);
  }

  async getInfo(num) {
    try {
      console.log("getInfo num ", num);

      //let svgmove = d3.select(".mainFirst");
      d3.select(".mainFirst")
        .transition()
        //  .duration(500)
        .attr("transform", "translate(600,2600)");

      d3.select(".mainSecond")
        .transition()
        //  .duration(500)
        .attr("transform", "translate(600,2600)");

      d3.select(".mainThird")
        .transition()
        //.duration(500)
        .attr("transform", "translate(600,2600)");
      d3.select(".mainFourth")
        .transition()
        // .duration(500)
        .attr("transform", "translate(600,2600)");
      d3.select(".mainFifth")
        .transition()
        // .duration(500)
        .attr("transform", "translate(600,2600)");
    } catch (error) {
      console.log("error", error);
    }
  }

  dataFromTSV(path) {
    path = path || "data.tsv";
    console.log(path);

    d3.csv(ryukimyangcsv).then(data => {
      console.log("dataFromTSV data", data);
      this.alldata = data;

      this.SetData();
    });
  }

  SetCountryInfo(svgname, data, confirmed, deaths, recovered) {
    let svg = d3.select("." + svgname);

    console.log("SetCountryInfo : ", svgname);
    console.log("SetCountryInfo Data : ", data);

    var format = ",.0f";

    console.log("confirmed", confirmed);

    var totalvaluedata = svg.select(".totalvalue").data(svgname);

    totalvaluedata
      .enter()
      .insert("text")
      .attr("class", "totalvalue")
      .attr("x", 100)
      .attr("y", 30)
      .attr("font-size", "25px")
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 1)
      .attr("font-family", "BMDOHYEON")

      .text("토탈 " + confirmed + "  " + deaths + " " + recovered);

    let bardata2 = svg.selectAll(".barCountry").data(data, function(d) {
      return d.Country;
    });

    var barEnterdata2 = bardata2
      .enter()
      .insert("g", ".axisGCountry")
      .attr("class", "barCountry")
      // .attr("fill", "none")
      // .attr("stroke", "blue")
      // .attr("stroke-width", "1.5px")
      .attr("transform", function(d, i) {
        console.log("-----------------------axisSubMain : ", i);
        var y = 100 + (i % 16) * 60;
        var x = Math.floor(i / 16) * 235;
        // console.log("var x", i, Math.floor(i / 30));
        // if (svgname == "Europe") {
        //   if (i >= 15) {
        //     var z = 100 + (i - 15) * 30;
        //     return "translate(" + "450" + "," + z + ")";
        //   }
        //   return "translate(" + "-20" + "," + y + ")";
        // }
        return "translate(" + x + "," + y + ")";
      });
    barEnterdata2
      .append("rect")
      .attr("x", 0)
      .attr("class", "rect")
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 235)
      .attr("height", 60) //y.bandwidth() - 30)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", "0.5px")
      .attr("y", -45);

    barEnterdata2
      .append("image")
      .attr("x", 7)
      .attr("y", -45)
      .attr("height", "35")
      .attr("width", "35")
      .attr("href", function(d) {
        if (d.Name1 == "중국") {
          return "./PNG/china.png";
        } else {
          return "./PNG/" + d.Country + ".png";
        }
      })
      .attr("class", "imgfrom")
      .attr("id", function(d) {
        return d.Countrycode;
      })
      .attr("text-anchor", "start");

    barEnterdata2
      .append("text")
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .transition()
      .duration(1500)
      .text(function(d) {
        if (d.Country == "Country") {
          let str = d.Name1;
          let str_array = str.split(",");

          return str_array[0];
        }

        return d.Name1;
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "23px")
      .attr("class", "valueSubMain")
      .attr("text-anchor", "start")
      .attr("x", 50)
      .attr("y", -20);

    var deformat = function(val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };

    var format = ",.0f";
    barEnterdata2
      .append("text")
      .transition()
      .duration(1500)
      .style("fill", d => this.getColor(d))
      .attr("font-family", "Righteous")
      .textTween(function(d) {
        //var nowdata = d.Confirmed + "/" + d.Deaths + "/" + d.Recovered;
        // var i = d3.interpolateString("0/0/0", nowdata);
        var nowdata = d.Confirmed;
        var i = d3.interpolateRound(0, nowdata);

        //console.log("iiii", i);
        return function(t) {
          return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "21px")
      .attr("class", "valueSubMainc")
      .attr("text-anchor", "end")
      .attr("x", 80)
      .attr("y", 7);

    barEnterdata2
      .append("text")
      .transition()
      .duration(1500)
      .style("fill", d => this.getColor(d))
      .attr("font-family", "Righteous")
      .textTween(function(d) {
        //var nowdata = d.Confirmed + "/" + d.Deaths + "/" + d.Recovered;
        // var i = d3.interpolateString("0/0/0", nowdata);
        var nowdata = d.Deaths;
        var i = d3.interpolateRound(0, nowdata);

        //console.log("iiii", i);
        return function(t) {
          return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "21px")
      .attr("class", "valueSubMaind")
      .attr("text-anchor", "end")
      .attr("x", 155)
      .attr("y", 7);

    barEnterdata2
      .append("text")
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      // .attr("font-family", "BMDOHYEON")
      .transition()
      .duration(1500)
      .textTween(function(d) {
        var nowdata = d.Recovered;
        var i = d3.interpolateRound(0, nowdata);

        //console.log("iiii", i);
        return function(t) {
          return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "20px")
      .attr("class", "valueSubMainr")
      .attr("text-anchor", "end")
      .attr("x", 230)
      .attr("y", 7);

    let barupdate = bardata2
      .transition("2")
      //.duration(1000)
      .ease(d3.easeLinear);

    var barupdatedata2 = barupdate
      .select(".barCountry")
      .attr("transform", function(d, i) {
        var y = 100 + (i % 16) * 60;
        var x = Math.floor(i / 16) * 235;
        return "translate(" + x + "," + y + ")";
      });

    var textupdate = barupdate
      .select(".valueSubMain")
      // .attr("y", 60)
      //.text("")
      .transition()
      .duration(100);
    // .attr("lang", "zh")

    if (this.langtype == 1) {
      textupdate.attr("font-family", "BMDOHYEON").text(function(d) {
        if (d.Country == "Country") {
          let str = d.Name1;
          let str_array = str.split(",");

          return str_array[0];
        }

        var text = d.Name1;
        var len = text.length;
        if (len > 10) {
          return text.substring(0, 10) + "...";
        }
        return d.Name1; //  한국어
      });
    }

    if (this.langtype == 2) {
      textupdate.attr("font-family", "Fjalla One").text(function(d) {
        if (d.Country == "Country") {
          let str = d.Name2;
          let str_array = str.split(",");

          return str_array[0];
        }
        var text = d.Name2;
        var len = text.length;
        if (len > 10) {
          return text.substring(0, 10) + "...";
        }
        return d.Name2; //스페인어
      });
    }
    if (this.langtype == 3) {
      textupdate.attr("font-family", "Noto Sans SC").text(function(d) {
        if (d.Country == "Country") {
          let str = d.Name3;
          let str_array = str.split(",");

          return str_array[0];
        }
        var text = d.Name3;
        var len = text.length;
        if (len > 10) {
          return text.substring(0, 10) + "...";
        }
        return d.Name3; // 중국어
      });
    }

    if (this.langtype == 4) {
      textupdate.attr("font-family", "Fjalla One").text(function(d) {
        if (d.Country == "Country") {
          let str = d.Name4;
          let str_array = str.split(",");

          return str_array[0];
        }
        var text = d.Name4;
        var len = text.length;
        if (len > 10) {
          return text.substring(0, 10) + "...";
        }
        return d.Name4;
      });
    }
    if (this.langtype == 5) {
      textupdate.attr("font-family", "Kosugi Maru").text(function(d) {
        var text = d.Name5;

        var len = text.length;
        if (len > 10) {
          return text.substring(0, 10) + "...";
        }
        return d.Name5;
      });
    }

    if (this.langtype >= 5) {
      this.langtype = 1;
    } else {
      this.langtype = this.langtype + 1;
    }

    console.log("langtype : ", this.langtype);
    barupdate
      .select(".valueSubMainc")
      .transition()
      .duration(1500)
      .textTween(function(d) {
        var self = this;
        var oldnum = deformat(self.textContent, "");

        //var nowdata = d.Confirmed + "/" + d.Deaths + "/" + d.Recovered;
        // var i = d3.interpolateString("0/0/0", nowdata);
        var nowdata = d.Confirmed;
        var i = d3.interpolateRound(oldnum, nowdata);
        //console.log("iiii", i);
        return function(t) {
          return d3.format(format)(i(t)); //i;
        };
      });
  }

  SetMainDataList(coronadata) {
    console.log("coronadata : ", coronadata);

    /*
    europe: 
    Totalconfirmed: 17922
    Totaldeath: 710
    Totalrecovered: 807
    Worldlist: 
    */

    let Data = [];

    Data = coronadata.worldrealtimelist;

    // worldrealtimelist: Array(115)
    // [0 … 99]
    // 0: { Countrycode: "AF", Country: "Afghanistan", Name1: "아프가니스탄", Name2: "", Name3: "", … }
    // 1: { Countrycode: "AL", Country: "Albania", Name1: "알바니아", Name2: "", Name3: "", … }
    // 2: {
    //   Count
    //   Countrycode: "AF"
    //   Country: "Afghanistan"
    //   Name1: "아프가니스탄"
    //   Name2: ""
    //   Name3: ""
    //   Name4: ""
    //   Confirmed: 5
    //   Deaths: 0
    //   Recovered: 0
    //   Continent: "남아시아"
    var firstjson = {
      Countrycode: "",
      Country: "Country",
      Name1: "국가,확진,사망,회복",
      Name2: "pais o territorio,Casos,Fallecidos,Recuperados",
      Name3: "国家,确诊,死亡,治愈",
      Name4: "이태리,Casos,Fallecidos,Recuperados",
      Name5: "国,感染,死亡,回復",
      Name6: "Country,Cases,Deaths,Recovered",
      Confirmed: 9999999,
      Deaths: 0,
      Recovered: 0
    };

    Data.push(firstjson);

    Data.sort(function(a, b) {
      if (a.Confirmed == b.Confirmed) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        //return Number(a.value) - Number(b.value);
        return b.Confirmed - a.Confirmed;
      }
    });

    //var max_number = 150;
    // Data = Data.slice(0, max_number);

    this.SetCountryInfo("List", Data, 0, 0, 0);
  }

  SetSubMainData(coronadata) {
    console.log("coronadata : ", coronadata);

    var europe = coronadata.europe;
    var asia = coronadata.asia;
    var america = coronadata.america;
    var africa = coronadata.africa;
    /*
    europe:
    Totalconfirmed: 17922
    Totaldeath: 710
    Totalrecovered: 807
    Worldlist: 
    */

    // console.log("SubMainData : ", worldrealtimelist);
    let NorthMidAmericaData = [];
    let SouthAmericaData = [];
    let AmericaData = [];
    let EuropeData = [];
    let AsiaData = [];
    let AfricaData = [];

    EuropeData = europe.Worldlist;
    AsiaData = asia.Worldlist;
    AfricaData = africa.Worldlist;
    AmericaData = america.Worldlist;

    // let json = {
    //   Country: d.Country,
    //   Name1: d.Name1,
    //   Confirmed: d.Confirmed,
    //   Deaths: d.Deaths,
    //   Recovered: d.Recovered
    // };

    // this.mainsubtext1.text("국외 코로나19 현황");
    // let svg = d3.select(".mainSub");
    // let svgMidAmerica = d3.select(".MidAmerica");

    AmericaData.sort(function(a, b) {
      if (a.Confirmed == b.Confirmed) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        //return Number(a.value) - Number(b.value);
        return b.Confirmed - a.Confirmed;
      }
    });
    EuropeData.sort(function(a, b) {
      if (a.Confirmed == b.Confirmed) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        //return Number(a.value) - Number(b.value);
        return b.Confirmed - a.Confirmed;
      }
    });
    AsiaData.sort(function(a, b) {
      if (a.Confirmed == b.Confirmed) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        //return Number(a.value) - Number(b.value);
        return b.Confirmed - a.Confirmed;
      }
    });

    var max_number = 30;
    EuropeData = EuropeData.slice(0, max_number);
    AsiaData = AsiaData.slice(0, max_number);

    this.SetCountryInfo(
      "Africa",
      AfricaData,
      africa.Totalconfirmed,
      africa.Totaldeath,
      africa.Totalrecovered
    );
    // this.SetCountryInfo(
    //   "America",
    //   AmericaData,
    //   america.Totalconfirmed,
    //   america.Totaldeath,
    //   america.Totalrecovered
    // );
    // // this.SetCountryInfo("SouthAmerica", SouthAmericaData);
    // this.SetCountryInfo(
    //   "Europe",
    //   EuropeData,
    //   europe.Totalconfirmed,
    //   europe.Totaldeath,
    //   europe.Totalrecovered
    // );
    // this.SetCountryInfo(
    //   "Asia",
    //   AsiaData,
    //   asia.Totalconfirmed,
    //   asia.Totaldeath,
    //   asia.Totalrecovered
    // );
    // this.SetCountryInfo(
    //   "Africa",
    //   AfricaData,
    //   africa.Totalconfirmed,
    //   africa.Totaldeath,
    //   africa.Totalrecovered
    // );

    // var max_number = this.submainrotation + 7;
    // worldrealtimelist = worldrealtimelist.slice(
    //   this.submainrotation,
    //   max_number
    // );

    // if (max_number >= 14) {
    //   this.submainrotation = 0;
    // } else {
    //   this.submainrotation = max_number;
    // }

    // var deformat = function(val, postfix) {
    //   return Number(val.replace(postfix, "").replace(/\,/g, ""));
    // };
    // var format = ",.0f";
    // "Country": "Mainland China",
    //   "Confirmed": 80757,
    //     "Deaths": 3136,
    //       "Recovered": 60106

    // let barsecondremove = svg
    //   .selectAll(".barSubMain")
    //   .remove()
    //   .attr("fill-opacity", 0);

    // let bardata2 = svg
    //   .selectAll(".barSubMain")
    //   .data(NorthAmericaData, function(d) {
    //     return d.Country;
    //   });

    // var barEnterdata2 = bardata2
    //   .enter()
    //   .insert("g", ".axisSubMain")
    //   .attr("class", "barSubMain")
    //   .attr("transform", function(d, i) {
    //     console.log("-----------------------axisSubMain : ", i);
    //     var y = 100 + i * 30;
    //     return "translate(" + "10" + "," + y + ")";
    //   });

    // barEnterdata2
    //   .append("image")
    //   .attr("y", 550)
    //   .attr("x", 10)
    //   .attr("height", "35")
    //   .attr("width", "45")
    //   .attr("href", function(d) {
    //     if (d.CountryName == "중국") {
    //       return "./PNG/china.png";
    //     } else {
    //       return "./PNG/" + d.EngName + ".png";
    //     }
    //   })
    //   .attr("class", "imgfrom")
    //   .attr("id", function(d) {
    //     return d.Idx;
    //   })
    //   .attr("text-anchor", function() {
    //     return "start";
    //   })
    //   .transition()
    //   .duration(1500)
    //   .attr("x", 70)
    //   .attr("y", -45);

    // barEnterdata2
    //   .append("text")
    //   .attr("y", 550)
    //   .style("fill", d => this.getColor(d))
    //   .attr("fill-opacity", 0)
    //   .attr("font-family", "BMDOHYEON")
    //   .attr("x", 150)
    //   .transition()
    //   .duration(1500)
    //   .text(function(d) {
    //     return d.Country;
    //   })
    //   .attr("fill-opacity", 1)
    //   .attr("y", 0)
    //   .attr("font-size", "25px")
    //   .attr("class", "valueSubMain")
    //   .attr("text-anchor", "start")
    //   .attr("x", 50)
    //   .attr("y", -15);

    // barEnterdata2
    //   .append("text")
    //   .attr("y", 550)
    //   .style("fill", d => this.getColor(d))
    //   .attr("fill-opacity", 0)
    //   .attr("font-family", "BMDOHYEON")
    //   .attr("x", 450)
    //   .transition()
    //   .duration(1500)
    //   .tween("text", function(d) {
    //     var self = this;
    //     var i = d3.interpolate(
    //       deformat(self.textContent, ""),
    //       Number(d.Confirmed)
    //     );
    //     var prec = (Number(d.Confirmed) + "").split("."),
    //       round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
    //     return function(t) {
    //       self.textContent =
    //         d3.format(format)(Math.round(i(t) * round) / round) + "";
    //     };
    //   })
    //   .attr("fill-opacity", 1)
    //   .attr("y", 0)
    //   .attr("font-size", "25px")
    //   .attr("class", "valueSubMain")
    //   .attr("text-anchor", "end")
    //   .attr("x", 350)
    //   .attr("y", -15);

    // barEnterdata2
    //   .append("text")
    //   .attr("y", 550)
    //   .style("fill", d => this.getColor(d))
    //   .attr("fill-opacity", 0)
    //   .attr("font-family", "BMDOHYEON")
    //   .attr("x", 590)
    //   .transition()
    //   .duration(1500)
    //   .tween("text", function(d) {
    //     var self = this;
    //     var i = d3.interpolate(
    //       deformat(self.textContent, ""),
    //       Number(d.Deaths)
    //     );
    //     var prec = (Number(d.Deaths) + "").split("."),
    //       round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
    //     return function(t) {
    //       self.textContent =
    //         d3.format(format)(Math.round(i(t) * round) / round) + "";
    //     };
    //   })
    //   .attr("fill-opacity", 1)
    //   .attr("y", 0)
    //   .attr("font-size", "25px")
    //   .attr("class", "valueSubMain")
    //   .attr("text-anchor", "end")
    //   .attr("x", 450)
    //   .attr("y", -15);

    //this.maintext1.text(korearealtime.UpdateTime);
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
  }

  shouldComponentUpdate() {
    // we will handle moving the nodes on our own with d3.js
    // make React ignore this component
    console.log("shouldComponentUpdate()");
    return false;
    //return false
  }

  getColor(d) {
    // console.log("getColor ------------------- ", d);
    if (d == "mainreact") {
      return "#FA5858";
    }

    if (d == "agecnt1") {
      return "#DF0174";
    }
    if (d == "agecnt2") {
      return "#8000FF";
    }
    return "#FAFAFA";
  }

  //SecondSet(nownum, windata, x, y, graphnum, yAxisNAME, xAxisName, graphxpos) {

  //////////////////////////////////////////// ThirdGroup/////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////// FourthGroup/////////////////////////////////////////////////////////////////////////////////////

  getWidth() {
    return this.chartRef.current.parentElement.offsetWidth;
  }
  getHeight() {
    return this.chartRef.current.parentElement.offsetHeight;
  }

  render() {
    console.log("render");
    //let margin = { top: 20, right: 30, bottom: 40, left: 90 },
    let width = this.state.width - this.margin.left - this.margin.right;
    let height = this.state.height - this.margin.top - this.margin.bottom;

    //let graphheight = 300;
    //let graphypos = 300;
    let mainy1 = 50;
    let mainy2 = 1900;

    const style = {
      backgroundColor: "#282c34"
    };

    return (
      <div style={style}>
        <div className="rowChart">
          <svg
            //width={width + this.margin.left + this.margin.right}
            width={2550}
            //height={height + this.margin.top + this.margin.bottom}
            height={1450}
          >
            <g className="mainTitle" transform={`translate( 0,0)`}></g>
            <g className="List" transform={`translate( 10,50)`}></g>
          </svg>
        </div>
      </div>
    );
  }
}
/*
  \ <g className="America" transform={`translate( 1500,50)`}></g>
            <g className="Europe" transform={`translate( 0,50)`}></g>
            <g className="Africa" transform={`translate( 900,50)`}></g>
            <g className="Asia" transform={`translate( 450,50)`}></g>
            */
