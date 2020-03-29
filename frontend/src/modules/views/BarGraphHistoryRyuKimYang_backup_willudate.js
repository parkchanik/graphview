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
      windata: [],
      ipdata: [],
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
      .domain([0, 100]); // this.state.width]);
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
      .domain([0, 100]); // this.state.width]);
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
  }

  drawChart() {
    //const data = this.props.data;
    const data = this.state.data;

    //if (data.length == 0) return;
    console.log("drawChart", data);
    // let margin = { top: 20, right: 30, bottom: 40, left: 90 },
    let width = this.state.width - this.margin.left - this.margin.right;
    let height = this.state.height - this.margin.top - this.margin.bottom;

    let svg = d3.select(".maing");
    // Add X axis

    svg
      .append("text")
      .text("text")
      .attr("x", 100)
      .attr("y", 200);

    svg
      .select(".axisXFirst")
      .call(d3.axisBottom(this.xfirst))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg
      .select(".axisXSecond")
      .call(d3.axisBottom(this.xsecond))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg
      .select(".axisXThird")
      .call(d3.axisBottom(this.xthird))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg
      .select(".axisXFourth")
      .call(d3.axisBottom(this.xfourth))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg
      .select(".axisXFifth")
      .call(d3.axisBottom(this.xfifth))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg
      .select(".axisXSixth")
      .call(d3.axisBottom(this.xsixth))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg
      .select(".axisYFirst")
      .call(d3.axisLeft(this.yfirst))
      .selectAll("text")
      .attr("dy", null);

    svg
      .select(".axisYSecond")
      .call(d3.axisLeft(this.ysecond))
      .selectAll("text")
      .attr("dy", null);

    svg
      .select(".axisYThird")
      .call(d3.axisLeft(this.ythird))
      .selectAll("text")
      .attr("dy", null);
    svg
      .select(".axisYFourth")
      .call(d3.axisLeft(this.yfourth))
      .selectAll("text")
      .attr("dy", null);

    svg
      .select(".axisYFifth")
      .call(d3.axisLeft(this.yfifth))
      .selectAll("text")
      .attr("dy", null);

    svg
      .select(".axisYSixth")
      .call(d3.axisLeft(this.ysixth))
      .selectAll("text")
      .attr("dy", null);
  }

  componentDidMount() {
    // let width = this.getWidth();
    // let height = this.getHeight();
    // this.setState({ width: width, height: height }, () => {
    this.drawChart();

    let timter = setInterval(() => {
      //  this.getQueryServerInfo();
      this.SetData();
    }, 5000);

    // });
    // let resizedFn;
    // window.addEventListener("resize", () => {
    //   clearTimeout(resizedFn);
    //   resizedFn = setTimeout(() => {
    //     this.redrawChart();
    //   }, 200);
    // });
  }

  componentWillMount() {
    // this.getQueryServerInfo();

    this.dataFromTSV();
  }

  dataFromTSV(path) {
    path = path || "data.tsv";
    console.log(path);

    // d3.csv(csvdata).then(data => {
    //   console.log("dataFromTSV data", data);
    //   this.setState({ data: data });
    // });

    d3.csv(ryukimyangcsv).then(data => {
      console.log("dataFromTSV data", data);
      this.setState({ alldata: data });
    });

    // d3.tsv(path, (err, data)=>{

    //     data = data.map((d)=>({close: +d.close,
    //                            date: d3.timeParse("%d-%b-%y")(d.date)
    //                           }));

    //     this.x.domain(d3.extent(data, (d)=> d.date) );
    //     this.y.domain([0, d3.max(data, (d)=> (d.close) )]);
    //     this.setState({data: data});

    // });
  }

  SetData() {
    const { config, alldata, data, currentdata, currentdate } = this.state;

    // var nowdate = currentdate;
    var nowdate = this.currentdate;

    var nownum = this.currentnum;
    //console.log("setdata currentdata ", currentdata);
    // console.log("nowdate  : ", nowdate);

    // var getyear = nowdate.getFullYear();
    // var getmonth = nowdate.getMonth() + 1;
    // var monthstr = "";

    // if (getmonth < 10) {
    //   monthstr = "0" + getmonth;
    // } else {
    //   monthstr = "" + getmonth;
    // }

    // var nowdatestring = getyear + "-" + monthstr;
    // console.log("nowdatestring ", nowdatestring);
    var nowdata = [];
    let eradata = [];
    let windata = [];
    let ipdata = [];
    alldata.map(d => {
      //console.log("ddddddddddddd", new Date(d.date));
      //console.log("nowdate :", nowdate);
      // console.log("d.YEAR ---- ", d.YEAR, nownum);
      //if (d.YEAR == nowdatestring) {
      if (d.YEAR == nownum) {
        //console.log("nowdata YEAR  : ", d.YEAR, d);
        nowdata.push(d);

        let winjsondata = { name: d.NAME, value: d.W };
        windata.push(winjsondata);

        let ipjsondata = { name: d.NAME, value: d.IP };
        ipdata.push(ipjsondata);
      }
    });

    console.log("------- windata push ", windata);
    eradata = nowdata;
    //windata = nowdata;
    //ipdata = nowdata;

    /*
    const eradata_sort = eradata.sort(function(a, b) {
      if (Number(a.ERA) == Number(b.ERA)) {
        var r1 = 0;
        var r2 = 0;
        // for (let index = 0; index < a.name.length; index++) {
        //   r1 = r1 + a.name.charCodeAt(index);
        // }
        // for (let index = 0; index < b.name.length; index++) {
        //   r2 = r2 + b.name.charCodeAt(index);
        // }
        return r2 - r1;
      } else {
        return Number(b.ERA) - Number(a.ERA);
      }
    });
    */
    const windata_sort = windata.sort(function(a, b) {
      if (Number(a.W) == Number(b.W)) {
        var r1 = 0;
        var r2 = 0;

        return r2 - r1;
      } else {
        return Number(b.W) - Number(a.W);
      }
    });

    const ipdata_sort = ipdata.sort(function(a, b) {
      if (Number(a.IP) == Number(b.IP)) {
        var r1 = 0;
        var r2 = 0;

        return r2 - r1;
      } else {
        return Number(b.IP) - Number(a.IP);
      }
    });

    console.log(
      "eradata eradata eradata windata sort",
      // eradata_sort,
      windata_sort,
      ipdata_sort
    );
    //console.log("eradata windata windata sort ", windata_sort);
    //console.log("nowdata after sort ", nownum, nowdata);
    // var nextdate = new Date(nowdate.setMonth(nowdate.getMonth() + 1));

    //this.currentdate = nextdate;
    //this.state.currentdate = nextdate;
    this.currentnum = nownum + 1;
    console.log("currentdata", currentdata);

    // this.setState({
    //   currentdata: nowdata,
    //   windata: windata_sort,
    //   ipdata: ipdata_sort
    // });

    //var barsecondstr = ".barsecond";

    this.SecondSet(
      windata,
      this.xsecond,
      this.ysecond,
      "Second",
      this.yAxisNAME,
      "value",
      //this.xAxisWIN,
      this.graphXpos2
    );

    setTimeout(
      function() {
        this.SecondSet(
          ipdata,
          this.xthird,
          this.ythird,
          "Third",
          this.yAxisNAME,
          "value",
          this.graphXpos3
        );
      }.bind(this),
      3000
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
    let svg = d3.select(".maing");

    y.domain(windata.map(d => d[yAxisNAME])).padding(0.1);

    let barsecond = svg.selectAll(".bar" + graphnum).data(windata, function(d) {
      return d.name;
    });

    var barEntersecond = barsecond
      .enter()
      .insert("g", ".axis" + graphnum)
      .attr("class", "bar" + graphnum)
      .attr("transform", d => {
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
      .tween("text", function(d) {
        var self = this;
        self.textContent = d.value; //d.W;
        var i = d3.interpolate(self.textContent, Number(d.value)); //Number(d.W));

        return function(t) {
          self.textContent = i(t);
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-family", "Do Hyeon,sans-serif")
      .attr("font-size", "30px")
      .attr("class", "value" + graphnum)
      // .attr("id", function (d) {
      //   return d.playerid;
      // })
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

  componentWillUpdate() {
    console.log("componentWillUpdate()");
    //var data = [];
    //data = this.props.currentdata;
    const { data, currentdata, windata, ipdata } = this.state;
    //console.log("will update ", data);
    console.log("componentWillUpdate", currentdata, windata);
    // let margin = { top: 20, right: 30, bottom: 40, left: 90 },
    const width = this.state.width - this.margin.left - this.margin.right;
    const height = this.state.height - this.margin.top - this.margin.bottom;
    // let x = d3
    //   .scaleLinear()
    //   .domain([0, 100])
    //   .range([0, width]);

    var minvalue = d3.min(currentdata, function(d) {
      //  console.log("d3 min ", d.value);
      return d.ERA;
    });

    var maxvalue = d3.max(currentdata, function(d) {
      //console.log("d3 max ", d.value);
      return d.ERA;
    });
    var minvalueWin = d3.min(windata, function(d) {
      //  console.log("d3 min ", d.value);
      return d.W;
    });

    var maxvalueWin = d3.max(windata, function(d) {
      //console.log("d3 max ", d.value);
      return d.W;
    });

    //this.xfirst.domain([0, 5]);

    //this.xsecond.domain([0, 20]);

    let svg = d3.select(".maing");

    svg
      .select(".axisXFirst")
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .call(d3.axisBottom(this.xfirst));
    // svg
    //   .select(".axisXSecond")
    //   .transition()
    //   .duration(1000)
    //   .ease(d3.easeLinear)
    //   .call(d3.axisBottom(this.xsecond));
    svg
      .select(".axisXThird")
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .call(d3.axisBottom(this.xthird));

    // let y = d3
    //   .scaleBand()
    //   .range([0, 500]) //height])
    //   .domain(currentdata.map(d => d[this.state.yAxisAttribute]))
    //   .padding(0.1);

    this.yfirst
      .domain(currentdata.map(d => d[this.state.yAxisAttribute]))
      .padding(0.1);

    // this.ysecond
    //   .domain(windata.map(d => d[this.state.yAxisAttributeMAIN]))
    //   .padding(0.1);

    this.ythird
      .domain(ipdata.map(d => d[this.state.yAxisAttributeMAIN]))
      .padding(0.1);

    svg
      .select(".axisYFirst")
      .call(d3.axisLeft(this.yfirst))
      .selectAll("text")
      .attr("dy", null);

    // svg
    //   .select(".axisYSecond")
    //   .call(d3.axisLeft(this.ysecond))
    //   .selectAll("text")
    //   .attr("dy", null);
    svg
      .select(".axisYThird")
      .call(d3.axisLeft(this.ythird))
      .selectAll("text")
      .attr("dy", null);

    // data.map(d => {
    //   console.log("data.map", d[this.state.yAxisAttribute]);
    // });

    let barfirst = svg.selectAll(".barfirst").data(currentdata, function(d) {
      return d.NAME;
    });

    // let barsecond = svg.selectAll(".barsecond").data(windata, function(d) {
    //   return d.NAME;
    // });

    let barthird = svg.selectAll(".barthird").data(ipdata, function(d) {
      return d.NAME;
    });

    var barEnterfirst = barfirst
      .enter()
      .insert("g", ".axisfirst")
      .attr("class", "barfirst")
      .attr("transform", d => {
        return (
          "translate(" +
          this.graphXpos1 +
          "," +
          this.yfirst(d[this.state.yAxisAttributeMAIN]) +
          ")"
        );
      });

    // var barEntersecond = barsecond
    //   .enter()
    //   .insert("g", ".axissecond")
    //   .attr("class", "barsecond")
    //   .attr("transform", d => {
    //     console.log("barsecond ddddd ", d);
    //     return (
    //       "translate(" +
    //       this.graphXpos2 +
    //       "," +
    //       this.ysecond(d[this.state.yAxisAttributeMAIN]) +
    //       ")"
    //     );
    //   });
    var barEnterthird = barthird
      .enter()
      .insert("g", ".axisthird")
      .attr("class", "barthird")
      .attr("transform", d => {
        return (
          "translate(" +
          this.graphXpos3 +
          "," +
          this.ythird(d[this.state.yAxisAttributeMAIN]) +
          ")"
        );
      });

    barEnterfirst
      .append("rect")
      .attr("x", this.xfirst(0))
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 0)
      .attr("height", 50) //y.bandwidth() - 30)
      .attr("fill", "#DF337D") //d => getColor(d))
      .attr("y", 150)
      .transition(d3.transition().duration(1000))
      .attr("width", d => this.xfirst(d[this.state.xAxisAttribute]));

    // barEntersecond
    //   .append("rect")
    //   .attr("x", this.xsecond(0))
    //   //.attr("y", d => y(d[this.state.yAxisAttribute]))
    //   .attr("width", 0)
    //   .attr("height", 50) //y.bandwidth() - 30)
    //   .attr("fill", "#DF337D") //d => getColor(d))
    //   .attr("y", 0)
    //   .transition(d3.transition().duration(1000))
    //   .attr("width", d => this.xsecond(d[this.state.xAxisAttributeWin]));

    barEnterthird
      .append("rect")
      .attr("x", this.xthird(0))
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 0)
      .attr("height", 50) //y.bandwidth() - 30)
      .attr("fill", "#DF337D") //d => getColor(d))
      .attr("y", 0)
      .transition(d3.transition().duration(1000))
      .attr("width", d => this.xthird(d[this.state.xAxisAttributeIP]));

    // barEnterfirst
    //   .append("text")
    //   .attr("x", d => this.xfirst(d[this.state.xAxisAttribute]))
    //   .text(function(d) {
    //     return d.value;
    //   });

    // barEnterfirst
    //   .append("text")
    //   .attr("x", this.xfirst(-10))
    //   .text(function(d) {
    //     return d.server;
    //   });

    // var barInfoSecond = barEntersecond
    //   .append("text")
    //   .attr("x", d => this.xsecond(windata[windata.length - 1].value))
    //   //.attr("stroke", d=> getWordColor(d) )// d => getColor(d))
    //   .style("fill", "#ff6600") //d => getWordColor(d))
    //   .attr("class", "barInfoSecond")
    //   .attr("y", 135)
    //   .attr("stroke-width", "0px")
    //   .attr("fill-opacity", 0)
    //   .attr("font-family", "Do Hyeon,sans-serif")
    //   .attr("font-size", function(d, i) {
    //     return "30px";
    //   })
    //   .transition()
    //   .duration(1000) //interval_time)
    //   .text(function(d) {
    //     return d.NAME;
    //   })
    //   .attr("x", d => {
    //     return d => this.xsecond(d[this.state.xAxisAttributeWin]) + 10;
    //   })
    //   .attr("fill-opacity", 1)
    //   .attr("y", 15)
    //   .attr("dy", ".5em")
    //   .attr("text-anchor", "end");

    var barInfoThird = barEnterthird
      .append("text")
      .attr("x", d => this.xthird(windata[windata.length - 1].value))
      //.attr("stroke", d=> getWordColor(d) )// d => getColor(d))
      .style("fill", "#ff6600") //d => getWordColor(d))
      .attr("class", "barInfoThird")
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
        return d.NAME;
      })
      .attr("x", d => {
        return d => this.xthird(d[this.state.xAxisAttributeIP]) + 10;
      })
      .attr("fill-opacity", 1)
      .attr("y", 15)
      .attr("dy", ".5em")
      .attr("text-anchor", "end");

    // // value
    // barEntersecond
    //   .append("text")
    //   .attr("x", d => this.xsecond(windata[windata.length - 1].value))
    //   .attr("y", 50)
    //   .attr("fill-opacity", 0)
    //   .style("fill", "ff6600") //d => getColor(d))
    //   .transition()
    //   .duration(1000)
    //   .tween("text", function(d) {
    //     var self = this;
    //     self.textContent = d.W;
    //     var i = d3.interpolate(self.textContent, Number(d.W));

    //     return function(t) {
    //       self.textContent = i(t);
    //     };
    //   })
    //   .attr("fill-opacity", 1)
    //   .attr("y", 0)
    //   .attr("font-family", "Do Hyeon,sans-serif")
    //   .attr("font-size", "30px")
    //   .attr("class", "valueSecond")
    //   // .attr("id", function (d) {
    //   //   return d.playerid;
    //   // })
    //   .attr("x", d => this.xsecond(d[this.state.xAxisAttributeWin]) + 10)
    //   .attr("y", 25);

    // value
    barEnterthird
      .append("text")
      .attr("x", d => this.xthird(ipdata[ipdata.length - 1].value))
      .attr("y", 50)
      .attr("fill-opacity", 0)
      .style("fill", "ff6600") //d => getColor(d))
      .transition()
      .duration(1000)
      .tween("text", function(d) {
        var self = this;
        self.textContent = d.IP;
        var i = d3.interpolate(self.textContent, Number(d.IP));

        return function(t) {
          self.textContent = i(t);
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-family", "Do Hyeon,sans-serif")
      .attr("font-size", "30px")
      .attr("class", "valueThird")
      .attr("x", d => this.xthird(d[this.state.xAxisAttributeIP]) + 10)
      .attr("y", 25);

    let barUpdatefirst = barfirst
      .transition("2")
      .duration(1000)
      .ease(d3.easeLinear);

    // let barUpdatesecond = barsecond
    //   .transition("2")
    //   .duration(1000)
    //   .ease(d3.easeLinear);

    let barUpdatethird = barthird
      .transition("2")
      .duration(1000)
      .ease(d3.easeLinear);

    barUpdatefirst
      .select("rect")

      // .attr("y", d => y(d[this.state.yAxisAttribute]))
      // .attr("width", 0)
      // .attr("height", y.bandwidth() - 10)
      // .attr("fill", "#DF337D")
      // .transition(d3.transition().duration(1000))
      .attr("height", 50) //y.bandwidth() - 10)
      .attr("width", d => this.xfirst(d[this.state.xAxisAttribute]));

    // barUpdatesecond
    //   .select("rect")
    //   .attr("y", d => this.ysecond(d[this.state.yAxisAttributeWin]))
    //   .attr("height", 50) //y.bandwidth() - 10)
    //   .attr("width", d => this.xsecond(d[this.state.xAxisAttributeWin]));

    barUpdatethird
      .select("rect")
      .attr("y", d => this.ythird(d[this.state.yAxisAttributeIP]))
      .attr("height", 50) //y.bandwidth() - 10)
      .attr("width", d => this.xthird(d[this.state.xAxisAttributeIP]));

    var deformat = function(val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };
    var format = ",.0f";

    // barUpdatesecond
    //   .select(".valueSecond")
    //   .tween("text", function(d) {
    //     var self = this;
    //     var i = d3.interpolate(self.textContent, Number(d.W));

    //     var i = d3.interpolate(deformat(self.textContent, ""), Number(d.W));

    //     var prec = (Number(d.W) + "").split("."),
    //       round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

    //     return function(t) {
    //       self.textContent =
    //         d3.format(format)(Math.round(i(t) * round) / round) + "";
    //     };
    //   })
    //   .duration(1000)
    //   .attr("x", d => this.xsecond(d[this.state.xAxisAttributeWin]) + 10);

    // barUpdatesecond.attr("transform", d => {
    //   return (
    //     "translate(" +
    //     ///this.graphXpos2 +
    //     this.graphXpos2 +
    //     "," +
    //     this.ysecond(d[this.state.yAxisAttributeMAIN]) +
    //     ")"
    //   );
    // });

    barUpdatethird.attr("transform", d => {
      return (
        "translate(" +
        ///this.graphXpos2 +
        this.graphXpos3 +
        "," +
        this.ythird(d[this.state.yAxisAttributeMAIN]) +
        ")"
      );
    });

    ///////////////////////// move update
  }

  getWidth() {
    return this.chartRef.current.parentElement.offsetWidth;
  }
  getHeight() {
    return this.chartRef.current.parentElement.offsetHeight;
  }
  // SetData(data) {
  //   console.log("setdata data : ", data);
  //   data.shift();
  //   data.push(Math.round(Math.random() * 100));
  //   this.setState({ data: data });
  //   console.log("setdata data : ", data);
  //   this.datarender(data);
  // }

  render() {
    console.log("render");
    //let margin = { top: 20, right: 30, bottom: 40, left: 90 },
    let width = this.state.width - this.margin.left - this.margin.right;
    let height = this.state.height - this.margin.top - this.margin.bottom;

    let graphheight = 300;
    let graphypos = 300;

    //let graph1Xpos = 0;
    // let graph2Xpos = 700;
    // this.graphXypos = 300;

    //let graph1Xpos = 0;
    // let graph2Xpos = 700;

    // const projection = geoMercator().fitExtent(
    //   [
    //     [0, 0],
    //     [width * 0.9, height * 0.9]
    //   ],
    //   geojson
    // );
    // const path = geoPath().projection(projection);

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
              className="maing"
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

              <g
                className="axisXSecond"
                transform={`translate(${this.graphXpos2},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYSecond"
                transform={`translate(${this.graphXpos2},${this.graphpositionzero})`}
              ></g>

              <g
                className="axisXThird"
                transform={`translate(${this.graphXpos3},${this.graphXyposLine1})`}
              ></g>
              <g
                className="axisYThird"
                transform={`translate(${this.graphXpos3},${this.graphpositionzero})`}
              ></g>

              <g
                className="axisXFourth"
                transform={`translate(${this.graphXpos1},${this.graphXyposLine2})`}
              ></g>
              <g
                className="axisYFourth"
                transform={`translate(${this.graphXpos1},${this.graphYpos1})`}
              ></g>

              <g
                className="axisXFifth"
                transform={`translate(${this.graphXpos2},${this.graphXyposLine2})`}
              ></g>
              <g
                className="axisYFifth"
                transform={`translate(${this.graphXpos2},${this.graphYpos1})`}
              ></g>

              <g
                className="axisXSixth"
                transform={`translate(${this.graphXpos3},${this.graphXyposLine2})`}
              ></g>
              <g
                className="axisYSixth"
                transform={`translate(${this.graphXpos3},${this.graphYpos1})`}
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
