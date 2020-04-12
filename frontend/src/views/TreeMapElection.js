import React, { Component } from "react";
//import BarGraphHistory from "../modules/views/bargraphhistory";
import geojson from "./data/TL_SCCO_SIG.json";
import rectdata from "./data/flare-2.json";
import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import * as d3 from "d3";
import treemapdata from "./data/data_hierarchy_1level.csv";

import { getAllElection } from "../services/getdata";
import "./bargraphhistory.css";
//import csvdata from "./readme.csv";

export class TreeMapElection extends Component {
  //displayName = CharacterInfo.name

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      config: "",
      data: [],
      linedata: [],
      currentdate: new Date("2019-01"),
      // data: [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8]

      width: 1500,
      height: 1400,
    };
    this.drawChart = this.drawChart.bind(this);

    this.margin = { top: 20, right: 30, bottom: 40, left: 90 };
    // <LineChart elementWidth={600} elementHeight={270} />,
    //let { elementWidth, elementHeight } = props;

    // this.datarender = this.datarender.bind();
  }

  drawChart() {
    let svg = d3.select(".mainlist");
    var svgmain = d3.select(".mainanother");

    this.mainsubtext1 = svgmain
      .append("text")
      .text("21대 총선 예상 의석비율")
      .attr("x", 200)
      .attr("y", -50)
      .attr("fill", this.getColor(1))
      .attr("font-family", "Noto Sans KR")
      .style("text-anchor", "middle")
      .attr("font-size", "40px");

    this.mainsubtext1 = svg
      .append("text")
      .text("비례 득표")
      .attr("x", 300)
      .attr("y", -50)
      .attr("fill", this.getColor(1))
      .attr("font-family", "Noto Sans KR")
      .style("text-anchor", "middle")
      .attr("font-size", "20px");

    this.mainsubtext2 = svg
      .append("text")
      .text("현재 지역구 1위수")
      .attr("x", 450)
      .attr("y", -50)
      .attr("fill", this.getColor(1))
      .attr("font-family", "Noto Sans KR")
      .style("text-anchor", "middle")
      .attr("font-size", "20px");

    this.mainsubtext3 = svg
      .append("text")
      .text("정당득표율")
      .attr("x", 600)
      .attr("y", -50)
      .attr("fill", this.getColor(1))
      .attr("font-family", "Noto Sans KR")
      .style("text-anchor", "middle")
      .attr("font-size", "20px");

    this.mainsubtext4 = svg
      .append("text")
      .text("연동형캡 30")
      .attr("x", 750)
      .attr("y", -50)
      .attr("fill", this.getColor(1))
      .attr("font-family", "Noto Sans KR")
      .style("text-anchor", "middle")
      .attr("font-size", "20px");

    this.mainsubtext5 = svg
      .append("text")
      .text("잔여석계산(배분1,2)")
      .attr("x", 900)
      .attr("y", -50)
      .attr("fill", this.getColor(1))
      .attr("font-family", "Noto Sans KR")
      .style("text-anchor", "middle")
      .attr("font-size", "20px");

    this.mainsubtext7 = svg
      .append("text")
      .text("초과분조정")
      .attr("x", 1050)
      .attr("y", -50)
      .attr("fill", this.getColor(1))
      .attr("font-family", "Noto Sans KR")
      .style("text-anchor", "middle")
      .attr("font-size", "20px");

    this.mainsubtext7 = svg
      .append("text")
      .text("병립형")
      .attr("x", 1200)
      .attr("y", -50)
      .attr("fill", this.getColor(1))
      .attr("font-family", "Noto Sans KR")
      .style("text-anchor", "middle")
      .attr("font-size", "20px");

    this.mainsubtext8 = svg
      .append("text")
      .text("예상 의석수")
      .attr("x", 1350)
      .attr("y", -50)
      .attr("fill", this.getColor(1))
      .attr("font-family", "Noto Sans KR")
      .style("text-anchor", "middle")
      .attr("font-size", "20px");
  }
  componentWillMount() {
    // this.getQueryServerInfo();
  }

  componentDidMount() {
    this.drawChart();

    this.getMainList(1);

    this.mainSubInterval = setInterval(() => {
      this.getMainList(1);
    }, 5000);
  }

  async getMainList(num) {
    const { coronadata } = await getAllElection();

    this.SetMainDataList(coronadata);
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
    //return "#FAFAFA";
    return "#282c34";
  }

  SetMainDataList(election) {
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 450 - margin.left - margin.right,
      height = 900 - margin.top - margin.bottom;
    let electiondata = [];

    electiondata = election.electionlist;

    let data = [];
    let firstjson = { PARTY: "ELECTION", PARENT: "", cnt: "" };
    data.push(firstjson);

    electiondata.map(function (elem) {
      data.push(elem);
    });

    console.log("coronadata : ", data);

    // stratify the data: reformatting for d3.js
    var stratdata = d3
      .stratify()
      .id(function (d) {
        return d.PARTY;
      }) // Name of the entity (column name is name in csv)
      .parentId(function (d) {
        return d.PARENT;
      })(
      // Name of the parent (column name is parent in csv)
      data
    );

    //console.log("root", root)
    stratdata.sum(function (d) {
      return +(d.Num1cnt + d.Jbirye + d.Bbirye1 + d.Bbirye2);
    }); // Compute the numeric value for each entity

    console.log("root sum", stratdata);

    // Then d3.treemap computes the position of each element of the hierarchy
    // The coordinates are added to the root object above
    d3.treemap().size([width, height]).padding(4)(stratdata);

    //this.SetElectionInfo(stratdata);
    this.SetElectionInfoAnother(stratdata);
    this.SetElectionList(electiondata);
  }
  SetElectionList(electiondata) {
    electiondata.sort(function (a, b) {
      if (Number(a.PARTYNUM) == Number(b.PARTYNUM)) {
        // if (Number(a.Cnt) == Number(b.Cnt)) {
        var r1 = 0;
        var r2 = 0;
        return r2 - r1;
      } else {
        return Number(a.PARTYNUM) - Number(b.PARTYNUM);
        // return Number(b.Cnt) - Number(a.Cnt);
      }
    });

    let svg = d3.select(".mainlist");

    let barsecond = svg.selectAll(".barlist").data(electiondata, function (d) {
      return d.PARTY;
    });

    var barEntersecond = barsecond
      .enter()
      .insert("g", ".axislist")
      .attr("class", "barlist")
      .attr("transform", (d, i) => {
        let x = 0;
        let y = 0;

        y = i * 25;

        return "translate(" + x + "," + y + ")";
      });

    barEntersecond
      .append("rect")
      .attr("x", 0)
      .attr("class", "partycolor")
      .attr("width", 20)
      .attr("height", 20) //y.bandwidth() - 30)
      .attr("fill", function (d) {
        return d.Color;
      })
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .attr("y", -18);

    barEntersecond
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)

      .attr("font-family", "Noto Sans KR")
      .text(function (d) {
        return d.PARTY;
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "20px")
      .attr("class", "partytext")
      .attr("text-anchor", "middle")
      .attr("x", 130)
      .attr("y", 0);

    var format = ",.0f";
    barEntersecond
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "Noto Sans KR")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var cnt = d.Cnt;
        var biryepercent = d.BiryePercent;

        var nowstring = cnt + " (" + biryepercent + "%)";

        var i = d3.interpolateString("0(0) ", nowstring);

        return function (t) {
          return i(t);
          //return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "20px")
      .attr("class", "partycnt")
      .attr("text-anchor", "end")
      .attr("x", 350)
      .attr("y", 0);

    barEntersecond
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "Noto Sans KR")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var nowdata = d.Num1cnt;
        var i = d3.interpolateNumber(0, nowdata);

        return function (t) {
          return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "20px")
      .attr("class", "partynum1cnt")
      .attr("text-anchor", "middle")
      .attr("x", 450)
      .attr("y", 0);

    barEntersecond
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "Noto Sans KR")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var Jungdangpercent = d.Jungdangpercent;
        var nowstring = Jungdangpercent + "%";

        var i = d3.interpolateString("0%", nowstring);

        return function (t) {
          return i(t);
          //return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "20px")
      .attr("class", "partyjungdangpercent")
      .attr("text-anchor", "end")
      .attr("x", 650)
      .attr("y", 0);

    barEntersecond
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "Noto Sans KR")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var Yundong30suk = d.Yundong30suk;
        var Yundong30sukbanolim = d.Yundong30sukbanolim;
        var nowstring = Yundong30suk + "(" + Yundong30sukbanolim + "석)";

        var i = d3.interpolateString("0(0) ", nowstring);

        return function (t) {
          return i(t);
          //return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "20px")
      .attr("class", "partyyundongcap")
      .attr("text-anchor", "end")
      .attr("x", 800)
      .attr("y", 0);

    barEntersecond
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "Noto Sans KR")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var Janyubaevalue = d.Janyubaevalue;
        var Janyubae1 = d.Janyubae1;
        var Janyubae2 = d.Janyubae2;
        var nowstring =
          Janyubaevalue + "(" + Janyubae1 + "석," + Janyubae2 + "석)";

        var i = d3.interpolateString("0(0) ", nowstring);

        return function (t) {
          return i(t);
          //return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "20px")
      .attr("class", "partyhanyu")
      .attr("text-anchor", "end")
      .attr("x", 970)
      .attr("y", 0);

    barEntersecond
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "Noto Sans KR")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var Choguavalue = d.Choguavalue;
        var Chogua1 = d.Chogua1;
        var Chogua2 = d.Chogua2;
        var nowstring = Choguavalue + "(" + Chogua1 + "석," + Chogua2 + "석)";
        var i = d3.interpolateString("0(0석,0석)", nowstring);

        return function (t) {
          return i(t);
          //return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "20px")
      .attr("class", "partychogua")
      .attr("text-anchor", "end")
      .attr("x", 1150)
      .attr("y", 0);

    barEntersecond
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "Noto Sans KR")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var Bbiryevalue = d.Bbiryevalue; // 병립형 비례 퍼센트
        var Bbirye1 = d.Bbirye1; //병립형 비례1 병립형value 의 정수 부분
        var Bbirye2 = d.Bbirye2; //병립형 비례1로 해서 17석이 안될경우 소수점 큰 순으로
        var nowstring = Bbiryevalue + "(" + Bbirye1 + "석," + Bbirye2 + "석)";
        var i = d3.interpolateString("0(0석,0석)", nowstring);

        return function (t) {
          return i(t);
          //return d3.format(format)(i(t)); //i;
        };

        return function (t) {
          return i(t);
          //return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "20px")
      .attr("class", "partychogua")
      .attr("text-anchor", "end")
      .attr("x", 1290)
      .attr("y", 0);

    barEntersecond
      .append("text")
      .style("fill", (d) => this.getColor(d))
      .attr("fill-opacity", 0)
      .attr("font-family", "Noto Sans KR")
      .transition()
      .duration(1500)
      .textTween(function (d) {
        var Num1cnt = d.Num1cnt;
        var Jbirye = d.Jbirye;
        var Bbirye1 = d.Bbirye1;
        var Bbirye2 = d.Bbirye2;

        var total = Num1cnt + Jbirye + Bbirye1 + Bbirye2;
        var nowstring = total + "석";

        var i = d3.interpolateString("0석 ", nowstring);

        return function (t) {
          return i(t);
          //return d3.format(format)(i(t)); //i;
        };
      })
      .attr("fill-opacity", 1)
      .attr("font-size", "20px")
      .attr("class", "partychogua")
      .attr("text-anchor", "end")
      .attr("x", 1400)
      .attr("y", 0);
    // BiryePercent: 40.4;
    // Haldangjungdang: true;
    // Jungdangpercent: 47.64;
    // Yundong30suk: 6.55;
    // Yundong30sukbanolim: 7;
    // Janyubaevalue: 2.86;
    // Janyubae1: 2;
    // Janyubae2: 1;
    // Jbirye: 7;
  }

  SetElectionInfoAnother(root) {
    var svg = d3.select(".mainanother");
    //var svg = d3.select("svg");

    console.log("root.leaves()", root.leaves());
    // use this information to add rectangles:

    let treemapg = svg.selectAll(".rectG").data(root.leaves(), function (d) {
      return d.id;
    });

    var rectg = treemapg
      .enter()
      .insert("g", ".axistotal")
      .attr("class", "rectG")
      .attr("transform", function (d) {
        return "translate(" + d.x0 + "," + d.y0 + ")";
      });

    // rectg
    //   .append("clipPath")
    //   .attr("id", "clip-rect")
    //   .append("rect")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("class", "rect")
    //   //.attr("clip-path", "url(#clip-rect)")
    //   .attr("width", function (d) {
    //     return d.x1 - d.x0;
    //   })
    //   .attr("height", function (d) {
    //     return d.y1 - d.y0;
    //   })
    //   .attr("fill", "none")
    //   .attr("stroke", "white")
    //   .attr("stroke-width", "1px");

    rectg
      .append("rect")
      .attr("class", "rectclass")
      .attr("x", 0)
      .attr("y", 0)
      .attr("clip-path", "url(#clip-rect)")
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .attr("fill", function (d) {
        return d.data.Color;
      })
      .attr("stroke", "white")
      .attr("stroke-width", "1px");

    rectg
      .append("text")
      .attr("class", "recttext")
      .attr("clip-path", "url(#clip-rect)")
      .attr("x", function (d) {
        return 15;
      }) // +10 to adjust position (more right)
      .attr("y", function (d) {
        return 15;
      }) // +20 to adjust position (lower)
      .text(function (d) {
        return d.data.PARTY;
      })
      .attr("font-size", "15px")
      .attr("fill", (d) => this.getColor(d));

    let treemapupdate = treemapg
      .transition("2")
      .duration(1500)
      .ease(d3.easeLinear);

    treemapupdate.attr("transform", function (d) {
      //return `translate(${d.x0},${d.y0})`
      return "translate(" + d.x0 + "," + d.y0 + ")";
    });

    // var rectupdate = treemapg
    // .select(".rectclass")
    // .transition()
    // .duration(1500);

    treemapupdate
      .select(".rectclass")
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .style("stroke", "black");
    // .style("fill", "#69b3a2");

    treemapupdate
      .select(".recttext")
      .attr("x", function (d) {
        return 10;
      }) // +10 to adjust position (more right)
      .attr("y", function (d) {
        return 20;
      }) // +20 to adjust position (lower)
      .text(function (d) {
        return d.data.PARTY;
      });
    //.attr("font-size", "15px");
    // .attr("fill", "white");
  }

  // SetElectionInfo(root) {
  //   var svg = d3.select(".maindraw");

  //   console.log("root.leaves()", root.leaves());
  //   // use this information to add rectangles:

  //   let treemapbar = svg
  //     .selectAll(".rectclass")
  //     .data(root.leaves(), function (d) {
  //       return d.id;
  //     });

  //   treemapbar
  //     .enter()
  //     .append("rect")
  //     .attr("class", "rectclass")
  //     .attr("x", function (d) {
  //       return d.x0;
  //     })
  //     .attr("y", function (d) {
  //       return d.y0;
  //     })
  //     .attr("width", function (d) {
  //       return d.x1 - d.x0;
  //     })
  //     .attr("height", function (d) {
  //       return d.y1 - d.y0;
  //     })
  //     .style("stroke", "black")
  //     .style("fill", function (d) {
  //       return d.data.Color;
  //     });

  //   let treemapbartext = svg
  //     .selectAll(".recttext")
  //     .data(root.leaves(), function (d) {
  //       return d.id;
  //     });

  //   treemapbartext
  //     .enter()
  //     .append("text")
  //     .attr("class", "recttext")
  //     .attr("x", function (d) {
  //       return d.x0 + 10;
  //     }) // +10 to adjust position (more right)
  //     .attr("y", function (d) {
  //       return d.y0 + 20;
  //     }) // +20 to adjust position (lower)
  //     .text(function (d) {
  //       return d.data.PARTY;
  //     })
  //     .attr("font-size", "15px")
  //     .attr("fill", "white");

  //   let barupdate = treemapbar
  //     .transition("2")
  //     .ease(d3.easeLinear)
  //     .duration(1500);

  //   let bartextupdate = treemapbartext
  //     .transition("2")
  //     .ease(d3.easeLinear)
  //     .duration(1500);

  //   barupdate

  //     .attr("x", function (d) {
  //       return d.x0;
  //     })
  //     .attr("y", function (d) {
  //       return d.y0;
  //     })
  //     .attr("width", function (d) {
  //       return d.x1 - d.x0;
  //     })
  //     .attr("height", function (d) {
  //       return d.y1 - d.y0;
  //     });
  //   //.style("fill", "#69b3a2");

  //   bartextupdate
  //     //.selectAll(".recttext")
  //     .attr("x", function (d) {
  //       return d.x0 + 10;
  //     }) // +10 to adjust position (more right)
  //     .attr("y", function (d) {
  //       return d.y0 + 20;
  //     }) // +20 to adjust position (lower)
  //     .text(function (d) {
  //       return d.data.PARTY;
  //     })
  //     .attr("font-size", "15px")
  //     .attr("fill", "white");
  // }
  //static renderForecastsTable(forecasts) {
  render() {
    // console.log("characterlist" , characterlist)
    // let width = this.state.width - this.margin.left - this.margin.right;
    //let height = this.state.height - this.margin.top - this.margin.bottom;

    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 2100 - margin.left - margin.right,
      height = 1200 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    // var svg = d3.select(".mainpage")
    // .append("svg")
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    // .append("g")
    //   .attr("transform",
    //         "translate(" + margin.left + "," + margin.top + ")");
    //const { data, currentdata } = this.state;

    const style = {
      //backgroundColor: "#282c34",
      // backgroundColor: "#FFFCF7",
      backgroundColor: "#E6E7E5",
    };
    //<div style={style}>
    return (
      <div style={style}>
        <div className="mainpage">
          <svg
            width={width + margin.left + margin.right}
            //width={2550}
            height={height + margin.top + margin.bottom}
            //height={1450}
          >
            <g className="mainlist" transform={`translate( 10,130)`}></g>

            <g className="mainanother" transform={`translate( 1450,150)`}></g>
            <g
              className="maindraw"
              transform={`translate( ${margin.left},600)`}
            ></g>
          </svg>
        </div>
      </div>
    );
  }
}

//<LineChart data={data} />;
// BarGraphTest.propTypes = {
//   elementWidth: PropTypes.number.isRequired,
//   elementHeight: PropTypes.number.isRequired
// };
