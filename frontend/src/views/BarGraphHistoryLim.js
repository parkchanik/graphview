import React, { Component } from "react";
import * as d3 from "d3";
//import geojson from "./geojson.json";
//import geojson from "./TL_SCCO_CTPRVN.json";
//import geojson from "./TL_SCCO_SIG.json";

//import { geoMercator, geoPath } from "d3-geo";
//import { select } from "d3-selection";
import "./bargraphhistory.css";

//import csvdata from "./readmelocal.csv";
//import ryukimyangcsv from "./ryukimyang.csv";
import ryukimyangcsv from "./data/limdong.csv";
export class BarGraphHistoryLim extends Component {
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
      .range([0, 800])
      .domain([0, 1]); // this.state.width]);

    this.yfirst = d3
      .scaleBand()
      .range([0, 800])
      .padding(0.1); // this.state.height]);

    this.xsecond = d3
      .scaleLinear()
      .range([0, 800])
      .domain([0, 100]); // this.state.width]);

    this.ysecond = d3
      .scaleBand()
      .range([0, 600])
      .padding(0.1); // this.state.height]);

    this.xthird = d3
      .scaleLinear()
      .range([0, 800])
      .domain([0, 50]); // this.state.width]);

    this.ythird = d3
      .scaleBand()
      .range([0, 600])
      .padding(0.1); // this.state.height]);

    this.xfourth = d3
      .scaleLinear()
      .range([0, 800])
      .domain([0, 150]); // this.state.width]);

    this.yfourth = d3
      .scaleBand()
      .range([0, 600])
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

    this.graphXyposLine1 = 800;
    this.graphXyposLine2 = 900;
    //let graph1Xpos = 0;
    // let graph2Xpos = 700;

    this.graphpositionzero = 0;

    this.currentdate = new Date("2019-01");

    this.currentnum = 3;

    this.alldata = [];

    this.title = null;
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

