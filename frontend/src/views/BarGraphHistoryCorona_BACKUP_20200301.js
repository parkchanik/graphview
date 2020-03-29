import React, { Component } from "react";
import * as d3 from "d3";
//import geojson from "./geojson.json";
//import geojson from "./TL_SCCO_CTPRVN.json";
//import geojson from "./TL_SCCO_SIG.json";

//import { geoMercator, geoPath } from "d3-geo";
//import { select } from "d3-selection";
import "./bargraphhistory.css";
import { getCoronaMain } from "../services/getdata";
import { getCoronaSecond } from "../services/getdata";
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

    this.xfirst = d3
      .scaleLinear()
      .range([0, 800, 1000])
      .domain([0, 1000, 70000]); // this.state.width]);

    this.xfirst2 = d3
      .scaleLinear()
      .range([0, 650])
      .domain([0, 100]); // this.state.width]);

    this.yfirst = d3
      .scaleBand()
      .range([0, 1000])
      .padding(0.1); // this.state.height]);

    this.yfirst2 = d3
      .scaleBand()
      .range([600, 1000])
      .padding(0.1); // this.state.height]);

    this.xsecond = null;
    this.ysecond = null;

    this.xthird = d3
      .scaleLinear()
      .range([0, 1200])
      .domain([0, 80]); // this.state.width]);

    this.ythird = d3
      .scaleBand()
      .range([0, 800])
      .padding(0.1); // this.state.height]);

    this.xfourth = d3
      .scaleLinear()
      .range([0, 1200])
      .domain([0, 200]); // this.state.width]);

    this.yfourth = d3
      .scaleBand()
      .range([0, 800])
      .padding(0.1); // this.state.height]);

    this.xfifth = d3
      .scaleLinear()
      .range([0, 500])
      .domain([0, 100]); // this.state.width]);

    this.yfifth = d3
      .scaleBand()
      .range([0, 300])
      .padding(0.1); // this.state.height]);

    this.xsixth = d3
      .scaleLinear()
      .range([0, 500])
      .domain([0, 100]); // this.state.width]);

    this.ysixth = d3
      .scaleBand()
      .range([0, 300])
      .padding(0.1); // this.state.height]);

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

    this.countdown = 60;
    this.countdownview = null;
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
    let svgFirst = d3.select(".mainFirst");
    let svgSecond = d3.select(".mainSecond");
    let svgThird = d3.select(".mainThird");
    let svgFourth = d3.select(".mainFourth");
    let svgFifth = d3.select(".mainFifth");
    let svgSixth = d3.select(".mainSixth");

    // Add X axis

    this.countdownview = svgTitle
      .append("text")
      .attr("x", 1500)
      .attr("y", 100)
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "100px";
      });

    svgFirst
      .append("text")
      .text("확진자")
      .attr("x", 100)
      .attr("y", 600)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });

    this.firsttest4 = svgFirst
      .append("text")
      .text("총 환자")
      .attr("x", 1000)
      .attr("y", 500)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "80px";
      });

    this.firsttest3 = svgFirst
      .append("text")
      .text("총 환자")
      .attr("x", 1000)
      .attr("y", 400)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "80px";
      });

    this.firsttest2 = svgFirst
      .append("text")
      .text("시간 기준")
      .attr("x", 1000)
      .attr("y", 300)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "80px";
      });

    this.firsttest1 = svgFirst
      .append("text")
      .text("국외 발생현황")
      .attr("x", 1000)
      .attr("y", 200)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "80px";
      });

    ///////////////////////////// SecondGroup

    this.secondtest6 = svgSecond
      .append("text")
      .text("총 환자")
      .attr("x", 600)
      .attr("y", 250)
      .attr("fill", "#EF8000")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });

    this.secondtest5 = svgSecond
      .append("text")
      .text("총 환자")
      .attr("x", 20)
      .attr("y", 250)
      .attr("fill", "#EF8000")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });

    this.secondtest4 = svgSecond
      .append("text")
      .text("총 환자")
      .attr("x", 600)
      .attr("y", 150)
      .attr("fill", "#EF8000")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });

    this.secondtest3 = svgSecond
      .append("text")
      .text("총 환자")
      .attr("x", 20)
      .attr("y", 150)
      .attr("fill", "#EF8000")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });

    this.secondtest2 = svgSecond
      .append("text")
      .text("시간 기준")
      .attr("x", 600)
      .attr("y", 50)
      .attr("fill", "#EF8000")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });

    this.secondtest1 = svgSecond
      .append("text")
      .text("코로나19 국내 발생현황")
      .attr("x", 20)
      .attr("y", 50)
      .attr("fill", "#EF8000")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });
    ///////////////////////////// SecondGroup

    // svgSecond
    //   .append("text")
    //   .text("안타")
    //   .attr("x", 1000)
    //   .attr("y", 480)
    //   .attr("fill", "#243B0B")
    //   .attr("font-family", "BMDOHYEON")
    //   .attr("font-size", function(d, i) {
    //     return "150px";
    //   });

    svgThird
      .append("text")
      .text("홈런")
      .attr("x", 1000)
      .attr("y", 480)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "150px";
      });

    svgFourth
      .append("text")
      .text("타점")
      .attr("x", 1000)
      .attr("y", 480)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "150px";
      });

    this.firstmonth = svgFirst
      .append("text")
      .attr("x", 1000)
      .attr("y", 290)
      .attr("fill", "#EF8000")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "150px";
      });

    this.secondmonth = svgSecond
      .append("text")
      .attr("x", 1000)
      .attr("y", 290)
      .attr("fill", "#240B3B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "150px";
      });
    this.thirdmonth = svgThird
      .append("text")
      .attr("x", 1000)
      .attr("y", 290)
      .attr("fill", "#240B3B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "150px";
      });
    this.fourthmonth = svgFourth
      .append("text")
      .attr("x", 1000)
      .attr("y", 290)
      .attr("fill", "#240B3B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "150px";
      });

    //svg

    // this.title1 = svgTitle
    //   .append("text")
    //   .attr("x", 110)
    //   .attr("y", 120)
    //   .attr("font-family", "BMDOHYEON")
    //   .attr("fill", "#088A4B")
    //   .attr("font-size", function(d, i) {
    //     return "120px";
    //   });

    // this.title1.text("7년 임동규");

    // this.title2 = svgTitle
    //   .append("text")
    //   .attr("x", 770)
    //   .attr("y", 120)
    //   .attr("font-family", "BMDOHYEON")
    //   .attr("fill", "#FF0000")
    //   .attr("font-size", function(d, i) {
    //     return "120px";
    //   });

    // this.title2.text("VS");

    // this.title3 = svgTitle
    //   .append("text")
    //   .attr("x", 1000)
    //   .attr("y", 120)
    //   .attr("font-family", "BMDOHYEON")
    //   .attr("fill", "#243B0B")
    //   .attr("font-size", function(d, i) {
    //     return "120px";
    //   });

    // this.title3.text("KBO");

    // this.title4 = svgTitle
    //   .append("text")
    //   .attr("x", 1460)
    //   .attr("y", 160)
    //   .attr("font-family", "BMDOHYEON")
    //   .attr("fill", "#FF0000")
    //   .attr("font-size", function(d, i) {
    //     return "170px";
    //   });

    //svg
    svgFirst
      .select(".axisXFirst")
      .call(d3.axisBottom(this.xfirst))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svgFirst
      .select(".axisXFirst2")
      .call(d3.axisBottom(this.xfirst2))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // svg
    // svgSecond
    //   .select(".axisXSecond")
    //   .call(d3.axisBottom(this.xsecond).tickFormat(d3.timeFormat("%Y-%m-%d")))
    //   .selectAll("text")
    //   .attr("transform", "translate(-10,0)rotate(-45)")
    //   .attr("stroke", "red")
    //   .style("font-size", "15px")
    //   .style("text-anchor", "end");

    svgThird
      .select(".axisXThird")
      .call(d3.axisBottom(this.xthird))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svgFourth
      .select(".axisXFourth")
      .call(d3.axisBottom(this.xfourth))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svgFifth
      .select(".axisXFifth")
      .call(d3.axisBottom(this.xfifth))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svgSixth
      .select(".axisXSixth")
      .call(d3.axisBottom(this.xsixth))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svgFirst
      .select(".axisYFirst")
      .call(d3.axisLeft(this.yfirst))
      .selectAll("text")
      .attr("dy", null);

    svgFirst
      .select(".axisYFirst2")
      .call(d3.axisLeft(this.yfirst2))
      .selectAll("text")
      .attr("dy", null);

    // svgSecond
    //   .select(".axisYSecond")
    //   .call(d3.axisLeft(this.ysecond))
    //   .selectAll("text")
    //   .attr("stroke", "red")
    //   .attr("dy", null);

    svgThird
      .select(".axisYThird")
      .call(d3.axisLeft(this.ythird))
      .selectAll("text")
      .attr("dy", null);

    svgFourth
      .select(".axisYFourth")
      .call(d3.axisLeft(this.yfourth))
      .selectAll("text")
      .attr("dy", null);

    svgFifth
      .select(".axisYFifth")
      .call(d3.axisLeft(this.yfifth))
      .selectAll("text")
      .attr("dy", null);

    svgSixth
      .select(".axisYSixth")
      .call(d3.axisLeft(this.ysixth))
      .selectAll("text")
      .attr("dy", null);
  }

  componentDidMount() {
    this.drawChart();

    //this.testgo();
    this.getSecondInfo();
    this.myInterval = setInterval(() => {
      this.countdown = this.countdown - 1;

      this.countdownview.text(this.countdown);

      if (this.countdown == 0) {
        //  this.getMainInfo();

        this.countdown = 60;
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

  async getMainInfo() {
    try {
      console.log("getMainInfo");

      const { coronadata } = await getCoronaMain();

      console.log("coronadata ----- ", coronadata);

      this.SetMainData(coronadata);
    } catch (error) {
      console.log("error", error);
    }
  }

  async getSecondInfo() {
    try {
      console.log("getSecondInfo");

      const { coronadata } = await getCoronaSecond();

      console.log("coronadata ----- ", coronadata);

      this.SetSecondData(coronadata);
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
    var countryinfo = coronadata.worldinfo;

    console.log("countryinfo", countryinfo);
    let data1 = [];
    let data2 = [];
    countryinfo.map(d => {
      //console.log("H ", t.type, t.NAME, d.NAME);
      let cnt1datajson = { name: d.CountryName, value: d.AbroadCnt1 };
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

  componentWillReceiveProps(nextProps) {
    // if (nextProps.data !== this.props.data) {
    //   this.renderBubbles(nextProps.data)
    // }
    // if (nextProps.groupByYear !== this.props.groupByYear) {
    //   this.regroupBubbles(nextProps.groupByYear)
    // }
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
    return "#FAFAFA";
  }

  getWordColor(d) {
    //console.log("getWordColor", d);
    return;
    if (d.gubun === "DEV") {
      return "#DFA13A";
    } else if (d.gubun === "QA") {
      return "#DABC12";
    } else if (d.gubun === "LOCAL") {
      return "#112345";
    }
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

    // if (graphnum === "First") this.firstmonth.text(nownum + "월");
    // else if (graphnum === "Second") this.secondmonth.text(nownum + "월");
    // else if (graphnum === "Third") this.thirdmonth.text(nownum + "월");
    // else if (graphnum === "Fourth") this.fourthmonth.text(nownum + "월");

    //let svgmove = d3.select(".mainFirst");
    d3.select(".mainFirst")
      .transition()
      .duration(1000)
      .attr("transform", "translate(-1900,0)");
    d3.select(".mainSecond")
      .transition()
      .duration(1000)
      .attr("transform", "translate(-1900,250)");
    d3.select(".mainThird")
      .transition()
      .duration(1000)
      .attr("transform", "translate(-1900,250)");
    d3.select(".mainFourth")
      .transition()
      .duration(1000)
      .attr("transform", "translate(-1900,250)");

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
      .attr("transform", "translate(150,50)");

    this.yfirst.domain(windata.map(d => d[yAxisNAME])).padding(0.1);
    this.yfirst2.domain(data2.map(d => d[yAxisNAME])).padding(0.1);

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

    var barEntersecond2 = barsecond2
      .enter()
      .insert("g", ".axisFirst2")
      .attr("class", "barFirst2")
      .attr("transform", d => {
        console.log(
          " y(d[yAxisNAME])",
          yAxisNAME,
          graphnum,
          this.yfirst2(d[yAxisNAME])
        );
        return (
          "translate(" +
          // this.graphXpos2 +
          //graphxpos +
          1050 +
          "," +
          //this.ysecond(d[this.state.yAxisAttributeMAIN]) +
          this.yfirst2(d[yAxisNAME]) +
          ")"
        );
      });

    barEntersecond
      .append("rect")
      .attr("x", this.xsecond(0))
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 0)
      .attr("height", 20) //y.bandwidth() - 30)
      .attr("fill", d => this.getColor(d))
      .attr("y", 0)
      .attr("width", 0)
      .transition(d3.transition().duration(3000))
      .attr("width", d => this.xfirst(d[xAxisName])); //d => this.xsecond(d[this.state.xAxisAttributeWin]));

    barEntersecond2
      .append("rect")
      .attr("x", this.xfirst(0))
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 0)
      .attr("height", 20) //y.bandwidth() - 30)
      .attr("fill", d => this.getColor(d))
      .attr("y", 0)
      .attr("width", 0)
      .transition(d3.transition().duration(3000))
      .attr("width", d => this.xfirst2(d[xAxisName])); //d => this.xsecond(d[this.state.xAxisAttributeWin]));

    //console.log("windata ", windata);

    var barInfoSecond = barEntersecond
      .append("text")
      .attr("x", this.xfirst(windata[windata.length - 1].value))
      //.attr("stroke", d=> getWordColor(d) )// d => getColor(d))
      //.style("fill", "#000000") //d => getWordColor(d))
      .attr("fill", "#088A4B")
      .attr("class", "barInfoFirst")
      .attr("y", 135)
      .attr("stroke-width", "0px")
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "20px";
      })
      .transition()
      .duration(1000) //interval_time)
      .text(function(d) {
        return d.name;
      })
      .attr("x", d => {
        return d => this.xfirst(d[xAxisName]) + 10;
      })
      .attr("fill-opacity", 1)
      .attr("y", 15)
      // .attr("dy", ".5em")
      .attr("text-anchor", "end");

    var barInfoSecond2 = barEntersecond2
      .append("text")
      .attr("x", this.xfirst2(data2[data2.length - 1].value))
      //.attr("stroke", d=> getWordColor(d) )// d => getColor(d))
      //.style("fill", "#000000") //d => getWordColor(d))
      .attr("fill", "#088A4B")
      .attr("class", "barInfoFirst2")
      .attr("y", 135)
      .attr("stroke-width", "0px")
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "20px";
      })
      .transition()
      .duration(1000) //interval_time)
      .text(function(d) {
        return d.name;
      })
      .attr("x", d => {
        return d => this.xfirst2(d[xAxisName]) + 10;
      })
      .attr("fill-opacity", 1)
      .attr("y", 15)
      // .attr("dy", ".5em")
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
      .duration(3000)
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
      .attr("font-size", "20px")
      .attr("class", "valueFirst")
      .attr("x", d => this.xfirst(d[xAxisName]) + 10)
      .attr("y", 15);

    barEntersecond2
      .append("text")
      .attr("x", d => this.xfirst2(data2[data2.length - 1].value))
      .attr("y", 50)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      //.attr("font-family", "Righteous")
      .attr("font-family", "BMDOHYEON")
      .attr("x", 10)
      .transition()
      .duration(3000)
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
      .attr("font-size", "20px")
      .attr("class", "valueFirst")
      .attr("x", d => this.xfirst2(d[xAxisName]) + 10)
      .attr("y", 15);

    let barUpdatesecond = barsecond
      .transition("2")
      .duration(1000)
      .ease(d3.easeLinear);

    let barUpdatesecond2 = barsecond2
      .transition("2")
      .duration(1000)
      .ease(d3.easeLinear);

    barUpdatesecond
      .select("rect")
      //.attr("y", d => y(d[yAxisNAME]))
      .attr("height", 67) //y.bandwidth() - 10)
      .duration(3000)
      .attr("width", d => this.xfirst(d[xAxisName]));

    barUpdatesecond2
      .select("rect")
      //.attr("y", d => y(d[yAxisNAME]))
      .attr("height", 67) //y.bandwidth() - 10)
      .duration(3000)
      .attr("width", d => this.xfirst2(d[xAxisName]));

    var deformat = function(val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };
    var format = ",.0f";

    // if (graphnum === "First") {
    //   format = ",.3f";
    // }

    if (graphnum === "Third" || graphnum === "Sixth") {
      format = ",.0f";
    }

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
      .duration(3000)
      .attr("x", d => this.xfirst(d[xAxisName]) + 10);

    barUpdatesecond2
      .select(".valueFirst2")
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
      .duration(3000)
      .attr("x", d => this.xfirst2(d[xAxisName]) + 10);

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

    barUpdatesecond2.attr("transform", d => {
      return (
        "translate(" +
        ///this.graphXpos2 +
        1050 +
        "," +
        this.yfirst2(d[yAxisNAME]) +
        ")"
      );
    });

    var barExit = barsecond
      .exit()
      .attr("fill-opacity", 1)
      .transition()
      .duration(1000);

    var barExit2 = barsecond2
      .exit()
      .attr("fill-opacity", 1)
      .transition()
      .duration(1000);

    barExit.attr("transform", function(d) {
      return "translate(-5000," + "0" + ")";
    });

    barExit2.attr("transform", function(d) {
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
    console.log("secondset ", graphnum, windata);

    // if (graphnum === "First") this.firstmonth.text(nownum + "월");
    // else if (graphnum === "Second") this.secondmonth.text(nownum + "월");
    // else if (graphnum === "Third") this.thirdmonth.text(nownum + "월");
    // else if (graphnum === "Fourth") this.fourthmonth.text(nownum + "월");

    //let svgmove = d3.select(".mainFirst");
    d3.select(".mainFirst")
      .transition()
      .duration(1000)
      .attr("transform", "translate(-1900,0)");

    let svgSecond = d3.select(".mainSecond");
    svgSecond
      .transition()
      .duration(1000)
      .attr("transform", "translate(-1900,250)");

    d3.select(".mainThird")
      .transition()
      .duration(1000)
      .attr("transform", "translate(-1900,250)");
    d3.select(".mainFourth")
      .transition()
      .duration(1000)
      .attr("transform", "translate(-1900,250)");

    var text1 =
      maininfo.koreamonth +
      "월 " +
      maininfo.koreaday +
      "일 " +
      maininfo.koreahour +
      "시 기준";

    var text2 = "확진환자  : " + maininfo.koreacnt1 + " 명";
    var text3 = "격리해제 : " + maininfo.koreacnt2 + " 명";
    var text4 = "사망자 : " + maininfo.koreacnt3 + " 명";
    var text5 = "검사진행 : " + maininfo.koreacnt4 + " 명";

    this.secondtest2.text(text1);
    this.secondtest3.text(text2);
    this.secondtest4.text(text3);
    this.secondtest5.text(text4);
    this.secondtest6.text(text5);

    let svg = d3.select(".main" + graphnum);
    svg
      .transition()
      .duration(1000)
      .attr("transform", "translate(0,0)");

    console.log("secondgroup : windata ", windata);
    console.log("secondgroup : data2 ", data2);

    //this.ysecond.domain(windata.map(d => d[yAxisNAME])); //.padding(0.1);

    this.xsecond = d3
      .scaleTime()
      //.scaleLinear()
      .range([0, 1800]);
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
      .attr("transform", "translate(-10,0)rotate(-45)")
      .attr("stroke", "#FAFAFA")
      .style("font-size", "25px")
      .style("text-anchor", "end");

    svgSecond
      .select(".axisYSecond")
      .call(d3.axisLeft(this.ysecond))
      .selectAll("text")
      .attr("stroke", "#FAFAFA")
      .attr("dy", null);

    //this.xsecond.domain([timemin, timemax]); //.padding(0.1);
    //this.xsecond.domain([new Date(2000, 01, 01), new Date(2005, 01, 01)]); //.padding(0.1);

    //this.yfirst2.domain(data2.map(d => d[yAxisNAME])).padding(0.1);

    let barsecond = svg.selectAll(".bar" + graphnum).data(windata, function(d) {
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
          this.xsecond(new Date(d["name"])) +
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
      .attr("font-size", "20px")
      .attr("class", "value" + graphnum + "data2")
      .attr("text-anchor", "end")
      .attr("x", -50)
      .attr("y", -0);

    var line = d3
      .line()
      .x(d => {
        return this.xsecond(new Date(d.name));
      })
      .y(d => {
        return this.ysecond(d.value);
      });

    // let pathsecond = svg.selectAll(".path" + graphnum).data(data2, function(d) {
    //   return d.name;
    // });

    // var newline = line(data2);

    // console.log("newline", newline);

    // pathsecond
    //   .enter()
    //   .insert("path")
    //   .attr("class", "path" + graphnum)
    //   .attr("d", line(data2))
    //   .attr("transform", "translate(30,10)");

    //   .line
    let linesecond = svg.append("path").attr("class", "linesecond");

    linesecond
      .attr("d", line(data2))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("transform", "translate(0,0)");

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
          this.xsecond(new Date(d["name"])) +
          "," +
          this.ysecond(d["value"]) +
          ")"
        );
      });

    // var barEntersecond2 = barsecond2
    //   .enter()
    //   .insert("g", ".axis" + graphnum + "2")
    //   .attr("class", "bar" + graphnum + "2")
    //   .attr("transform", d => {
    //     console.log(
    //       " y(d[yAxisNAME])",
    //       yAxisNAME,
    //       graphnum,
    //       this.ysecond2(d[yAxisNAME])
    //     );
    //     return (
    //       "translate(" +
    //       // this.graphXpos2 +
    //       //graphxpos +
    //       1050 +
    //       "," +
    //       //this.ysecond(d[this.state.yAxisAttributeMAIN]) +
    //       this.ysecond2(d[yAxisNAME]) +
    //       ")"
    //     );
    //   });
    barEntersecond
      .append("rect")
      .attr("x", d => this.xsecond(d["name"]))
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 0)
      //.attr("height", 20) //y.bandwidth() - 30)
      .attr("fill", d => this.getColor(d))
      .attr("y", 0)
      .attr("width", 20)
      .transition(d3.transition().duration(3000))
      .attr("height", d => 1000 - this.ysecond(d["value"])); // 시발 왜 1000 이야
    //console.log(" ysecond value ", this.ysecond(d["value"]));
    //d => this.xsecond(d[this.state.xAxisAttributeWin]));
    ///.attr("width", d => this.xsecond(d[xAxisName])); //d => this.xsecond(d[this.state.xAxisAttributeWin]));

    // barEntersecond2
    //   .append("rect")
    //   .attr("x", this.xsecond(0))
    //   //.attr("y", d => y(d[this.state.yAxisAttribute]))
    //   .attr("width", 0)
    //   .attr("height", 20) //y.bandwidth() - 30)
    //   .attr("fill", d => this.getColor(d))
    //   .attr("y", 0)
    //   .attr("width", 0)
    //   .transition(d3.transition().duration(3000))
    //   .attr("width", d => this.xsecond2(d[xAxisName])); //d => this.xsecond(d[this.state.xAxisAttributeWin]));

    var barInfoSecond = barEntersecond
      .append("text")
      .attr("x", this.xsecond(windata[windata.length - 1].value))
      //.attr("stroke", d=> getWordColor(d) )// d => getColor(d))
      //.style("fill", "#000000") //d => getWordColor(d))
      .attr("fill", "#EF8000")
      .attr("class", "barInfo" + graphnum)
      .attr("y", 135)
      .attr("stroke-width", "0px")
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "30px";
      })
      .transition()
      .duration(1000) //interval_time)
      .text(function(d) {
        return d.value;
      })
      // .attr("x", d => {
      //   return d => this.xsecond(d[xAxisName]) + 120;
      // })
      .attr("fill-opacity", 1)
      .attr("x", 30)
      .attr("y", -10)
      .attr("text-anchor", "end");

    // var barInfoSecond2 = barEntersecond2
    //   .append("text")
    //   .attr("x", this.xsecond2(data2[data2.length - 1].value))
    //   //.attr("stroke", d=> getWordColor(d) )// d => getColor(d))
    //   //.style("fill", "#000000") //d => getWordColor(d))
    //   .attr("fill", "#EF8000")
    //   .attr("class", "barInfo" + graphnum + "2")
    //   .attr("y", 135)
    //   .attr("stroke-width", "0px")
    //   .attr("fill-opacity", 0)
    //   .attr("font-family", "BMDOHYEON")
    //   .attr("font-size", function(d, i) {
    //     return "20px";
    //   })
    //   .transition()
    //   .duration(1000) //interval_time)
    //   .text(function(d) {
    //     return d.name;
    //   })
    //   .attr("x", d => {
    //     return d => this.xsecond2(d[xAxisName]) + 10;
    //   })
    //   .attr("fill-opacity", 1)
    //   .attr("y", 15)
    //   // .attr("dy", ".5em")
    //   .attr("text-anchor", "end");

    // value
    barEntersecond
      .append("text")
      .attr("x", d => this.xsecond(windata[windata.length - 1].value))
      .attr("y", 50)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      //.attr("font-family", "Righteous")
      .attr("font-family", "BMDOHYEON")
      .attr("x", 10)
      .transition()
      .duration(3000)
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
      .attr("font-size", "20px")
      .attr("class", "value" + graphnum)
      .attr("x", d => this.xsecond(d[xAxisName]) + 10)
      .attr("y", 15);

    // barEntersecond2
    //   .append("text")
    //   .attr("x", d => this.xsecond2(data2[data2.length - 1].value))
    //   .attr("y", 50)
    //   .style("fill", d => this.getColor(d))
    //   .attr("fill-opacity", 0)
    //   //.attr("font-family", "Righteous")
    //   .attr("font-family", "BMDOHYEON")
    //   .attr("x", 10)
    //   .transition()
    //   .duration(3000)
    //   .tween("text", function(d) {
    //     var self = this;
    //     // var i = d3.interpolate(self.textContent, Number(d.W));

    //     var i = d3.interpolate(deformat(self.textContent, ""), Number(d.value));

    //     var prec = (Number(d.value) + "").split("."),
    //       round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

    //     return function(t) {
    //       self.textContent =
    //         d3.format(format)(Math.round(i(t) * round) / round) + "";
    //     };
    //   })
    //   .attr("fill-opacity", 1)
    //   .attr("y", 0)
    //   .attr("font-size", "20px")
    //   .attr("class", "value" + graphnum)
    //   .attr("x", d => this.xsecond2(d[xAxisName]) + 10)
    //   .attr("y", 15);

    let barUpdatesecond = barsecond
      .transition("2")
      .duration(1000)
      .ease(d3.easeLinear);

    // let barUpdatesecond2 = barsecond2
    //   .transition("2")
    //   .duration(1000)
    //   .ease(d3.easeLinear);

    barUpdatesecond
      .select("rect")
      //.attr("y", d => y(d[yAxisNAME]))
      .attr("height", 67) //y.bandwidth() - 10)
      .duration(3000)
      .attr("width", d => this.xsecond(d[xAxisName]));

    // barUpdatesecond2
    //   .select("rect")
    //   //.attr("y", d => y(d[yAxisNAME]))
    //   .attr("height", 67) //y.bandwidth() - 10)
    //   .duration(3000)
    //   .attr("width", d => this.xsecond2(d[xAxisName]));

    var deformat = function(val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };
    var format = ",.0f";

    // if (graphnum === "First") {
    //   format = ",.3f";
    // }

    if (graphnum === "Third" || graphnum === "Sixth") {
      format = ",.0f";
    }

    barUpdatesecond
      .select(".value" + graphnum)
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
      .duration(3000)
      .attr("x", d => this.xsecond(d[xAxisName]) + 10);

    // barUpdatesecond2
    //   .select(".value" + graphnum + "2")
    //   .tween("text", function(d) {
    //     var self = this;
    //     var i = d3.interpolate(deformat(self.textContent, ""), Number(d.value));
    //     var prec = (Number(d.value) + "").split("."),
    //       round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

    //     return function(t) {
    //       self.textContent =
    //         d3.format(format)(Math.round(i(t) * round) / round) + "";
    //     };
    //   })
    //   .duration(3000)
    //   .attr("x", d => this.xsecond2(d[xAxisName]) + 10);

    barUpdatesecond.attr("transform", d => {
      return (
        "translate(" +
        ///this.graphXpos2 +
        0 +
        "," +
        this.ysecond(d[yAxisNAME]) +
        ")"
      );
    });

    // barUpdatesecond2.attr("transform", d => {
    //   return (
    //     "translate(" +
    //     ///this.graphXpos2 +
    //     1050 +
    //     "," +
    //     this.ysecond2(d[yAxisNAME]) +
    //     ")"
    //   );
    // });

    var barExit = barsecond
      .exit()
      .attr("fill-opacity", 1)
      .transition()
      .duration(1000);

    // var barExit2 = barsecond2
    //   .exit()
    //   .attr("fill-opacity", 1)
    //   .transition()
    //   .duration(1000);

    barExit.attr("transform", function(d) {
      return "translate(-5000," + "0" + ")";
    });

    // barExit2.attr("transform", function(d) {
    //   return "translate(-5000," + "0" + ")";
    // });
  }
  /////////////////////////////////////////SecondGroup
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
            <g className="mainFirst" transform={`translate( -1900,0)`}>
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
            <g className="mainSecond" transform={`translate( -1900,${mainy1})`}>
              <g className="axisXSecond" transform={`translate(50,1000)`}></g>
              <g className="axisYSecond" transform={`translate(50,0)`}></g>
            </g>
            <g className="mainThird" transform={`translate( -1900,${mainy1})`}>
              <g
                className="axisXThird"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYThird"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g className="mainFourth" transform={`translate( -1900,${mainy1})`}>
              <g
                className="axisXFourth"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYFourth"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
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
