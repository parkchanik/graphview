import React, { Component } from "react";
import * as d3 from "d3";
//import geojson from "./geojson.json";
//import geojson from "./TL_SCCO_CTPRVN.json";
//import geojson from "./TL_SCCO_SIG.json";

//import { geoMercator, geoPath } from "d3-geo";
//import { select } from "d3-selection";
import "./BarGraphHistoryRKY.css";

//import csvdata from "./readmelocal.csv";
//import ryukimyangcsv from "./ryukimyang.csv";
//import ryukimyangcsv from "./data/limdong.csv";
import ryukimyangcsv from "./data/ryukimyangYear.csv";
//import typelist from "./data/KINGLIST.csv";
export class BarGraphHistoryRKY extends Component {
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
    //this.ToFloat = this.ToFloat.bind(this);
    this.yAxisNAME = "name";
    this.xAxisWIN = "W";
    this.xAxisIP = "IP";

    this.margin = { top: 120, right: 30, bottom: 40, left: 90 };

    this.xfirst = d3
      .scaleLinear()
      .range([0, 1000])
      .domain([0, 10]); // this.state.width]);

    this.yfirst = d3
      .scaleBand()
      .range([0, 250])
      .padding(0.1); // this.state.height]);

    this.xsecond = d3
      .scaleLinear()
      .range([0, 600])
      .domain([0, 15]); // this.state.width]);

    this.ysecond = d3
      .scaleBand()
      .range([0, 250])
      .padding(0.1); // this.state.height]);

    this.xthird = d3
      .scaleLinear()
      .range([0, 600])
      .domain([0, 25]); // this.state.width]);

    this.ythird = d3
      .scaleBand()
      .range([0, 250])
      .padding(0.1); // this.state.height]);

    this.xfourth = d3
      .scaleLinear()
      .range([0, 600])
      .domain([0, 200]); // this.state.width]);

    this.yfourth = d3
      .scaleBand()
      .range([0, 250])
      .padding(0.1); // this.state.height]);

    this.xfifth = d3
      .scaleLinear()
      .range([0, 600])
      .domain([0, 300]); // this.state.width]);

    this.yfifth = d3
      .scaleBand()
      .range([0, 250])
      .padding(0.1); // this.state.height]);

    this.xsixth = d3
      .scaleLinear()
      .range([0, 600])
      .domain([0, 100]); // this.state.width]);

    this.ysixth = d3
      .scaleBand()
      .range([0, 250])
      .padding(0.1); // this.state.height]);

    this.graphXpos1 = 0;
    this.graphXpos2 = 700;
    this.graphXpos3 = 1400;

    this.graphYpos1 = 600;

    this.graphXyposLine1 = 250;
    this.graphXyposLine2 = 900;
    //let graph1Xpos = 0;
    // let graph2Xpos = 700;

    this.graphpositionzero = 0;

    this.currentdate = new Date("2019-01");

    this.currentnum = 2006;

    this.alldata = [];
    this.typedata = [];

    this.title1 = null;
    this.title2 = null;
    this.title3 = null;
    this.month = null;

    this.firstmonth = null;
    this.secondmonth = null;
    this.thirdmonth = null;
    this.fourthmonth = null;
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

