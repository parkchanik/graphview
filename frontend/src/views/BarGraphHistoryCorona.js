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

//import csvdata from "./readmelocal.csv";
//import ryukimyangcsv from "./ryukimyang.csv";
import ryukimyangcsv from "./data/LIMSEVEN.csv";
//import typelist from "./data/KINGLIST.csv";
export class BarGraphHistoryCorona extends Component {
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

    this.graphXpos1 = 0;
    this.graphXpos2 = 700;
    this.graphXpos3 = 1400;

    this.graphYpos1 = 600;

    this.graphXyposLine1 = 1000;
    this.graphXyposLine2 = 900;
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
    let svgFirst = d3.select(".mainFirst");
    let svgSecond = d3.select(".mainSecond");
    let svgThird = d3.select(".mainThird");
    let svgFourth = d3.select(".mainFourth");
    let svgFifth = d3.select(".mainFifth");
    let svgSixth = d3.select(".mainSixth");

    // Add X axis

    this.countdownview = svgTitle
      .append("text")
      .attr("x", 1900)
      .attr("y", 50)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "25px");

    this.maintext1 = svgTitle
      .append("text")
      .text("maintext1")
      .attr("x", 600)
      .attr("y", 100)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "70px");

    this.maintext2 = svgTitle
      .append("text")
      .text("maintext2")
      .attr("x", 600)
      .attr("y", 180)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "60px");

    this.maintext3 = svgTitle
      .append("text")
      .text("maintext3")
      .attr("x", 600)
      .attr("y", 260)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "60px");

    this.maintext4 = svgTitle
      .append("text")
      .text("maintext4")
      .attr("x", 600)
      .attr("y", 340)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "60px");

    this.maintext5 = svgTitle
      .append("text")
      //.text("maintext5")
      .attr("x", 600)
      .attr("y", 420)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "60px");

    this.maintext6 = svgTitle
      .append("text")
      .text("maintext5")
      .attr("x", 600)
      .attr("y", 400)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "20px");
    ////////////////////////////////////////////////////////////////Main//////////////////////////////////////////////////

    this.mainsubtext1 = svgSub
      .append("text")
      .text("해외 현황이 들어 감")
      .attr("x", 30)
      .attr("y", -50)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "start")
      .attr("font-size", "30px");

    this.mainsubtext2 = svgSub
      .append("text")
      .text("국가")
      .attr("x", 130)
      .attr("y", 20)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "start")
      .attr("font-size", "30px");

    this.mainsubtext3 = svgSub
      .append("text")
      .text("확진자")
      .attr("x", 460)
      .attr("y", 20)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "30px");

    this.mainsubtext4 = svgSub
      .append("text")
      .text("사망자")
      .attr("x", 600)
      .attr("y", 20)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "30px");

    //////////////////////////////////////////////MainSub////////////////////////////////////////////////////

    svgFirst
      .append("text")
      .text("확진자(사망자)")
      .attr("x", 450)
      .attr("y", 600)
      .attr("fill", d => this.getColor(d))
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });

    this.firsttest4 = svgFirst
      .append("text")
      .text("총 환자")
      .attr("x", 1000)
      .attr("y", 600)
      .attr("fill", d => this.getColor(d))
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "80px";
      });

    this.firsttest3 = svgFirst
      .append("text")
      .text("총 환자")
      .attr("x", 1000)
      .attr("y", 500)
      .attr("fill", d => this.getColor(d))
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "80px";
      });

    this.firsttest2 = svgFirst
      .append("text")
      .text("시간 기준")
      .attr("x", 1000)
      .attr("y", 400)
      .attr("fill", d => this.getColor(d))
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "80px";
      });

    this.firsttest1 = svgFirst
      .append("text")
      .text("국외 발생현황")
      .attr("x", 1000)
      .attr("y", 300)
      .attr("fill", d => this.getColor(d))
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "80px";
      });

    ///////////////////////////// SecondGroup

    this.secondtest3 = svgSecond
      .append("text")
      .text("총 환자")
      .attr("x", 600)
      .attr("y", 250)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", "30px");

    this.secondtest2 = svgSecond
      .append("text")
      //.text("시간 기준")
      .attr("x", 20)
      .attr("y", 150)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "30px");

    this.secondtest1 = svgSecond
      .append("text")
      .attr("x", 850)
      .attr("y", 100)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "50px");
    ///////////////////////////// SecondGroup

    this.thirdtext1 = svgThird
      .append("text")
      //.text("확진자 성별 현황")
      .attr("x", 750)
      .attr("y", 100)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "50px");

    this.thirdtext2 = svgThird
      .append("text")
      //.text("기준 시간")
      .attr("x", 1200)
      .attr("y", 250)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "30px");

    this.thirdtext3 = svgThird
      .append("text")
      .text("확진자")
      .attr("x", 350)
      .attr("y", 350)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("text-anchor", "end")
      .attr("font-size", "50px");

    this.thirdtext4 = svgThird
      .append("text")
      .text("사망자")
      .attr("x", 820)
      .attr("y", 350)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", "50px");

    this.fourthtext1 = svgFourth
      .append("text")
      //.text("확진자 연령별 현황")
      .attr("x", 750)
      .attr("y", 100)
      .attr("fill", "#FAFAFA")
      .style("text-anchor", "end")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", "50px");

    this.fourthtext2 = svgFourth
      .append("text")
      //.text("기준 시간")
      .attr("x", 1200)
      .attr("y", 250)
      .attr("fill", "#FAFAFA")
      .style("text-anchor", "end")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", "30px");

    this.fifthtext1 = svgFifth
      .append("text")
      // .text("연령별 사망 현황")
      .attr("x", 750)
      .attr("y", 100)
      .attr("fill", "#FAFAFA")
      .style("text-anchor", "end")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", "50px");

    this.fifthtext2 = svgFifth
      .append("text")
      // .text("기준 시간")
      .attr("x", 1200)
      .attr("y", 250)
      .attr("fill", "#FAFAFA")
      .style("text-anchor", "end")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", "30px");
  }

  componentDidMount() {
    this.drawChart();
    this.getMain("Main");
    this.getMainSub("MainSub");
    //this.testgo();
    //this.getSecondInfo();
    //this.getThirdInfo();

    this.mainInterval = setInterval(() => {
      this.getMain("Main");
    }, 10000);

    this.mainSubInterval = setInterval(() => {
      this.getMainSub("MainSub");
    }, 15000);

    this.getInfo("Second");
    this.myInterval = setInterval(() => {
      this.countdown = this.countdown - 1;

      var countstr = "" + this.countdown;

      this.countdownview.text(countstr);

      // if (this.countdown == 0) {
      //   this.countdown = 10;
      //   this.getInfo("Second");
      // }

      if (this.countdown == 0) {
        if (this.nowpage == 1) {
          this.nowpage = 2;
          this.getInfo("Second");
        } else if (this.nowpage == 2) {
          this.nowpage = 3;
          this.getInfo("Third");
        } else if (this.nowpage == 3) {
          this.nowpage = 4;
          this.getInfo("Fourth");
        } else if (this.nowpage == 4) {
          this.nowpage = 1;
          this.getInfo("Fifth");
        }
        //} else if (this.nowpage == 5) {
        //  this.nowpage = 1;
        // this.getInfo("First");
        // }

        this.countdown = 25;
      }
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
    // setTimeout(
    //   function() {
    //     this.getMainInfo();
    //   }.bind(this),
    //   1000
    // );

    // console.log("testgo 222222------");
    // setTimeout(
    //   function() {
    //     this.getSecondInfo();
    //   }.bind(this),
    //   7000
    // );
  }
  componentWillMount() {
    //this.dataFromTSV();
  }

  async getMain(num) {
    const { coronadata } = await getCoronaMain();

    this.SetMainData(coronadata);
  }

  async getMainSub(num) {
    const { coronadata } = await getCoronaMainSub();

    this.SetSubMainData(coronadata);
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
      if (num == "First") {
        const { coronadata } = await getCoronaFirst();

        this.SetFirstData(coronadata);
      }

      if (num == "Second") {
        const { coronadata } = await getCoronaSecond();

        console.log("coronadata ----- ", coronadata);

        this.SetSecondData(coronadata);
      }

      if (num == "Third") {
        const { coronadata } = await getCoronaThird();

        console.log("coronadata ----- ", coronadata);

        this.SetThirdData(coronadata);
      }

      if (num == "Fourth") {
        const { coronadata } = await getCoronaThird(); // getCoronaThird 같은데이터쓴다

        console.log("coronadata ----- ", coronadata);

        this.SetFourthData(coronadata);
      }
      if (num == "Fifth") {
        const { coronadata } = await getCoronaThird(); // getCoronaThird 같은데이터쓴다

        console.log("coronadata ----- ", coronadata);

        this.SetFifthData(coronadata);
      }
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

  SetMainData(coronadata) {
    var korearealtime = coronadata.korearealtime;
    this.maintext1.text("코로나19 국내 현황");
    //this.maintext1.text(korearealtime.UpdateTime);

    var format = ",.0f";

    var cnt1 = korearealtime.Cnt1;
    var cnt2 = korearealtime.Cnt2;
    var cnt3 = korearealtime.Cnt3;
    var cnt4 = korearealtime.Cnt4;

    var text2 = "확진환자  : " + d3.format(format)(cnt1) + " 명";
    var text3 = "격리해제 : " + d3.format(format)(cnt2) + " 명";
    var text4 = "사망자 : " + d3.format(format)(cnt3) + " 명";
    var text5 = "검사진행 : " + d3.format(format)(cnt4) + " 명";

    this.maintext2.text(text2);
    this.maintext3.text(text3);
    this.maintext4.text(text4);
    //this.maintext5.text(text5);

    console.log(" korearealtime : ", korearealtime);
    var updatetime = new Date(korearealtime.UpdateTime);
    var testtime = new Date(2020, 0, 1);
    console.log(
      " testtime : ",
      testtime,
      testtime.getFullYear(),
      testtime.getMonth(),
      testtime.getDay()
    );

    console.log(" updatetime : ", updatetime);
    console.log("updatetime.getFullYear()", updatetime.getFullYear());
    console.log("updatetime.getMonth()", updatetime.getMonth());
    console.log("updatetime.getDay()", updatetime.getDay());

    this.maintext6.text(
      "Last Update Time: " +
        updatetime.getFullYear() +
        "년 " +
        (updatetime.getMonth() + 1) +
        "월 " +
        updatetime.getDate() +
        "일 " +
        updatetime.getHours() +
        " 시"
    );
  }

  SetSubMainData(coronadata) {
    var worldrealtimelist = coronadata.worldrealtimelist;
    console.log("SubMainData : ", worldrealtimelist);
    this.mainsubtext1.text("국외 코로나19 현황");
    let svg = d3.select(".mainSub");

    var max_number = this.submainrotation + 7;
    worldrealtimelist = worldrealtimelist.slice(
      this.submainrotation,
      max_number
    );

    if (max_number >= 14) {
      this.submainrotation = 0;
    } else {
      this.submainrotation = max_number;
    }

    var deformat = function(val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };
    var format = ",.0f";
    // worldrealtimelist: Array(18)
    // 0:
    // Idx: 1
    // UpdateTime: "2020-03-09T14:37:56+09:00"
    // CountryName: "중국"
    // EngName: "Mainland China"
    // Cnt1: 80699
    // Cnt2: 3097

    let barsecondremove = svg
      .selectAll(".barSubMain")
      .remove()
      .attr("fill-opacity", 0);

    let bardata2 = svg
      .selectAll(".barSubMain")
      .data(worldrealtimelist, function(d) {
        return d.CountryName;
      });

    var barEnterdata2 = bardata2
      .enter()
      .insert("g", ".axisSubMain")
      .attr("class", "barSubMain")
      .attr("transform", function(d, i) {
        console.log("-----------------------axisSubMain : ", i);
        var y = 100 + i * 65;
        return "translate(" + "10" + "," + y + ")";
      });

    barEnterdata2
      .append("image")
      .attr("y", 550)
      .attr("x", 10)
      .attr("height", "35")
      .attr("width", "45")
      .attr("href", function(d) {
        if (d.CountryName == "중국") {
          return "./PNG/china.png";
        } else {
          return "./PNG/" + d.EngName + ".png";
        }
      })
      .attr("class", "imgfrom")
      .attr("id", function(d) {
        return d.Idx;
      })
      .attr("text-anchor", function() {
        return "start";
      })
      .transition()
      .duration(1500)
      .attr("x", 70)
      .attr("y", -45);

    barEnterdata2
      .append("text")
      .attr("y", 550)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("x", 150)
      .transition()
      .duration(1500)
      .text(function(d) {
        return d.CountryName;
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "35px")
      .attr("class", "valueSubMain")
      .attr("text-anchor", "start")
      .attr("x", 150)
      .attr("y", -15);

    barEnterdata2
      .append("text")
      .attr("y", 550)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("x", 450)
      .transition()
      .duration(1500)
      .tween("text", function(d) {
        var self = this;
        var i = d3.interpolate(deformat(self.textContent, ""), Number(d.Cnt1));
        var prec = (Number(d.Cnt1) + "").split("."),
          round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
        return function(t) {
          self.textContent =
            d3.format(format)(Math.round(i(t) * round) / round) + "";
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "35px")
      .attr("class", "valueSubMain")
      .attr("text-anchor", "end")
      .attr("x", 450)
      .attr("y", -15);

    barEnterdata2
      .append("text")
      .attr("y", 550)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("x", 590)
      .transition()
      .duration(1500)
      .tween("text", function(d) {
        var self = this;
        var i = d3.interpolate(deformat(self.textContent, ""), Number(d.Cnt2));
        var prec = (Number(d.Cnt2) + "").split("."),
          round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
        return function(t) {
          self.textContent =
            d3.format(format)(Math.round(i(t) * round) / round) + "";
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "35px")
      .attr("class", "valueSubMain")
      .attr("text-anchor", "end")
      .attr("x", 590)
      .attr("y", -15);

    //this.maintext1.text(korearealtime.UpdateTime);
  }

  SetFirstData(coronadata) {
    var countryinfo = coronadata.worldinfo;

    console.log("countryinfo", countryinfo);
    let data1 = [];
    let data2 = [];
    countryinfo.map(d => {
      //console.log("H ", t.type, t.NAME, d.NAME);
      let cnt1datajson = {
        name: d.CountryName,
        value: d.AbroadCnt1,
        value2: d.AbroadCnt3
      };
      data1.push(cnt1datajson);

      if (d.AbroadCnt3 > 0) {
        let cnt2datajson = { name: d.CountryName, value: d.AbroadCnt3 };
        data2.push(cnt2datajson);
      }
    });

    data1.sort(function(a, b) {
      if (new Date(a.value) == new Date(b.value)) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        //return Number(a.value) - Number(b.value);
        return new Date(b.value) - new Date(a.value);
      }
    });

    data2.sort(function(a, b) {
      if (new Date(a.value) == new Date(b.value)) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        return new Date(b.value) - new Date(a.value);
      }
    });

    var max_number = 30;
    data1 = data1.slice(0, max_number);
    data2 = data2.slice(0, max_number);

    var maininfo = coronadata.maininfo;
    this.FirstGroup(
      maininfo,
      data1,
      data2,
      "First",
      this.yAxisNAME,
      "value",
      this.graphXpos1
    );
  }

  SetSecondData(coronadata) {
    var kroealistinfo = coronadata.korealist;

    console.log("kroealistinfo", kroealistinfo);
    let data1 = [];
    let data2 = [];

    kroealistinfo.map(d => {
      //console.log("H ", t.type, t.NAME, d.NAME);
      let cnt1datajson = { name: d.Updatetime, value: d.Cnt1a };
      data1.push(cnt1datajson);

      let cnt2datajson = { name: d.Updatetime, value: d.Addcnt };
      data2.push(cnt2datajson);
    });

    data1.sort(function(a, b) {
      if (new Date(a.name) == new Date(b.name)) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        //return Number(a.value) - Number(b.value);
        return new Date(b.name) - new Date(a.name);
      }
    });

    data2.sort(function(a, b) {
      if (new Date(a.name) == new Date(b.name)) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        return new Date(b.name) - new Date(a.name);
      }
    });

    var max_number = 15;
    data1 = data1.slice(0, max_number);
    data2 = data2.slice(0, max_number);

    var secondinfo = coronadata.secondinfo;
    this.SecondGroup(
      secondinfo,
      data2,
      data1,
      "Second",
      this.yAxisNAME,
      "value",
      this.graphXpos1
    );
  }

  SetThirdData(coronadata) {
    console.log("coronadata", coronadata);

    var manwomancount = coronadata.manwomancount;
    var agecount = coronadata.agecount;
    console.log("manwomancount", manwomancount);
    console.log("agecount", agecount);
    let maininfo = [];
    let data1 = [];
    let data2 = [];

    manwomancount.sort(function(a, b) {
      if (a.sex == b.sex) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        //return Number(a.value) - Number(b.value);
        return b.sex - a.sex;
      }
    });

    let mwjson = {
      mwupdatetime: coronadata.mwupdatetime,
      mwhour: coronadata.mwhour,
      ageupdatetime: coronadata.ageupdatetime,
      agehour: coronadata.agehour
    };

    maininfo.push(mwjson);

    this.ThirdGroup(
      mwjson,
      manwomancount,
      agecount,
      "Third",
      this.yAxisNAME,
      "value",
      this.graphXpos1
    );
  }

  SetFourthData(coronadata) {
    console.log("coronadata", coronadata);

    var manwomancount = coronadata.manwomancount;
    var agecount = coronadata.agecount;
    console.log("manwomancount", manwomancount);
    console.log("agecount", agecount);
    let maininfo = [];
    let data1 = [];
    let data2 = [];

    let mwjson = {
      mwupdatetime: coronadata.mwupdatetime,
      mwhour: coronadata.mwhour,
      ageupdatetime: coronadata.ageupdatetime,
      agehour: coronadata.agehour
    };

    //maininfo.push(mwjson);

    this.FourthGroup(
      mwjson,
      manwomancount,
      agecount,
      "Fourth",
      this.yAxisNAME,
      "value",
      this.graphXpos1
    );
  }

  SetFifthData(coronadata) {
    console.log("coronadata", coronadata);

    var manwomancount = coronadata.manwomancount;
    var agecount = coronadata.agecount;
    console.log("manwomancount", manwomancount);
    console.log("agecount", agecount);
    let maininfo = [];
    let data1 = [];
    let data2 = [];

    let mwjson = {
      mwupdatetime: coronadata.mwupdatetime,
      mwhour: coronadata.mwhour,
      ageupdatetime: coronadata.ageupdatetime,
      agehour: coronadata.agehour
    };

    //maininfo.push(mwjson);

    this.FifthGroup(
      mwjson,
      manwomancount,
      agecount,
      "Fifth",
      this.yAxisNAME,
      "value",
      this.graphXpos1
    );
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
  FirstGroup(
    maininfo,
    windata,
    data2,
    graphnum,
    yAxisNAME,
    xAxisName,
    graphxpos
  ) {
    console.log("FirstGroup ", graphnum, windata);

    var durationsecond = 1500;
    // if (graphnum === "First") this.firstmonth.text(nownum + "월");
    // else if (graphnum === "Second") this.secondmonth.text(nownum + "월");
    // else if (graphnum === "Third") this.thirdmonth.text(nownum + "월");
    // else if (graphnum === "Fourth") this.fourthmonth.text(nownum + "월");
    let svgFirst = d3.select(".mainFirst");

    var text1 =
      maininfo.abroadmonth +
      "월 " +
      maininfo.abroadday +
      "일 " +
      maininfo.abroadhour +
      "시 기준";

    var text2 = "환자 총 : " + maininfo.worldcnt1 + " 명";

    var text3 = "사망 : " + maininfo.worldcnt2 + " 명";

    this.firsttest2.text(text1);
    this.firsttest3.text(text2);
    this.firsttest4.text(text3);
    let svg = d3.select(".mainFirst");
    svg
      .transition()
      .duration(1000)
      .attr("transform", "translate(650,50)");

    var datavaluemax = d3.max(
      windata.map(function(data) {
        if (data.name == "중국") {
          return 0;
        }
        return data.value;
      })
    );

    this.xfirst = d3
      .scaleLinear()
      .range([0, 1000])
      .domain([0, datavaluemax + 100]);
    //.domain([0, 70000]); // this.state.width]);

    this.yfirst = d3
      .scaleBand()
      .range([0, 1000])
      .padding(0.1); // this.state.height]);

    svgFirst
      .select(".axisXFirst")
      .call(d3.axisBottom(this.xfirst))
      .attr("stroke", "#FAFAFA")
      .attr("stroke-width", "1px")
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(0)")
      .attr("stroke", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("font-size", "15px")
      .style("text-anchor", "end");

    this.yfirst.domain(windata.map(d => d[yAxisNAME])).padding(0.1);

    svgFirst
      .select(".axisYFirst")
      .call(d3.axisLeft(this.yfirst))
      // .attr("stroke", "#FAFAFA")
      // .attr("stroke-width", "10px")
      .selectAll("text")
      .attr("dy", null);

    let barsecond = svg.selectAll(".barFirst").data(windata, function(d) {
      return d.name;
    });

    let barsecond2 = svg.selectAll(".barFirst2").data(data2, function(d) {
      return d.name;
    });

    var barEntersecond = barsecond
      .enter()
      .insert("g", ".axisFirst")
      .attr("class", "barFirst")
      .attr("transform", d => {
        // console.log(" y(d[yAxisNAME])", yAxisNAME, graphnum, y(d[yAxisNAME]));
        return (
          "translate(" +
          // this.graphXpos2 +
          //graphxpos +
          0 +
          "," +
          //this.ysecond(d[this.state.yAxisAttributeMAIN]) +
          this.yfirst(d[yAxisNAME]) +
          ")"
        );
      });

    barEntersecond
      .append("rect")
      .attr("x", this.xfirst(0))
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 0)
      .attr("height", 23) //y.bandwidth() - 30)
      .attr("fill", d => this.getColor("mainreact"))
      .attr("y", 0)
      .attr("width", 0)
      //.transition(d3.transition().duration(3000))
      .transition()
      .duration(durationsecond)
      .attr("y", -20)
      .attr("width", d => {
        console.log("first rect  ", d.name, d.value, this.xfirst(d[xAxisName]));
        if (this.xfirst(d[xAxisName]) > 1000) {
          return 1400;
        }
        return this.xfirst(d[xAxisName]);
      }); //d => this.xsecond(d[this.state.xAxisAttributeWin]));

    var barInfoSecond = barEntersecond
      .append("text")
      .attr("x", this.xfirst(windata[windata.length - 1].value))
      //.attr("stroke", d=> getWordColor(d) )// d => getColor(d))
      //.style("fill", "#000000") //d => getWordColor(d))
      .attr("class", "barInfoFirst")
      .attr("y", 135)
      .style("fill", d => this.getColor(d))
      .attr("stroke-width", "0px")
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "25px";
      })
      .transition()
      .duration(durationsecond) //interval_time)
      .text(function(d) {
        return d.name;
      })
      .attr("x", d => {
        return -20;
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("text-anchor", "end");

    // value
    barEntersecond
      .append("text")
      .attr("x", d => this.xfirst(windata[windata.length - 1].value))
      .attr("y", 50)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      //.attr("font-family", "Righteous")
      .attr("font-family", "BMDOHYEON")
      .attr("x", 10)
      .transition()
      .duration(durationsecond)
      .tween("text", function(d) {
        var self = this;
        // var i = d3.interpolate(self.textContent, Number(d.W));

        var i = d3.interpolate(deformat(self.textContent, ""), Number(d.value));

        var prec = (Number(d.value) + "").split("."),
          round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

        return function(t) {
          self.textContent =
            d3.format(format)(Math.round(i(t) * round) / round) + "";
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "25px")
      .attr("class", "valueFirst")
      .attr("x", d => {
        if (this.xfirst(d[xAxisName]) > 1000) {
          return 1400 + 20;
        }

        return this.xfirst(d[xAxisName]) + 20;
      })
      .attr("y", 0);

    // value
    barEntersecond
      .append("text")
      .attr("x", d => this.xfirst(windata[windata.length - 1].value))
      .attr("y", 50)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      //.attr("font-family", "Righteous")
      .attr("font-family", "BMDOHYEON")
      .attr("x", 10)
      .transition()
      .duration(durationsecond)
      .tween("text", function(d) {
        var self = this;
        if (d.value2 < 1) {
          return "";
        }
        var textcontentstr = self.textContent;

        var number = textcontentstr.replace(/[^0-9]/g, "");

        var i = d3.interpolate(
          //deformat(self.textContent, ""),
          deformat(number, ""),
          Number(d.value2)
        );

        var prec = (Number(d.value2) + "").split("."),
          round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

        return function(t) {
          self.textContent =
            "( " +
            d3.format(format)(Math.round(i(t) * round) / round) +
            "" +
            " )";
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "25px")
      .attr("class", "value2First")
      .attr("x", d => {
        if (this.xfirst(d[xAxisName]) > 1000) {
          return 1400 + d.value.toString().length * 30;
        }

        return this.xfirst(d[xAxisName]) + d.value.toString().length * 30;
      })
      .attr("y", 0)
      .attr("text-anchor", "start");

    let barUpdatesecond = barsecond
      .transition("2")
      .duration(durationsecond)
      .ease(d3.easeLinear);

    barUpdatesecond
      .select("rect")
      //.attr("y", d => y(d[yAxisNAME]))
      //.attr("height", 20) //y.bandwidth() - 10)
      //.style("fill", d => this.getColor(d))
      .duration(durationsecond)
      .attr("width", d => {
        if (this.xfirst(d[xAxisName]) > 1000) {
          return 1400;
        }

        return this.xfirst(d[xAxisName]);
      });

    var deformat = function(val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };
    var format = ",.0f";

    barUpdatesecond
      .select(".valueFirst")
      .tween("text", function(d) {
        var self = this;
        var i = d3.interpolate(deformat(self.textContent, ""), Number(d.value));
        var prec = (Number(d.value) + "").split("."),
          round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

        return function(t) {
          self.textContent =
            d3.format(format)(Math.round(i(t) * round) / round) + "";
        };
      })
      .duration(durationsecond)
      .attr("x", d => {
        if (this.xfirst(d[xAxisName]) > 1000) {
          return 1400 + 10;
        }

        return this.xfirst(d[xAxisName]) + 10;
      });

    barUpdatesecond.attr("transform", d => {
      return (
        "translate(" +
        ///this.graphXpos2 +
        0 +
        "," +
        this.yfirst(d[yAxisNAME]) +
        ")"
      );
    });

    var barExit = barsecond
      .exit()
      .attr("fill-opacity", 1)
      .transition()
      .duration(durationsecond);

    barExit.attr("transform", function(d) {
      return "translate(-5000," + "0" + ")";
    });
  }

  //////////////////////////////////////////// SecondGroup
  SecondGroup(
    maininfo,
    windata,
    data2,
    graphnum,
    yAxisNAME,
    xAxisName,
    graphxpos
  ) {
    console.log("secondset ", graphnum, windata, maininfo);

    let svgSecond = d3.select(".mainSecond");

    var text1 =
      maininfo.koreamonth +
      "월 " +
      maininfo.koreaday +
      "일 " +
      maininfo.koreahour +
      "시 기준";

    // var text2 = "확진환자  : " + maininfo.koreacnt1 + " 명";
    // var text3 = "격리해제 : " + maininfo.koreacnt2 + " 명";
    // var text4 = "사망자 : " + maininfo.koreacnt3 + " 명";
    // var text5 = "검사진행 : " + maininfo.koreacnt4 + " 명";

    this.secondtest1.text("일별 확진자 , 증가");
    // this.secondtest2.text(text1);
    this.secondtest3.text("( 3월 1일 이전 9시 기준 ,  3월 2일 이후 0시 기준 )");
    //this.secondtest4.text(text3);
    //this.secondtest5.text(text4);
    //this.secondtest6.text(text5);

    // var updatearray = mwupdatetime.split("-");
    // this.thirdtext2.text(
    //   "기준 시간 : " +
    //     updatearray[0] +
    //     "년 " +
    //     updatearray[1] +
    //     "월 " +
    //     updatearray[2] +
    //     "일 " +
    //     mwhour +
    //     " 시 기준"
    // );

    let svg = d3.select(".main" + graphnum);
    svg
      .transition()
      .duration(1000)
      .attr("transform", "translate(650,0)");

    console.log("secondgroup : windata ", windata);
    console.log("secondgroup : data2 ", data2);

    //this.ysecond.domain(windata.map(d => d[yAxisNAME])); //.padding(0.1);

    var deformat = function(val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };

    var format = ",.0f";

    this.xsecond = d3
      .scaleTime()
      //.scaleLinear()
      .range([0, 1100]);
    //.tickPadding(20) //x 축 숫자 표시 padding
    //  .tickFormat(d3.timeFormat("%Y-%m"));
    //.tickSize(-10);
    //.padding(0.1); // this.state.height]);
    //.domain([0, 250]); // this.state.width]);

    var data2valuemax = d3.max(
      data2.map(function(data) {
        return data.value;
      })
    );

    this.ysecond = d3
      //.scaleBand()
      .scaleLinear()
      .range([1000, 300])
      .domain([0, data2valuemax]); // this.state.width]);
    //.padding(0.1); // this.state.height]);

    var timemin = d3.min(
      windata.map(function(data) {
        return new Date(data.name);
      })
    );

    var timemax = d3.max(
      windata.map(function(data) {
        return new Date(data.name);
      })
    );

    this.xsecond.domain([timemin, timemax]);
    svgSecond
      .select(".axisXSecond")
      .call(
        d3
          .axisBottom(this.xsecond)
          .ticks(10)
          .tickFormat(d3.timeFormat("%m-%d"))
        //.tickFormat(d3.timeFormat("%Y-%m-%d"))
      )
      .selectAll("text")
      .attr("transform", "translate(50,0)rotate(0)")
      .attr("stroke", "#FAFAFA")
      .style("font-size", "25px")
      .style("text-anchor", "end");

    svgSecond
      .select(".axisYSecond")
      .call(d3.axisLeft(this.ysecond))
      .selectAll("text")
      .attr("stroke", "#FAFAFA")
      .style("font-size", "25px")
      .style("text-anchor", "end");

    //this.xsecond.domain([timemin, timemax]); //.padding(0.1);
    //this.xsecond.domain([new Date(2000, 01, 01), new Date(2005, 01, 01)]); //.padding(0.1);

    //this.yfirst2.domain(data2.map(d => d[yAxisNAME])).padding(0.1);

    let barsecondremove = svg
      .selectAll(".bar" + graphnum)
      .remove()
      .attr("fill-opacity", 0);

    let barsecondremove2 = svg
      .selectAll(".bar" + graphnum + "data2")
      .remove()
      .attr("fill-opacity", 0);

    let lineremove1 = svg
      .selectAll(".linesecond1")
      .remove()
      .attr("fill-opacity", 0);

    let lineremove2 = svg
      .selectAll(".linesecond2")
      .remove()
      .attr("fill-opacity", 0);

    let barsecond = svg.selectAll(".bar" + graphnum).data(windata, function(d) {
      console.log("windata name ----- ", d.name);
      return d.name;
    });

    let bardata2 = svg
      .selectAll(".bar" + graphnum + "data2")
      .data(data2, function(d) {
        return d.name;
      });

    var barEnterdata2 = bardata2
      .enter()
      .insert("g", ".axis" + graphnum + "data2")
      .attr("class", "bar" + graphnum + "data2")
      .attr("transform", d => {
        return (
          "translate(" +
          (this.xsecond(new Date(d["name"])) + 50) +
          "," +
          this.ysecond(d["value"]) +
          ")"
        );
      });

    barEnterdata2
      .append("svg:circle")
      .attr("class", "circ")
      //.attr("x", d => this.xsecond(d["name"]))
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 0)
      .attr("fill", d => this.getColor(d))
      .attr("y", 0)
      .attr("y", 50)
      .attr("width", 20)
      .transition(d3.transition().duration(3000))
      .attr("r", 3)
      .attr("y", 0)
      .attr("x", 0);

    barEnterdata2
      .append("text")
      .attr("y", 50)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("x", 10)
      .transition()
      .duration(1500)
      .tween("text", function(d) {
        var self = this;
        var i = d3.interpolate(deformat(self.textContent, ""), Number(d.value));
        var prec = (Number(d.value) + "").split("."),
          round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
        return function(t) {
          self.textContent =
            d3.format(format)(Math.round(i(t) * round) / round) + "";
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "25px")
      .attr("class", "value" + graphnum + "data2")
      .attr("text-anchor", "end")
      .attr("x", 20)
      .attr("y", -15);

    var line = d3
      .line()
      .x(d => {
        return this.xsecond(new Date(d.name));
      })
      .y(d => {
        return this.ysecond(d.value);
      });

    let linesecond2 = svg.append("path").attr("class", "linesecond2");

    linesecond2
      .attr("d", line(data2))
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("transform", "translate(50,0)");

    let linesecond1 = svg.append("path").attr("class", "linesecond1");
    linesecond1
      .attr("d", line(windata))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("transform", "translate(50,0)");

    var barEntersecond = barsecond
      .enter()
      .insert("g", ".axis" + graphnum)
      .attr("class", "bar" + graphnum)
      .attr("transform", d => {
        // console.log(" y(d[yAxisNAME])", yAxisNAME, graphnum, y(d[yAxisNAME]));
        console.log(
          "barEntersecond barEntersecond barEntersecond  ",
          d["name"]
        );
        return (
          "translate(" +
          (this.xsecond(new Date(d["name"])) + 50) +
          "," +
          this.ysecond(d["value"]) +
          ")"
        );
      });

    barEntersecond
      .append("svg:circle")
      .attr("class", "circ1")
      //.attr("x", d => this.xsecond(d["name"]))
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 0)
      .attr("fill", d => this.getColor(d))
      .attr("y", 0)
      .attr("y", 50)
      .attr("width", 20)
      .transition(d3.transition().duration(3000))
      .attr("r", 3)
      .attr("y", 0)
      .attr("x", 0);

    barEntersecond
      .append("text")
      .attr("y", 50)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("x", 10)
      .transition()
      .duration(3000)
      .tween("text", function(d) {
        var self = this;
        var i = d3.interpolate(deformat(self.textContent, ""), Number(d.value));
        var prec = (Number(d.value) + "").split("."),
          round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
        return function(t) {
          self.textContent =
            d3.format(format)(Math.round(i(t) * round) / round) + "";
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "25px")
      .attr("class", "value" + graphnum + "data2")
      .attr("text-anchor", "start")
      .attr("x", -20)
      .attr("y", -15);
  }
  /////////////////////////////////////////SecondGroup/////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////// ThirdGroup/////////////////////////////////////////////////////////////////////////////////////
  ThirdGroup(
    manwomaninfo,
    data1,
    data2,
    graphnum,
    yAxisNAME,
    xAxisName,
    graphxpos
  ) {
    //let svgmove = d3.select(".mainFirst");
    let svgThird = d3.select(".mainThird");

    d3.select(".main" + graphnum)
      .transition()
      .duration(1000)
      .attr("transform", "translate(650,0)");

    console.log("manwomaninfo : ", manwomaninfo);
    var mwupdatetime = manwomaninfo.mwupdatetime;

    var mwhour = manwomaninfo.mwhour;

    this.thirdtext1.text("성별 현황");

    var updatearray = mwupdatetime.split("-");
    this.thirdtext2.text(
      "기준 시간 : " +
        updatearray[0] +
        "년 " +
        updatearray[1] +
        "월 " +
        updatearray[2] +
        "일 " +
        mwhour +
        " 시"
    );

    console.log("data1 : ", data1);
    var width = 650;
    var height = 650;
    var margin = 40;
    var radius = Math.min(width, height) / 2 - margin;

    var color = d3
      .scaleOrdinal()
      .domain(["남자", "여자"])
      .range(["#98abc5", "#8a89a6"]);

    var g = d3.select(".main" + graphnum);

    var pie = d3
      .pie() //this will create arc data for us given a list of values
      .value(function(d) {
        // console.log("pie value : ", d);
        return d.cnt1;
      });

    var pie2 = d3
      .pie() //this will create arc data for us given a list of values
      .value(function(d) {
        //console.log("pie value : ", d);
        return d.cnt3;
      });

    // Generate the arcs
    var arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    //Generate groups
    var arcs = g
      .selectAll("arc")
      .data(pie(data1))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", "translate(300,700)");

    var arcs2 = g
      .selectAll("arc2")
      .data(pie2(data1))
      .enter()
      .append("g")
      .attr("class", "arc2")
      .attr("transform", "translate(900,700)");
    //Draw arc paths
    arcs
      .append("path")
      .attr("fill", function(d, i) {
        return color(i);
      })
      .attr("d", arc);

    arcs2
      .append("path")
      .attr("fill", function(d, i) {
        return color(i);
      })
      .attr("d", arc);

    arcs
      .append("text")
      .attr("transform", function(d) {
        var centroid = arc.centroid(d);
        var x = centroid[0] - 100;
        var y = centroid[1];
        return "translate(" + x + "," + y + ")";
      })
      .text(function(d) {
        var sexstr = "";

        if (d.data.sex == 1) {
          sexstr = "남자";
        } else {
          sexstr = "여자";
        }
        return sexstr + "\n ( " + d.data.cnt1 + " ) ";
      })
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", "30px");

    arcs
      .append("text")
      .attr("transform", function(d) {
        console.log("arc.centroid(d)", arc.centroid(d));

        var centroid = arc.centroid(d);
        var x = centroid[0] - 100;
        var y = centroid[1] + 50;
        return "translate(" + x + "," + y + ")";
      })
      .text(function(d) {
        return "(" + d.data.cnt2 + "% )";
      })
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", "30px");

    arcs2
      .append("text")
      .attr("transform", function(d) {
        var centroid = arc.centroid(d);
        var x = centroid[0] - 100;
        var y = centroid[1];
        return "translate(" + x + "," + y + ")";
      })
      .text(function(d) {
        var sexstr = "";

        if (d.data.sex == 1) {
          sexstr = "남자";
        } else {
          sexstr = "여자";
        }
        return sexstr + "\n ( " + d.data.cnt3 + " ) ";
      })
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", "30px");

    arcs2
      .append("text")
      .attr("transform", function(d) {
        console.log("arc.centroid(d)", arc.centroid(d));

        var centroid = arc.centroid(d);
        var x = centroid[0] - 100;
        var y = centroid[1] + 50;
        return "translate(" + x + "," + y + ")";
      })
      .text(function(d) {
        return "(" + d.data.cnt4 + "% )";
      })
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", "30px");
  }
  /////////////////////////////////////////ThirdGroup

  //////////////////////////////////////////// FourthGroup/////////////////////////////////////////////////////////////////////////////////////
  FourthGroup(
    manwomaninfo,
    data1,
    data2,
    graphnum,
    yAxisNAME,
    xAxisName,
    graphxpos
  ) {
    console.log("FourthGroup manwomaninfo", manwomaninfo);
    console.log("FourthGroup data1", data1);
    console.log("FourthGroup data2", data2);

    var mwupdatetime = manwomaninfo.mwupdatetime;

    var mwhour = manwomaninfo.mwhour;

    this.fourthtext1.text("연령별 확진자 현황");

    var updatearray = mwupdatetime.split("-");
    this.fourthtext2.text(
      "기준 시간 : " +
        updatearray[0] +
        "년 " +
        updatearray[1] +
        "월 " +
        updatearray[2] +
        "일 " +
        mwhour +
        " 시"
    );

    let svgFourth = d3.select(".mainFourth");

    d3.select(".main" + graphnum)
      .transition()
      .duration(500)
      .attr("transform", "translate(650,0)");

    var deformat = function(val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };

    var format = ",.0f";

    this.xfourth = d3
      .scaleBand()
      .range([0, 1100])
      .domain(
        data2.map(d => {
          console.log("domain : ", d["age"]);
          return d["age"];
        })
      )
      .padding(0.1); // this.state.height]);

    // this.xthird.domain(data2.map(d => d["age"])).padding(0.1);

    var cnt1max = d3.max(
      data2.map(function(data) {
        return data.cnt1 + 500;
      })
    );

    this.yfourth = d3
      .scaleLinear()
      .range([-300, 400])
      .domain([cnt1max, 0]);

    svgFourth
      .select(".axisXFourth")
      .call(d3.axisBottom(this.xfourth))
      .selectAll("text")
      .attr("transform", "translate(10,0)rotate(0)")
      .text(d => {
        if (d == 0) {
          return "   0~9세";
        }

        return "   " + d + " 대";
      })
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("font-size", "20px")
      .style("text-anchor", "end");

    svgFourth
      .select(".axisYFourth")
      .call(d3.axisLeft(this.yfourth).ticks(5))
      .attr("font-family", "BMDOHYEON")
      .style("font-size", "15px")
      .attr("stroke", "#FAFAFA")
      .attr("stroke-width", "1px")
      .selectAll("text")
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("font-size", "20px")
      .style("text-anchor", "end");

    let barsecondremove = svgFourth
      .selectAll(".bar" + graphnum)
      .remove()
      .attr("fill-opacity", 0);

    let barsecond = svgFourth
      .selectAll(".bar" + graphnum)
      .data(data2, function(d) {
        return d.age;
      });

    var barEntersecond = barsecond
      .enter()
      .insert("g", ".axis" + graphnum)
      .attr("class", "bar" + graphnum)
      .attr("transform", d => {
        // console.log(" y(d[yAxisNAME])", yAxisNAME, graphnum, y(d[yAxisNAME]));
        // //console.log(
        //  // "xthird2(d[age]), ythird2(d[cnt1])   ",
        //   this.xfourth(d["age"]),
        //   this.yfourth(d["cnt1"])
        // );
        var x = this.xfourth(d.age);
        x = x + 80;
        var y = this.yfourth(d.cnt1);
        y = y + 600;
        return "translate(" + x + "," + y + ")";
      });

    barEntersecond
      .append("rect")
      .attr("x", 0) //d => this.xthird(d.age))
      .attr("width", 0)
      .attr("fill", d => this.getColor("agecnt1"))
      .attr("y", 0)
      .attr("width", 30)
      .transition(d3.transition().duration(500))
      .attr("height", d => 400 - this.yfourth(d.cnt1)); // 시발 왜 500 이야

    barEntersecond
      .append("text")
      .attr("y", 50)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("x", 10)
      .transition()
      .duration(500)
      .tween("text", function(d) {
        var self = this;
        var i = d3.interpolate(deformat(self.textContent, ""), Number(d.cnt1));
        var prec = (Number(d.cnt1) + "").split("."),
          round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
        return function(t) {
          self.textContent =
            d3.format(format)(Math.round(i(t) * round) / round) + "";
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "20px")
      .attr("class", "value" + graphnum + "data2")
      .attr("text-anchor", "end")
      .attr("x", 25)
      .attr("y", -15);
  }
  /////////////////////////////////////////FourthGroup///////////////////////////////////////////////////////////

  //////////////////////////////////////////// FifthGroup/////////////////////////////////////////////////////////////////////////////////////
  FifthGroup(
    manwomaninfo,
    data1,
    data2,
    graphnum,
    yAxisNAME,
    xAxisName,
    graphxpos
  ) {
    console.log("FifthGroup manwomaninfo", manwomaninfo);
    console.log("FifthGroup data1", data1);
    console.log("FifthGroup data2", data2);

    var ageupdatetime = manwomaninfo.ageupdatetime;

    var agehour = manwomaninfo.agehour;

    this.fifthtext1.text("연령별 사망자 현황");

    var ageupdatearray = ageupdatetime.split("-");
    this.fifthtext2.text(
      "기준 시간 : " +
        ageupdatearray[0] +
        "년 " +
        ageupdatearray[1] +
        "월 " +
        ageupdatearray[2] +
        "일 " +
        agehour +
        " 시"
    );

    let svgFifth = d3.select(".mainFifth");

    d3.select(".main" + graphnum)
      .transition()
      .duration(500)
      .attr("transform", "translate(650,0)");

    var deformat = function(val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };

    var format = ",.0f";

    this.xfifth = d3
      .scaleBand()
      .range([0, 1100])
      .domain(
        data2.map(d => {
          console.log("domain : ", d["age"]);
          return d["age"];
        })
      )
      .padding(0.1); // this.state.height]);

    // this.xthird.domain(data2.map(d => d["age"])).padding(0.1);

    var cnt2max = d3.max(
      data2.map(function(data) {
        return data.cnt2 + 5;
      })
    );

    this.yfifth = d3
      .scaleLinear()
      .range([-300, 400])
      .domain([cnt2max, 0]);

    svgFifth
      .select(".axisXFifth")
      .call(d3.axisBottom(this.xfifth))
      .attr("font-family", "BMDOHYEON")
      .style("font-size", "15px")
      .attr("stroke", "#FAFAFA")
      .attr("stroke-width", "1px")
      .selectAll("text")
      .attr("transform", "translate(10,0)rotate(0)")
      .text(d => {
        if (d == 0) {
          return "   0~9세";
        }

        return "   " + d + " 대";
      })
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("font-size", "20px")
      .style("text-anchor", "end");

    svgFifth
      .select(".axisYFifth")
      .call(d3.axisLeft(this.yfifth).ticks(7))
      .attr("font-family", "BMDOHYEON")
      .style("font-size", "15px")
      .attr("stroke", "#FAFAFA")
      .attr("stroke-width", "1px")
      .selectAll("text")
      .attr("fill", "#FAFAFA")
      .attr("font-family", "BMDOHYEON")
      .style("font-size", "20px")
      .style("text-anchor", "end");

    let barsecondremove = svgFifth
      .selectAll(".bar" + graphnum)
      .remove()
      .attr("fill-opacity", 0);

    let barsecond = svgFifth
      .selectAll(".bar" + graphnum)
      .data(data2, function(d) {
        return d.age;
      });

    var barEntersecond = barsecond
      .enter()
      .insert("g", ".axis" + graphnum)
      .attr("class", "bar" + graphnum)
      .attr("transform", d => {
        // console.log(" y(d[yAxisNAME])", yAxisNAME, graphnum, y(d[yAxisNAME]));
        console.log(
          "xfifth(d[age]), yfifth(d[d.cnt2])   ",
          d.age,
          this.xfifth(d.age),
          d.cnt2,
          this.yfifth(d.cnt2)
        );

        var x = this.xfifth(d.age);
        x = x + 80;
        var y = this.yfifth(d.cnt2);
        y = y + 600;
        return "translate(" + x + "," + y + ")";
      });

    barEntersecond
      .append("rect")
      .attr("x", 0) //d => this.xthird(d.age))
      .attr("width", 0)
      .attr("fill", d => this.getColor("agecnt2"))
      .attr("y", 0)
      .attr("width", 30)
      .transition(d3.transition().duration(500))
      .attr("height", d => 400 - this.yfifth(d.cnt2)); // 시발 왜 500 이야

    barEntersecond
      .append("text")
      .attr("y", 50)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("x", 10)
      .transition()
      .duration(500)
      .tween("text", function(d) {
        var self = this;
        var i = d3.interpolate(deformat(self.textContent, ""), Number(d.cnt2));
        var prec = (Number(d.cnt2) + "").split("."),
          round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;
        return function(t) {
          self.textContent =
            d3.format(format)(Math.round(i(t) * round) / round) + "";
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "30px")
      .attr("class", "value" + graphnum + "data2")
      .attr("text-anchor", "end")
      .attr("x", 20)
      .attr("y", -20);
  }
  /////////////////////////////////////////FifthGroup///////////////////////////////////////////////////////////

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
            <g className="mainSub" transform={`translate( 0,550)`}></g>
            <g className="mainFirst" transform={`translate( 2500,0)`}>
              <g
                className="axisXFirst"
                transform={`translate(0,${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYFirst"
                transform={`translate(0,${this.graphpositionzero})`}
              ></g>
              <g
                className="axisXFirst2"
                transform={`translate(1050,${this.graphXyposLine1})`}
              ></g>
              <g className="axisYFirst2" transform={`translate(1050,0)`}></g>
            </g>
            <g className="mainSecond" transform={`translate( 2500,${mainy1})`}>
              <g className="axisXSecond" transform={`translate(50,1000)`}></g>
              <g className="axisYSecond" transform={`translate(50,0)`}></g>
            </g>
            <g className="mainThird" transform={`translate( 2500,${mainy1})`}>
              <g className="slices"></g>
              <g className="labels"></g>
              <g className="lines"></g>
            </g>
            <g className="mainFourth" transform={`translate( 2500,${mainy1})`}>
              <g className="axisXFourth" transform={`translate(50,1000)`}></g>
              <g className="axisYFourth" transform={`translate(50,600)`}></g>
            </g>
            <g className="mainFifth" transform={`translate( 2500,${mainy1})`}>
              <g className="axisXFifth" transform={`translate(50,1000)`}></g>
              <g className="axisYFifth" transform={`translate(50,600)`}></g>
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

/*


  SetData() {
    //onst { config, alldata, data, currentdata, currentdate } = this.state;

    const alldata = this.alldata;
    //const typedata = this.typedata;
    console.log("SetData Start");
    console.log("SetData alldatat ", alldata);
    //console.log("SetData typedata ", typedata);
    // var nowdate = currentdate;
    var nowdate = this.currentdate;

    var nownum = this.currentnum;

    //this.month.text(nownum);

    this.title4.text(nownum);

    var nowdata = [];
    let data1 = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    alldata.map(d => {
      //console.log("ddddddddddddd", new Date(d.date));
      //console.log("nowdate :", nowdate);
      //console.log("d.YEAR ---- ", d.YEAR, nownum);
      //if (d.YEAR == nowdatestring) {
      //console.log("d.MONTH === nownum  : ", d.MONTH, nownum, d);
      if (d.YEAR === nownum.toString()) {
        console.log("d.MONTH === nownum  : ", d.MONTH, d);
        nowdata.push(d);

        //console.log("AVG ", t.type, t.NAME, d.NAME);

        //console.log("AVG ", t.type, t.NAME, d.NAME);
        let avgjsondata = { name: d.NAME, gubun: d.TEAM, value: d.AVG };
        data1.push(avgjsondata);

        //console.log("H ", t.type, t.NAME, d.NAME);
        let hjsondata = { name: d.NAME, gubun: d.TEAM, value: d.H };
        data2.push(hjsondata);

        //console.log("HR", t.type, t.NAME, d.NAME);
        let hrjsondata = { name: d.NAME, gubun: d.TEAM, value: d.HR };
        data3.push(hrjsondata);

        //console.log("RBI", t.type, t.NAME, d.NAME);
        let rbijsondata = { name: d.NAME, gubun: d.TEAM, value: d.RBI };
        data4.push(rbijsondata);
      }
    });

    // console.log("------- alldata push ", alldata);
    // console.log("------- windata push ", windata);
    // console.log("------- eradata push ", eradata);

    data1.sort(function(a, b) {
      if (Number(a.value) == Number(b.value)) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        //return Number(a.value) - Number(b.value);
        return Number(b.value) - Number(a.value);
      }
    });

    data2.sort(function(a, b) {
      if (Number(a.value) == Number(b.value)) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        return Number(b.value) - Number(a.value);
      }
    });

    data3.sort(function(a, b) {
      if (Number(a.value) == Number(b.value)) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        return Number(b.value) - Number(a.value);
      }
    });

    data4.sort(function(a, b) {
      if (Number(a.value) == Number(b.value)) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        return Number(b.value) - Number(a.value);
      }
    });

    //console.log("eradata_sort 0 ", data1[0].name, data1[0].value);
    //console.log("eradata_sort 1 ", data1[1].name, data1[1].value);
    //console.log("eradata_sort 2 ", data1[2].name, data1[2].value);

    console.log("data1 ", data1);
    console.log("data2 ", data2);
    console.log("data3 ", data3);
    console.log("data4 ", data4);

    var max_number = 11;
    data1 = data1.slice(0, max_number);
    data2 = data2.slice(0, max_number);
    data3 = data3.slice(0, max_number);
    data4 = data4.slice(0, max_number);

    //this.currentnum = nownum + 1;

    this.FirstGroup(
      nownum,
      data1,
      this.xfirst,
      this.yfirst,
      "First",
      this.yAxisNAME,
      "value",
      this.graphXpos1
    );

    // setTimeout(
    //   function() {
    //     this.SecondSet(
    //       nownum,
    //       data2,
    //       this.xsecond,
    //       this.ysecond,
    //       "Second",
    //       this.yAxisNAME,
    //       "value",
    //       //this.xAxisWIN,
    //       this.graphXpos1
    //     );
    //   }.bind(this),
    //   5000
    // );

    // setTimeout(
    //   function() {
    //     this.SecondSet(
    //       nownum,
    //       data3,
    //       this.xthird,
    //       this.ythird,
    //       "Third",
    //       this.yAxisNAME,
    //       "value",
    //       this.graphXpos1
    //     );
    //   }.bind(this),
    //   10000
    // );

    // setTimeout(
    //   function() {
    //     this.SecondSet(
    //       nownum,
    //       data4,
    //       this.xfourth,
    //       this.yfourth,
    //       "Fourth",
    //       this.yAxisNAME,
    //       "value",
    //       this.graphXpos1
    //     );
    //   }.bind(this),
    //   15000
    // );

    console.log("nownum ::::: ", nownum);
    if (nownum >= 2019) {
      return;
    }

    this.currentnum = nownum + 1;

    setTimeout(
      function() {
        this.SetData();
      }.bind(this),
      20000
    );
  }

*/
