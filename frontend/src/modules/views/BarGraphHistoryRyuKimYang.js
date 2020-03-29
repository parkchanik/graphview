import React, { Component } from "react";
import * as d3 from "d3";
//import geojson from "./geojson.json";
//import geojson from "./TL_SCCO_CTPRVN.json";
import geojson from "./TL_SCCO_SIG.json";

import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import "./bargraphhistory.css";

import csvdata from "./readmelocal.csv";
//import ryukimyangcsv from "./ryukimyang.csv";
import ryukimyangcsv from "./ryukimyangfake.csv";
class BarGraphHistoryRyuKimYang extends Component {
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

    this.margin = { top: 20, right: 30, bottom: 40, left: 90 };

    this.xfirst = d3
      .scaleLinear()
      .range([0, 500])
      .domain([0, 10]); // this.state.width]);

    this.yfirst = d3
      .scaleBand()
      .range([0, 300])
      .padding(0.1); // this.state.height]);

    this.xsecond = d3
      .scaleLinear()
      .range([0, 500])
      .domain([0, 20]); // this.state.width]);

    this.ysecond = d3
      .scaleBand()
      .range([0, 300])
      .padding(0.1); // this.state.height]);

    this.xthird = d3
      .scaleLinear()
      .range([0, 500])
      .domain([0, 300]); // this.state.width]);

    this.ythird = d3
      .scaleBand()
      .range([0, 300])
      .padding(0.1); // this.state.height]);

    this.xfourth = d3
      .scaleLinear()
      .range([0, 500])
      .domain([0, 300]); // this.state.width]);

    this.yfourth = d3
      .scaleBand()
      .range([0, 300])
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

    this.graphXyposLine1 = 300;
    this.graphXyposLine2 = 900;
    //let graph1Xpos = 0;
    // let graph2Xpos = 700;

    this.graphpositionzero = 0;

    this.currentdate = new Date("2019-01");

    this.currentnum = 1;

    this.alldata = [];
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

    let svgFirst = d3.select(".mainFirst");
    let svgSecond = d3.select(".mainSecond");
    let svgThird = d3.select(".mainThird");
    let svgFourth = d3.select(".mainFourth");
    let svgFifth = d3.select(".mainFifth");
    let svgSixth = d3.select(".mainSixth");

    // Add X axis

    //svg
    svgFirst
      .append("text")
      .text("text")
      .attr("x", 100)
      .attr("y", 200);

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
      if (d.YEAR === nownum.toString()) {
        // console.log("d.YEAR === nownum  : ", d.YEAR, d);
        nowdata.push(d);

        let erajsondata = { name: d.NAME, value: d.ERA };
        data1.push(erajsondata);

        let winjsondata = { name: d.NAME, value: d.W };
        data2.push(winjsondata);

        let ipjsondata = { name: d.NAME, value: d.IP };
        data3.push(ipjsondata);

        let sojsondata = { name: d.NAME, value: d.SO };
        data4.push(sojsondata);
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
        return Number(a.value) - Number(b.value);
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

    console.log("eradata_sort 0 ", data1[0].name, data1[0].value);
    console.log("eradata_sort 1 ", data1[1].name, data1[1].value);
    console.log("eradata_sort 2 ", data1[2].name, data1[2].value);

    this.currentnum = nownum + 1;

    this.SecondSet(
      data2,
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

  SecondSet(windata, x, y, graphnum, yAxisNAME, xAxisName, graphxpos) {
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
      .attr("fill", "#DF337D") //d => getColor(d))
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
      .attr("font-family", "Do Hyeon,sans-serif")
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
      format = ",.2f";
    }

    if (graphnum === "Third" || graphnum === "Sixth") {
      format = ",.1f";
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

    return (
      <div>
        <div>
          <h1> 동접 현황 입니다 </h1>
        </div>
        <div className="rowChart">
          <svg
            width={width + this.margin.left + this.margin.right}
            height={height + this.margin.top + this.margin.bottom}
          >
            <g
              className="mainFirst"
              transform={`translate( ${this.margin.left},${this.margin.top})`}
            >
              <g
                className="axisXFirst"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYFirst"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g
              className="mainSecond"
              transform={`translate( 790,${this.margin.top})`}
            >
              <g
                className="axisXSecond"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYSecond"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g
              className="mainThird"
              transform={`translate( 1490,${this.margin.top})`}
            >
              <g
                className="axisXThird"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYThird"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g
              className="mainFourth"
              transform={`translate( ${this.margin.left},600)`}
            >
              <g
                className="axisXFourth"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYFourth"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g className="mainFifth" transform={`translate( 790,600)`}>
              <g
                className="axisXFifth"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYFifth"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
            <g className="mainSixth" transform={`translate( 1490,600)`}>
              <g
                className="axisXSixth"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYSixth"
                transform={`translate(${this.graphXpos1},${this.graphpositionzero})`}
              ></g>
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default BarGraphHistoryRyuKimYang;

// drawChart() {
//   const data = this.props.data;
//   let margin = { top: 20, right: 30, bottom: 40, left: 90 },
//     width = this.state.width - margin.left - margin.right,
//     height = this.state.height - margin.top - margin.bottom;
//   // append the svg object to the body of the page
//   let svg = d3
//     .select(".rowChart")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//   // Add X axis
//   let x = d3
//     .scaleLinear()
//     .domain([0, 100])
//     .range([0, width]);
//   svg
//     .append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .attr("class", "axis x")
//     .call(d3.axisBottom(x))
//     .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");
//   // Add Y axis
//   let y = d3
//     .scaleBand()
//     .range([0, height])
//     //.domain(this.state.data.map(d => d[this.state.yAxisAttribute]))
//     .domain(data.map(d => d[this.state.yAxisAttribute]))
//     .padding(0.1);
//   svg
//     .append("g")
//     .attr("class", "axis y")
//     .call(d3.axisLeft(y))
//     .selectAll("text")
//     .attr("dy", null);
//   // Add Bars
//   svg
//     .selectAll("myRect")
//     //.data(this.state.data)
//     .data(data)
//     .enter()
//     .append("rect")
//     .on("mouseover", function() {
//       d3.select(this).style("opacity", 0.5);
//     })
//     .on("mouseout", function() {
//       d3.select(this).style("opacity", 1);
//     })
//     .attr("x", x(0))
//     .attr("y", d => y(d[this.state.yAxisAttribute]))
//     .attr("width", 0)
//     .attr("height", y.bandwidth() - 10)
//     .attr("fill", "#DF337D")
//     .transition(d3.transition().duration(1000))
//     .attr("width", d => x(d[this.state.xAxisAttribute]));
// }