    //svg
    this.title = svgTitle
      .append("text")
      .text("text111111111111111111111111111")
      .attr("x", 500)
      .attr("y", 100)
      .attr("font-family", "BMDOHYEON")
      .attr("font-size", function(d, i) {
        return "30px";
      });

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
      this.setState({ alldata: data });
      this.alldata = data;
      this.SetData();
    });
  }

  SetData() {
    //onst { config, alldata, data, currentdata, currentdate } = this.state;

    const alldata = this.alldata;
    console.log("SetData Start");
    console.log("SetData alldatat ", alldata);

    // var nowdate = currentdate;
    var nowdate = this.currentdate;

    var nownum = this.currentnum;

    this.title.text(nownum);

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
      if (d.MONTH === nownum.toString()) {
        // console.log("d.MONTH === nownum  : ", d.MONTH, d);
        nowdata.push(d);

        let avgjsondata = { name: d.NAME, gubun: d.TEAM, value: d.AVG };
        data1.push(avgjsondata);

        let hjsondata = { name: d.NAME, gubun: d.TEAM, value: d.H };
        data2.push(hjsondata);

        let hrjsondata = { name: d.NAME, gubun: d.TEAM, value: d.HR };
        data3.push(hrjsondata);

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

    var max_number = 15;
    data1 = data1.slice(0, max_number);
    data2 = data2.slice(0, max_number);
    data3 = data3.slice(0, max_number);
    data4 = data4.slice(0, max_number);

    //this.currentnum = nownum + 1;

    this.SecondSet(
      data1,
      this.xfirst,
      this.yfirst,
      "First",
      this.yAxisNAME,
      "value",
      this.graphXpos1
    );

    setTimeout(
      function() {
        this.SecondSet(
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
      1000
    );

    setTimeout(
      function() {
        this.SecondSet(
          data3,
          this.xthird,
          this.ythird,
          "Third",
          this.yAxisNAME,
          "value",
          this.graphXpos1
        );
      }.bind(this),
      2000
    );

    setTimeout(
      function() {
        this.SecondSet(
          data4,
          this.xfourth,
          this.yfourth,
          "Fourth",
          this.yAxisNAME,
          "value",
          this.graphXpos1
        );
      }.bind(this),
      3000
    );

    console.log("nownum ::::: ", nownum);
    if (nownum >= 10) {
      return;
    }

    this.currentnum = nownum + 1;

    setTimeout(
      function() {
        this.SetData();
      }.bind(this),
      4000
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
    //console.log("getColor", d);

    if (d.gubun === "DEV") {
      return "#DFA13A";
    } else if (d.gubun === "QA") {
      return "#DABC12";
    } else if (d.gubun === "LOCAL") {
      return "#112345";
    }
  }

  getWordColor(d) {
    //console.log("getWordColor", d);
    if (d.gubun === "DEV") {
      return "#DFA13A";
    } else if (d.gubun === "QA") {
      return "#DABC12";
    } else if (d.gubun === "LOCAL") {
      return "#112345";
    }
  }

  SecondSet(windata, x, y, graphnum, yAxisNAME, xAxisName, graphxpos) {
    console.log("secondset ", graphnum, windata);

    let svg = d3.select(".main" + graphnum);

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
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 0)
      .attr("height", 50) //y.bandwidth() - 30)
      .attr("fill", d => this.getColor(d))
      .attr("y", 0)
      .transition(d3.transition().duration(1000))
      .attr("width", d => x(d[xAxisName])); //d => this.xsecond(d[this.state.xAxisAttributeWin]));

    //console.log("windata ", windata);

    var barInfoSecond = barEntersecond
      .append("text")
      .attr("x", x(windata[windata.length - 1].value))
      //.attr("stroke", d=> getWordColor(d) )// d => getColor(d))
      .style("fill", "#ff6600") //d => getWordColor(d))
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
        return d.name;
      })
      .attr("x", d => {
        return d => x(d[xAxisName]) + 10;
      })
      .attr("fill-opacity", 1)
      .attr("y", 15)
      .attr("dy", ".5em")
      .attr("text-anchor", "end");

    // value
    barEntersecond
      .append("text")
      .attr("x", d => x(windata[windata.length - 1].value))
      .attr("y", 50)
      .attr("fill-opacity", 0)
      .style("fill", "ff6600") //d => getColor(d))
      .transition()
      .duration(1000)
      .text(function(d) {
        return d.value;
      })
      // .tween("text", function(d) {
      //   var self = this;
      //   self.textContent = d.value; //d.W;
      //   var i = d3.interpolate(self.textContent, Number(d.value)); //Number(d.W));

      //   return function(t) {
      //     self.textContent = i(t);
      //   };
      // })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-family", "Do Hyeon,sans-serif")
      .attr("font-size", "30px")
      .attr("class", "value" + graphnum)
      .attr("x", d => x(d[xAxisName]) + 10)
      .attr("y", 25);

    let barUpdatesecond = barsecond
      .transition("2")
      .duration(1000)
      .ease(d3.easeLinear);

    barUpdatesecond
      .select("rect")
      //.attr("y", d => y(d[yAxisNAME]))
      .attr("height", 50) //y.bandwidth() - 10)
      .attr("width", d => x(d[xAxisName]));

    var deformat = function(val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };
    var format = ",.0f";

    if (graphnum === "First") {
      format = ",.3f";
    }

    if (graphnum === "Third" || graphnum === "Sixth") {
      format = ",.0f";
    }

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
      .duration(100);

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
    let mainy1 = 100;
    let mainy2 = 1900;
    return (
      <div>
        <div>
          <h1> 동접 현황 입니다 </h1>
        </div>
        <div className="rowChart">
          <svg
            //width={width + this.margin.left + this.margin.right}
            width={2550}
            //height={height + this.margin.top + this.margin.bottom}
            height={1450}
          >
            <g className="mainTitle" transform={`translate( 0,0)`}></g>
            <g className="mainFirst" transform={`translate( 200,${mainy1})`}>
              <g
                className="axisXFirst"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYFirst"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g className="mainSecond" transform={`translate( 1250,${mainy1})`}>
              <g
                className="axisXSecond"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYSecond"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g className="mainThird" transform={`translate( 200,${mainy2})`}>
              <g
                className="axisXThird"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYThird"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g className="mainFourth" transform={`translate( 1250,${mainy2})`}>
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
