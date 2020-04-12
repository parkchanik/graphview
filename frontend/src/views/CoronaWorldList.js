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
import { getCoronaWorldroylabname } from "../services/getdata";
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
      height: 1100,
    };
    this.chartRef = React.createRef();
    this.drawChart = this.drawChart.bind(this);

    this.yAxisNAME = "name";
    this.xAxisWIN = "W";
    this.xAxisIP = "IP";

    this.margin = { top: 120, right: 30, bottom: 40, left: 90 };

    this.xfirst = null;
    //.domain([0, 70000]); // this.state.width]);

    this.xfirst2 = d3.scaleLinear().range([0, 650]).domain([0, 100]); // this.state.width]);

    this.yfirst = null;

    this.yfirst2 = d3.scaleBand().range([600, 1000]).padding(0.1); // this.state.height]);

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
      .text("CORONAVIRUS COVID-19 WORLD REALTIME COUNT")
      .attr("x", 950)
      .attr("y", 90)
      .attr("fill", "#FAFAFA")
      .attr("font-family", "Fjalla One")
      .style("text-anchor", "middle")
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

    this.getMainList(1);

    this.mainSubInterval = setInterval(() => {
      this.getMainList(this.langtype);
      this.langtype = this.langtype + 1;
      if (this.langtype > 6) {
        this.langtype = 1;
      }
    }, 5000);
    this.MoveGroup();
    this.mainSubInter2 = setInterval(() => {
      this.MoveGroup();
    }, 110000);

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
    var t = d3.transition().duration(50000).ease(d3.easeLinear);

    d3.select(".ListBottom")
      .transition(t)
      //.ease("linear")
      .attr("transform", "translate(-6700,1050)")
      .transition(t)

      // .duration(30000)
      //.ease("linear")
      .attr("transform", "translate(10,1050)");
  }

  async getMainList(num) {
    const { coronadata } = await getCoronaWorldroylabname(num);

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

    d3.csv(ryukimyangcsv).then((data) => {
      console.log("dataFromTSV data", data);
      this.alldata = data;

      this.SetData();
    });
  }

  SetTotalInfo(svgname, totaldata, langtype) {
    let svg = d3.select("." + svgname);

    let bardata = svg.selectAll(".bartotal").data(totaldata.Country);

    var bartotal = bardata
      .enter()
      .insert("g", ".axistotal")
      .attr("class", "bartotal")
      .attr("transform", "translate(0,100)");

    bartotal
      .append("rect")
      .attr("x", 0)
      .attr("class", "totalrect")
      .attr("width", 470)
      .attr("height", 120) //y.bandwidth() - 30)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", "0.5px")
      .attr("y", -45);
    console.log("totaldata", totaldata);
    // .attr("font-family", "BMDOHYEON")
    bartotal
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", function (d) {
        if (langtype == 1) {
          return "BMDOHYEON";
        } else if (langtype == 2) {
          return "Fjalla One";
        } else if (langtype == 3) {
          return "Noto Sans SC";
        } else if (langtype == 4) {
          return "Fjalla One";
        } else if (langtype == 5) {
          return "Kosugi Maru";
        } else if (langtype == 6) {
          return "Fjalla One";
        }
      })
      .text(function (d) {
        let str = totaldata.Name;
        let str_array = str.split(",");
        return str_array[0];
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "41px")
      .attr("class", "totalvaluetext")
      .attr("text-anchor", "middle")
      .attr("x", 230)
      .attr("y", -5);

    bartotal
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", function (d) {
        if (langtype == 1) {
          return "BMDOHYEON";
        } else if (langtype == 2) {
          return "Fjalla One";
        } else if (langtype == 3) {
          return "Noto Sans SC";
        } else if (langtype == 4) {
          return "Fjalla One";
        } else if (langtype == 5) {
          return "Kosugi Maru";
        } else if (langtype == 6) {
          return "Fjalla One";
        }
      })
      .text(function (d) {
        let str = totaldata.Name;
        let str_array = str.split(",");
        return str_array[1];
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "25px")
      .attr("class", "totalvaluetext1")
      .attr("text-anchor", "middle")
      .attr("x", 80)
      .attr("y", 30);

    bartotal
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", function (d) {
        if (langtype == 1) {
          return "BMDOHYEON";
        } else if (langtype == 2) {
          return "Fjalla One";
        } else if (langtype == 3) {
          return "Noto Sans SC";
        } else if (langtype == 4) {
          return "Fjalla One";
        } else if (langtype == 5) {
          return "Kosugi Maru";
        } else if (langtype == 6) {
          return "Fjalla One";
        }
      })
      .text(function (d) {
        let str = totaldata.Name;
        let str_array = str.split(",");
        return str_array[2];
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "25px")
      .attr("class", "totalvaluetext2")
      .attr("text-anchor", "middle")
      .attr("x", 230)
      .attr("y", 30);

    bartotal
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", function (d) {
        if (langtype == 1) {
          return "BMDOHYEON";
        } else if (langtype == 2) {
          return "Fjalla One";
        } else if (langtype == 3) {
          return "Noto Sans SC";
        } else if (langtype == 4) {
          return "Fjalla One";
        } else if (langtype == 5) {
          return "Kosugi Maru";
        } else if (langtype == 6) {
          return "Fjalla One";
        }
      })
      .text(function (d) {
        let str = totaldata.Name;
        let str_array = str.split(",");
        return str_array[3];
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "25px")
      .attr("class", "totalvaluetext3")
      .attr("text-anchor", "middle")
      .attr("x", 380)
      .attr("y", 30);

    var format = ",.0f";
    var confirmtext = bartotal
      .append("text")
      .transition()
      .duration(1500)
      .style("fill", (d) => this.getColor(d))
      .attr("font-family", "Play")
      .attr("fill-opacity", 1)
      .attr("font-size", "35px")
      .attr("class", "valuetotalc")
      .attr("text-anchor", "middle")
      .attr("x", 80)
      .attr("y", 65)
      .textTween(function (d) {
        var nowdata = totaldata.Confirmed;
        var i = d3.interpolateRound(0, nowdata);

        //console.log("iiii", i);y

        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      });

    bartotal
      .append("text")
      .transition()
      .duration(1500)
      .style("fill", (d) => this.getColor(d))
      .attr("font-family", "Play")
      .textTween(function (d) {
        var nowdata = totaldata.Deaths;
        var i = d3.interpolateRound(0, nowdata);

        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "35px")
      .attr("class", "valuetotald")
      .attr("text-anchor", "middle")
      .attr("x", 230)
      .attr("y", 65);

    bartotal
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "Play")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var nowdata = totaldata.Recovered;
        var i = d3.interpolateRound(0, nowdata);

        //console.log("iiii", i);
        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "35px")
      .attr("class", "valuetotalr")
      .attr("text-anchor", "middle")
      .attr("x", 380)
      .attr("y", 65);

    let barupdate = bardata.transition("2").ease(d3.easeLinear);

    var textupdate = barupdate
      .select(".totalvaluetext")
      .transition()
      .duration(1500)
      .attr("font-family", function (d) {
        if (langtype == 1) {
          return "BMDOHYEON";
        } else if (langtype == 2) {
          return "Fjalla One";
        } else if (langtype == 3) {
          return "Noto Sans SC";
        } else if (langtype == 4) {
          return "Fjalla One";
        } else if (langtype == 5) {
          return "Kosugi Maru";
        } else if (langtype == 6) {
          return "Fjalla One";
        }
      })
      .text(function (d) {
        let str = totaldata.Name;
        let str_array = str.split(",");

        return str_array[0];
      });

    bardata
      .select(".totalvaluetext1")
      .transition()
      .duration(1500)
      .attr("font-family", function (d) {
        if (langtype == 1) {
          return "BMDOHYEON";
        } else if (langtype == 2) {
          return "Fjalla One";
        } else if (langtype == 3) {
          return "Noto Sans SC";
        } else if (langtype == 4) {
          return "Fjalla One";
        } else if (langtype == 5) {
          return "Kosugi Maru";
        } else if (langtype == 6) {
          return "Fjalla One";
        }
      })
      .text(function (d) {
        let str = totaldata.Name;
        let str_array = str.split(",");
        return str_array[1];
      });

    bardata
      .select(".totalvaluetext2")
      .transition()
      .duration(1500)
      .attr("font-family", function (d) {
        if (langtype == 1) {
          return "BMDOHYEON";
        } else if (langtype == 2) {
          return "Fjalla One";
        } else if (langtype == 3) {
          return "Noto Sans SC";
        } else if (langtype == 4) {
          return "Fjalla One";
        } else if (langtype == 5) {
          return "Kosugi Maru";
        }
      })
      .text(function (d) {
        let str = totaldata.Name;
        let str_array = str.split(",");
        return str_array[2];
      });

    bardata
      .select(".totalvaluetext3")
      .transition()
      .duration(1500)
      .attr("font-family", function (d) {
        if (langtype == 1) {
          return "BMDOHYEON";
        } else if (langtype == 2) {
          return "Fjalla One";
        } else if (langtype == 3) {
          return "Noto Sans SC";
        } else if (langtype == 4) {
          return "Fjalla One";
        } else if (langtype == 5) {
          return "Kosugi Maru";
        }
      })
      .text(function (d) {
        let str = totaldata.Name;
        let str_array = str.split(",");
        return str_array[3];
      });

    var deformat = function (val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };

    bardata
      .select(".valuetotalc")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var nowdata = totaldata.Confirmed;
        var self = this;
        var oldnum = deformat(self.textContent, "");
        var i = d3.interpolateRound(oldnum, nowdata);

        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      });

    bardata
      .select(".valuetotalc")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var nowdata = totaldata.Confirmed;
        var self = this;
        var oldnum = deformat(self.textContent, "");
        var i = d3.interpolateRound(oldnum, nowdata);

        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      });

    bardata
      .select(".valuetotald")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var nowdata = totaldata.Deaths;
        var self = this;
        var oldnum = deformat(self.textContent, "");
        var i = d3.interpolateRound(oldnum, nowdata);

        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      });

    bardata
      .select(".valuetotalr")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var nowdata = totaldata.Recovered;
        var self = this;
        var oldnum = deformat(self.textContent, "");
        var i = d3.interpolateRound(oldnum, nowdata);

        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      });
  }

  SetCountryInfo(svgname, data, langtype) {
    let svg = d3.select("." + svgname);

    console.log("SetCountryInfo : ", svgname);
    console.log("SetCountryInfo Data : ", data);

    var format = ",.0f";

    // var totalvaluedata = svg.select(".totalvalue").data(svgname);

    // totalvaluedata
    //   .enter()
    //   .insert("text")
    //   .attr("class", "totalvalue")
    //   .attr("x", 100)
    //   .attr("y", 30)
    //   .attr("font-size", "25px")
    //   .style("fill", (d) => this.getColor(d))
    //   .attr("fill-opacity", 1)
    //   .attr("font-family", "BMDOHYEON");

    //  .text("토탈 " + confirmed + "  " + deaths + " " + recovered);

    let bardata2 = svg.selectAll(".barCountry").data(data, function (d) {
      return d.Country;
    });

    var barEnterdata2 = bardata2
      .enter()
      .insert("g", ".axisGCountry")
      .attr("class", "barCountry")
      .attr("transform", function (d, i) {
        // console.log("-----------------------axisSubMain : ", i);
        let x = 0;
        let y = 0;

        if (svgname == "ListBottom") {
          y = 0;
          x = Math.floor(i) * 235;

          return "translate(" + x + "," + y + ")";
        }

        if (i <= 5) {
          y = 100;
          x = 470 + Math.floor(i % 6) * 235;
        } else if (i <= 11) {
          y = 160;
          x = 470 + Math.floor(i % 6) * 235;
        } else {
          i = i - 12;
          y = 220 + Math.floor(i / 8) * 60;
          x = Math.floor(i % 8) * 235;
        }

        return "translate(" + x + "," + y + ")";
      });

    barEnterdata2
      .append("clipPath")
      .attr("id", "clip-rect")
      .append("rect")
      .attr("x", 0)
      .attr("class", "rect")
      .attr("clip-path", "url(#clip-rect)")
      .attr("width", 235)
      .attr("height", 60) //y.bandwidth() - 30)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", "1px")
      .attr("y", -45);

    barEnterdata2
      .append("rect")
      .attr("x", 0)
      .attr("class", "rectline")
      .attr("clip-path", "url(#clip-rect)")
      .attr("width", 235)
      .attr("height", 60) //y.bandwidth() - 30)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", "1px")
      .attr("y", -45);

    barEnterdata2
      .append("image")
      .attr("x", 7)
      .attr("y", -45)
      .attr("height", "35")
      .attr("width", "35")
      .attr("href", function (d) {
        return "./FLAG/" + d.Countrycode.toLowerCase() + ".png";
      })
      .attr("class", "imgfrom")
      .attr("id", function (d) {
        return d.Countrycode;
      })
      .attr("text-anchor", "start");

    barEnterdata2
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("clip-path", "url(#clip-rect)")
      .attr("font-family", function (d) {
        if (langtype == 1) {
          return "BMDOHYEON";
        } else if (langtype == 2) {
          return "Fjalla One";
        } else if (langtype == 3) {
          return "Noto Sans SC";
        } else if (langtype == 4) {
          return "Fjalla One";
        } else if (langtype == 5) {
          return "Kosugi Maru";
        }
      })
      .transition()
      .duration(1500)
      .text(function (d) {
        return d.Name;
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "25px")
      .attr("class", "valueSubMain")
      .attr("text-anchor", "start")
      .attr("x", 50)
      .attr("y", -20);

    var deformat = function (val, postfix) {
      return Number(val.replace(postfix, "").replace(/\,/g, ""));
    };

    var format = ",.0f";
    var confirmtext = barEnterdata2
      .append("text")
      .transition()
      .duration(1500)
      .style("fill", (d) => this.getColor(d))
      .attr("font-family", "Play")
      .attr("fill-opacity", 1)
      .attr("font-size", "21px")
      .attr("class", "valueSubMainc")
      .attr("text-anchor", "end")
      .attr("x", 80)
      .attr("y", 7);

    confirmtext.textTween(function (d) {
      var nowdata = d.Confirmed;
      var i = d3.interpolateRound(0, nowdata);

      //console.log("iiii", i);y

      return function (t) {
        return d3.format(format)(i(t)); //i;
      };
    });

    barEnterdata2
      .append("text")
      .transition()
      .duration(1500)
      .style("fill", (d) => this.getColor(d))
      .attr("font-family", "Play")
      .textTween(function (d) {
        var nowdata = d.Deaths;
        var i = d3.interpolateRound(0, nowdata);

        return function (t) {
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
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "Play")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var nowdata = d.Recovered;
        var i = d3.interpolateRound(0, nowdata);

        //console.log("iiii", i);
        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("y", 0)
      .attr("font-size", "21px")
      .attr("class", "valueSubMainr")
      .attr("text-anchor", "end")
      .attr("x", 230)
      .attr("y", 7);

    let barupdate = bardata2
      .transition("2")
      //.duration(1000)
      .ease(d3.easeLinear);

    barupdate.attr("transform", function (d, i) {
      let x = 0;
      let y = 0;

      if (svgname == "ListBottom") {
        y = 0;
        x = Math.floor(i) * 235;

        return "translate(" + x + "," + y + ")";
      }

      if (i <= 5) {
        y = 100;
        x = 470 + Math.floor(i % 6) * 235;
      } else if (i <= 11) {
        y = 160;
        x = 470 + Math.floor(i % 6) * 235;
      } else {
        i = i - 12;
        y = 220 + Math.floor(i / 8) * 60;
        x = Math.floor(i % 8) * 235;
      }

      return "translate(" + x + "," + y + ")";
    });

    var textupdate = barupdate
      .select(".valueSubMain")

      .transition()
      .duration(100);

    textupdate
      .attr("font-family", function (d) {
        if (langtype == 1) {
          return "BMDOHYEON";
        } else if (langtype == 2) {
          return "Fjalla One";
        } else if (langtype == 3) {
          return "Noto Sans SC";
        } else if (langtype == 4) {
          return "Fjalla One";
        } else if (langtype == 5) {
          return "Kosugi Maru";
        }
      })
      .text(function (d) {
        if (d.Country == "country") {
          let str = d.Name;
          let str_array = str.split(",");

          return str_array[0];
        }

        var text = d.Name;
        var len = text.length;
        // if (len > 10) {
        //   return text.substring(0, 10) + "...";
        // }
        return d.Name; //  한국어
      });

    console.log("langtype : ", this.langtype);
    barupdate
      .select(".valueSubMainc")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var self = this;
        var oldnum = deformat(self.textContent, "");
        var nowdata = d.Confirmed;
        var i = d3.interpolateRound(oldnum, nowdata);

        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      });

    barupdate
      .select(".valueSubMaind")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var self = this;
        var oldnum = deformat(self.textContent, "");
        var nowdata = d.Deaths;
        var i = d3.interpolateRound(oldnum, nowdata);

        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      });

    barupdate
      .select(".valueSubMainr")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var self = this;
        var oldnum = deformat(self.textContent, "");
        var nowdata = d.Recovered;
        var i = d3.interpolateRound(oldnum, nowdata);

        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      });

    var barExit = bardata2
      .exit()
      .attr("fill-opacity", 1)
      .transition()
      .duration(100);

    barExit
      .attr("transform", function (d) {
        return "translate(-5000,0)";
      })
      .remove();
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

    Data.sort(function (a, b) {
      if (a.Confirmed == b.Confirmed) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        //return Number(a.value) - Number(b.value);
        return b.Confirmed - a.Confirmed;
      }
    });

    let Total = coronadata.WorldNewStatusTotal;
    let LangType = coronadata.langtype;

    var max_number = 116;

    let DataBottom = [];

    DataBottom = Data.slice(116, 150);
    Data = Data.slice(0, max_number);
    this.SetCountryInfo("List", Data, LangType);
    this.SetCountryInfo("ListBottom", DataBottom, LangType);
    this.SetTotalInfo("List", Total, LangType);
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
      backgroundColor: "#282c34",
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
            <g className="mainTop" transform={`translate( 0,0)`}></g>
            <g className="List" transform={`translate( 10,50)`}></g>
            <g className="ListBottom" transform={`translate( 10,1050)`}></g>
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