    svgFirst
      .append("text")
      .text("연봉 ( 단위 : 억 )")
      .attr("x", 150)
      .attr("y", -10)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });
    svgSecond
      .append("text")
      .text("방어율")
      .attr("x", 150)
      .attr("y", -10)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });

    svgThird
      .append("text")
      .text("승리")
      .attr("x", 150)
      .attr("y", -10)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });

    svgFourth
      .append("text")
      .text("삼진")
      .attr("x", 150)
      .attr("y", -10)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });

    svgFifth
      .append("text")
      .text("이닝")
      .attr("x", 150)
      .attr("y", -10)
      .attr("fill", "#243B0B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      });

    this.firstmonth = svgFirst
      .append("text")
      .attr("x", 1000)
      .attr("y", 290)
      .attr("fill", "#240B3B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "10px";
      });

    this.secondmonth = svgSecond
      .append("text")
      .attr("x", 100)
      .attr("y", 100)
      .attr("fill", "#240B3B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "150px";
      });
    this.thirdmonth = svgThird
      .append("text")
      .attr("x", 100)
      .attr("y", 100)
      .attr("fill", "#240B3B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "150px";
      });
    this.fourthmonth = svgFourth
      .append("text")
      .attr("x", 100)
      .attr("y", 100)
      .attr("fill", "#240B3B")
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "150px";
      });

    //svg
    this.month = svgTitle
      .append("text")
      .attr("x", 1400)
      .attr("y", 250)
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "150px";
      });

    this.title1 = svgTitle
      .append("text")
      .attr("x", 90)
      .attr("y", 120)
      .attr("font-family", "BMDOHYEON")
      .attr("fill", "#088A4B")
      .attr("font-size", function(d, i) {
        return "120px";
      });

    //this.title1.text("드림즈 앤디고든");

    this.title2 = svgTitle
      .append("text")
      .attr("x", 1030)
      .attr("y", 120)
      .attr("font-family", "BMDOHYEON")
      .attr("fill", "#FF0000")
      .attr("font-size", function(d, i) {
        return "120px";
      });

    //this.title2.text("VS");

    this.title3 = svgTitle
      .append("text")
      .attr("x", 1320)
      .attr("y", 120)
      .attr("font-family", "BMDOHYEON")
      .attr("fill", "#243B0B")
      .attr("font-size", function(d, i) {
        return "120px";
      });

    //this.title3.text("KBO 용병");
    //svg
    svgFirst
      .select(".axisXFirst")
      .call(d3.axisBottom(this.xfirst))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // svg
    svgSecond
      .select(".axisXSecond")
      .call(d3.axisBottom(this.xsecond))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

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

    svgSecond
      .select(".axisYSecond")
      .call(d3.axisLeft(this.ysecond))
      .selectAll("text")
      .attr("dy", null);

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

    //let timter = setInterval(() => {
    //  this.getQueryServerInfo();
    // this.SetData();
    //}, 2000);
    //this.SetData();
    this.dataFromTSV();
    // setTimeout(
    //   function() {
    //     this.SetData();
    //   }.bind(this),
    //   2000
    // );
  }

  componentWillMount() {
    //this.dataFromTSV();
  }

  dataFromTSV(path) {
    path = path || "data.tsv";
    console.log(path);

    d3.csv(ryukimyangcsv).then(data => {
      console.log("dataFromTSV data", data);
      this.alldata = data;
      //this.typedata = typedata;
      this.SetData();
      // d3.csv(typelist).then(typedata => {
      //   this.alldata = data;
      //   this.typedata = typedata;
      //   this.SetData();
      // });
      //this.setState({ alldata: data });
      //this.alldata = data;
      //this.SetData();
    });
  }

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

    var nowdata = [];
    let data1 = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    let data5 = [];
    alldata.map(d => {
      //console.log("ddddddddddddd", new Date(d.date));
      //console.log("nowdate :", nowdate);
      //console.log("d.YEAR ---- ", d.YEAR, nownum);
      //if (d.YEAR == nowdatestring) {
      //console.log("d.MONTH === nownum  : ", d.MONTH, nownum, d);
      if (d.YEAR === nownum.toString()) {
        console.log("d.YEAR === nownum  : ", d.YEAR, d);
        nowdata.push(d);

        let erajsondata = { name: d.NAME, gubun: d.TEAM, value: d.ERA };
        let wjsondata = { name: d.NAME, gubun: d.TEAM, value: d.W };
        let ljsondata = { name: d.NAME, gubun: d.TEAM, value: d.SO };
        let ipjsondata = { name: d.NAME, gubun: d.TEAM, value: d.IP };
        let payjsondata = { name: d.NAME, gubun: d.TEAM, value: d.PAY };

        data1.push(payjsondata);
        data2.push(erajsondata);
        data3.push(wjsondata);
        data4.push(ljsondata);
        data5.push(ipjsondata);
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
        return Number(a.value) - Number(b.value);
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

    data5.sort(function(a, b) {
      if (Number(a.value) == Number(b.value)) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        return Number(b.value) - Number(a.value);
      }
    });

    this.month
      .transition()
      .duration(500)
      .attr("x", 2000)
      .attr("y", 250)
      .transition()
      .duration(500)
      .text(nownum)
      .attr("x", 1400)
      .attr("y", 250);
    //this.month.text(nownum);

    var max_number = 11;
    data1 = data1.slice(0, max_number);
    data2 = data2.slice(0, max_number);
    data3 = data3.slice(0, max_number);
    data4 = data4.slice(0, max_number);
    setTimeout(
      function() {
        this.SecondSet(
          nownum,
          data1,
          this.xfirst,
          this.yfirst,
          "First",
          this.yAxisNAME,
          "value",
          this.graphXpos1
        );
      }.bind(this),
      1000
    );
    setTimeout(
      function() {
        this.SecondSet(
          nownum,
          data2,
          this.xsecond,
          this.ysecond,
          "Second",
          this.yAxisNAME,
          "value",
          //this.xAxisWIN,
          this.graphXpos1
        );
      }.bind(this),
      2500
    );

    setTimeout(
      function() {
        this.SecondSet(
          nownum,
          data3,
          this.xthird,
          this.ythird,
          "Third",
          this.yAxisNAME,
          "value",
          this.graphXpos1
        );
      }.bind(this),
      4000
    );

    setTimeout(
      function() {
        this.SecondSet(
          nownum,
          data4,
          this.xfourth,
          this.yfourth,
          "Fourth",
          this.yAxisNAME,
          "value",
          this.graphXpos1
        );
      }.bind(this),
      5500
    );

    setTimeout(
      function() {
        this.SecondSet(
          nownum,
          data5,
          this.xfifth,
          this.yfifth,
          "Fifth",
          this.yAxisNAME,
          "value",
          this.graphXpos1
        );
      }.bind(this),
      7000
    );

    console.log("nownum ::::: ", nownum);
    if (nownum >= 2019) {
      return;
    }

    this.currentnum = nownum + 1;

    setTimeout(
      function() {
        this.SetData();
      }.bind(this),
      9000
    );
  }

  ToFloat(number) {
    var tmp = number + "";

    if (tmp.indexOf(".") != -1) {
      number = number.toFixed(4);

      number = number.replace(/(0+$)/, "");
    }

    return number;
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
    //console.log("getColor", d);

    // var color = {
    //   키움: "#820024",
    //   넥센: "#820024",
    //   우리: "#820024",
    //   히어로즈: "#820024",
    //   두산: "#131230",
    //   OB: "#131230",
    //   롯데: "#002856",
    //   삼성: "#074CA1",
    //   한화: "#ff6600",
    //   빙그레: "#ff6600",
    //   KIA: "#f01e23",
    //   해태: "#C70125",
    //   LG: "#000000",
    //   SK: "#EF8000",
    //   NC: "#AF917B",
    //   쌍방울: "#ffcc00",
    //   현대: "#009900",
    //   삼미: "#88B7E1",
    //   청보: "#005284",
    //   태평양: "#b4b4b4",
    //   MBC: "#224488",
    //   KT: "#202030"
    // };

    if (d.gubun === "키움") {
      return "#820024";
    } else if (d.gubun === "넥센") {
      return "#820024";
    } else if (d.gubun === "두산") {
      return "#131230";
    } else if (d.gubun === "롯데") {
      return "#002856";
    } else if (d.gubun === "삼성") {
      return "#074CA1";
    } else if (d.gubun === "한화") {
      return "#FF8C00";
    } else if (d.gubun === "KIA") {
      return "#FF0000 ";
    } else if (d.gubun === "LG") {
      return "#000000";
    } else if (d.gubun === "SK") {
      return "#1E3466";
    } else if (d.gubun === "NC") {
      return "#AF917B";
    } else if (d.gubun === "KT") {
      return "#202030";
    } else if (d.gubun === "드림즈") {
      return "#088A4B";
    } else if (d.gubun === "LA") {
      return "#1E90FF";
    }
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

  SecondSet(nownum, windata, x, y, graphnum, yAxisNAME, xAxisName, graphxpos) {
    console.log("secondset ", graphnum, windata);

    // if (graphnum === "First") this.firstmonth.text(nownum + "");
    // else if (graphnum === "Second") this.secondmonth.text(nownum + "");
    // else if (graphnum === "Third") this.thirdmonth.text(nownum + "");
    // else if (graphnum === "Fourth") this.fourthmonth.text(nownum + "");
    if (graphnum === "First") {
      var paymax = d3.max(
        windata.map(function(d) {
          return Number(d.value);
        })
      );

      this.xfirst.domain([0, Number(paymax) + 5]);

      console.log("paymax", paymax);
      let svgFirst = d3.select(".mainFirst");

      svgFirst
        .select(".axisXFirst")
        .transition()
        .duration(1000) //baseTime * interval_time)
        .ease(d3.easeLinear)
        .call(d3.axisBottom(this.xfirst))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // xAxisG
      //   .transition()
      //   .duration(1000)//baseTime * interval_time)
      //   .ease(d3.easeLinear)
      //   .call(xAxis);

      //if (paymax > 100) {
      // this.xfirst.domain([0, Number(paymax) + 10]);
      //}
    }

    //let svgmove = d3.select(".mainFirst");
    // d3.select(".mainFirst")
    //   .transition()
    //   .duration(1000)
    //   .attr("transform", "translate(-1900,250)");
    // d3.select(".mainSecond")
    //   .transition()
    //   .duration(1000)
    //   .attr("transform", "translate(-1900,250)");
    // d3.select(".mainThird")
    //   .transition()
    //   .duration(1000)
    //   .attr("transform", "translate(-1900,250)");
    // d3.select(".mainFourth")
    //   .transition()
    //   .duration(1000)
    //   .attr("transform", "translate(-1900,250)");

    let svg = d3.select(".main" + graphnum);
    // svg
    //   .transition()
    //   .duration(1000)
    //   .attr("transform", "translate(450,250)");

    y.domain(windata.map(d => d[yAxisNAME])).padding(0.1);

    let barsecond = svg.selectAll(".bar" + graphnum).data(windata, function(d) {
      return d.name;
    });

    var barEntersecond = barsecond
      .enter()
      .insert("g", ".axis" + graphnum)
      .attr("class", "bar" + graphnum)
      .attr("transform", d => {
        // console.log(" y(d[yAxisNAME])", yAxisNAME, graphnum, y(d[yAxisNAME]));
        return (
          "translate(" +
          // this.graphXpos2 +
          graphxpos +
          "," +
          //this.ysecond(d[this.state.yAxisAttributeMAIN]) +
          y(d[yAxisNAME]) +
          ")"
        );
      });

    barEntersecond
      .append("rect")
      .attr("x", this.xsecond(0))
      .attr("class", "rect" + graphnum)
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 0)
      .attr("height", 67) //y.bandwidth() - 30)
      .attr("fill", d => this.getColor(d))
      .attr("y", 0)
      .attr("width", 0)
      .transition(d3.transition().duration(1000))
      .attr("width", d => x(d[xAxisName])); //d => this.xsecond(d[this.state.xAxisAttributeWin]));

    //console.log("windata ", windata);

    var barInfoSecond = barEntersecond
      .append("text")
      .attr("x", x(windata[windata.length - 1].value))
      //.attr("stroke", d=> getWordColor(d) )// d => getColor(d))
      //.style("fill", "#000000") //d => getWordColor(d))
      .attr("fill", function(d) {
        if (d.NAME === "앤디고든") {
          return "#088A4B";
        } else {
          return "#243B0B";
        }
      })
      .attr("class", "barInfo" + graphnum)
      .attr("y", 135)
      .attr("stroke-width", "0px")
      .attr("fill-opacity", 0)
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "50px";
      })
      .transition()
      .duration(1000) //interval_time)
      .text(function(d) {
        return d.gubun + " " + d.name;
      })
      .attr("x", d => {
        return d => x(d[xAxisName]) + 10;
      })
      .attr("fill-opacity", 1)
      .attr("y", 19)
      .attr("dy", ".5em")
      .attr("text-anchor", "end");

    // value
    barEntersecond
      .append("text")
      .attr("x", d => x(windata[windata.length - 1].value))
      .attr("y", 50)
      .style("fill", d => this.getColor(d))
      .attr("fill-opacity", 0)
      //.attr("font-family", "Righteous")
      .attr("font-family", "BMDOHYEON")
      .attr("x", 10)
      .transition()
      .duration(1000)
      .tween("text", function(d) {
        var self = this;
        // var i = d3.interpolate(self.textContent, Number(d.W));
        //this.ToFloat(
        var i = d3.interpolate(deformat(self.textContent, ""), Number(d.value));

        var prec = (Number(d.value) + "").split("."),
          round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

        return function(t) {
          self.textContent =
            d3.format(format)(Math.round(i(t) * round) / round) + "";
        };
      })

      // .text(function(d) {
      //   return d.value;
      // })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "50px")
      .attr("class", "value" + graphnum)
      .attr("x", d => x(d[xAxisName]) + 10)
      .attr("y", 45);

    let barUpdatesecond = barsecond
      .transition("2")
      .duration(1000)
      .ease(d3.easeLinear);

    barUpdatesecond
      .select("rect")
      //.attr("y", d => y(d[yAxisNAME]))
      .attr("height", 67) //y.bandwidth() - 10)
      .duration(1000)
      .attr("fill", d => this.getColor(d))
      .attr("width", d => x(d[xAxisName]));

    var deformat = function(val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };
    var format = ",.0f";

    if (graphnum === "First" || graphnum === "Second") {
      format = ",.2f";
    }

    // if (graphnum === "Fourth") {
    //   format = ",.3f";
    // }

    if (graphnum === "Fifth") {
      format = ",.1f";
    }

    barUpdatesecond.select(".barInfo" + graphnum).text(function(d) {
      return d.gubun + " " + d.name;
    });

    barUpdatesecond
      .select(".value" + graphnum)
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
      .duration(1000)
      .style("fill", d => this.getColor(d))
      .attr("x", d => x(d[xAxisName]) + 10);

    barUpdatesecond.attr("transform", d => {
      return (
        "translate(" +
        ///this.graphXpos2 +
        graphxpos +
        "," +
        y(d[yAxisNAME]) +
        ")"
      );
    });

    var barExit = barsecond
      .exit()
      .attr("fill-opacity", 1)
      .transition()
      .duration(1000);

    barExit.attr("transform", function(d) {
      return "translate(-5000," + "0" + ")";
    });
  }

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
    let mainy1 = 250;
    let mainy2 = 1900;
    return (
      <div
        style={{
          backgroundColor: "#F1EFF1"
        }}
      >
        <div className="rowChart">
          <svg
            //width={width + this.margin.left + this.margin.right}
            width={2550}
            //height={height + this.margin.top + this.margin.bottom}
            height={1450}
          >
            <g className="mainTitle" transform={`translate( 0,0)`}></g>
            <g className="mainFirst" transform={`translate( 200,100)`}>
              <g
                className="axisXFirst"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYFirst"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g className="mainSecond" transform={`translate( 200,450)`}>
              <g
                className="axisXSecond"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYSecond"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g className="mainThird" transform={`translate( 1100,450)`}>
              <g
                className="axisXThird"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYThird"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g className="mainFourth" transform={`translate( 200,800)`}>
              <g
                className="axisXFourth"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYFourth"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g className="mainFifth" transform={`translate( 1100,800)`}>
              <g
                className="axisXFifth"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYFifth"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
          </svg>
        </div>
      </div>
    );
  }
}
