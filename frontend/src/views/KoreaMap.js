import React, { Component } from "react";
//import BarGraphHistory from "../modules/views/bargraphhistory";
import geojson from "./data/TL_SCCO_SIG.json";
//import koreageojson from "./data/korea.geojson";
import koreageojson from "./data/korea.json";
import { geoMercator, geoPath, geo, geoAlbers } from "d3-geo";
import { select } from "d3-selection";
import * as d3 from "d3";

import { getData } from "../services/getdata";
import "./bargraphhistory.css";
//import csvdata from "./readme.csv";

export class KoreaMap extends Component {
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
      height: 1400
    };
    this.drawChart = this.drawChart.bind(this);

    this.margin = { top: 20, right: 30, bottom: 40, left: 90 };
    // <LineChart elementWidth={600} elementHeight={270} />,
    //let { elementWidth, elementHeight } = props;

    // this.datarender = this.datarender.bind();
  }
  //UpdateMap() {
  //   let svgmap = d3.select(".geojson-layer");

  //   svgmap
  //     .selectAll("path")
  //     .data(geojson.features)
  //     // .enter()
  //     //.append("path")
  //     //.attr("d", path)
  //     .attr("fill", function(d, i) {
  //       console.log("path fill d", d);
  //       console.log("path fill i", i);
  //       console.log("d.district", d.properties.district);

  //       //if (d.properties.SIG_KOR_NM == "양구군") return "#123456";
  //       if (d.properties.SIG_KOR_NM == "중구") return "#543210";
  //       return "#eee";
  //     })
  //     .attr("stroke", "#0e1724");
  // }
  drawChart() {
    //const data = this.props.data;
    const data = this.state.data;

    //if (data.length == 0) return;
    console.log("drawChart", data);
    // let margin = { top: 20, right: 30, bottom: 40, left: 90 },
    let width = this.state.width - this.margin.left - this.margin.right;
    let height = this.state.height - this.margin.top - this.margin.bottom;

    let svg = d3.select(".maing");

    let svgmap = d3.select(".geojson-layer");

    //console.log("features", features);

    const widthmap = 2300;
    const heightmap = widthmap * 0.5;
    //기존꺼
    const projection = geoMercator().fitExtent(
      [
        [0, 0],
        [widthmap * 0.9, heightmap * 0.9]
      ],
      //koreageojson
      geojson
    );
    //기존껏 
    const path = geoPath().projection(projection);
    // var projection = geoAlbers();

    // var path = geoPath().projection(projection);

    console.log("geojson", geojson);

    console.log("koreageojson", koreageojson);

    // svgmap
    //   .selectAll("path")
    //   //.data(topojson.feature(zip_codes, zip_codes.objects.zip_codes).features)
    //   .data(koreageojson.features)
    //   .enter()
    //   .append("path")
    //   .attr("d", path)
    //   .attr("stroke", "#0e1724");

    svgmap
      .selectAll("path")
      .data(geojson.features)
      //.data(koreageojson.features)

      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", function(d, i) {
        console.log("path fill d", d);
        console.log("path fill i", i);
        console.log("d.district", d.properties.district);

        if (d.properties.SIG_KOR_NM == "양구군") return "#123456";
        if (d.properties.SIG_KOR_NM == "중구") return "#543210";
        return "#eee";
      })
      .attr("stroke", "#0e1724");

    //   {
    //     geojson.features.map(d => (
    //       <path
    //         key={d.properties.district}
    //         d={path(d)}
    //         fill="#eee"
    //         stroke="#0e1724"
    //         //stroke="#ffffff"
    //         strokeWidth="1"
    //         strokeOpacity="0.5"
    //         onMouseEnter={e => {
    //           console.log("e", e);
    //           console.log("e target", e.target);
    //           select(e.target).attr("fill", "#000");
    //         }}
    //         onMouseOut={e => {
    //           select(e.target).attr("fill", "#eee");
    //         }}
    //       />
    //     ));
    //   }
  }

  componentWillMount() {
    // this.getQueryServerInfo();
  }

  componentDidMount() {
    // const { config, data } = this.state;
    //console.log("didmoun data ", data);
    //console.log("BarGraphHistory componentDidMount", config);
    //this.datarender(data);
    // let timter = setInterval(() => {
    //   this.SetData(data);
    // }, 1500);
    // let timter = setInterval(() => {
    //   //  this.getQueryServerInfo();
    //   this.UpdateMap();
    // }, 3000);
    this.drawChart();
  }

  async getQueryServerInfo() {
    try {
      // console.log("getQueryServerInfo");

      const { workers } = await getData();

      this.setState({ data: workers.result });
    } catch (error) {
      console.log("error", error);
    }
  }

  SetData() {
    const { config, data } = this.state;
    // data.shift();
    //console.log("setdata ", data);

    // console.log("currentdate", this.state.currentdate);

    // console.log(
    //   "Date.parse(this.state.currentdate",
    //   Date.parse(this.state.currentdate)
    // );

    //var dateparse = new Date(this.state.currentdate);

    var nowdate = this.state.currentdate;
    console.log("nowdate  : ", nowdate);

    var getyear = nowdate.getFullYear();
    var getmonth = nowdate.getMonth() + 1;
    var monthstr = "";

    if (getmonth < 10) {
      monthstr = "0" + getmonth;
    } else {
      monthstr = "" + getmonth;
    }

    var nowdatestring = getyear + "-" + monthstr;
    console.log("nowdatestring ", nowdatestring);
    var currentdata = [];
    data.map(d => {
      //console.log("ddddddddddddd", new Date(d.date));
      //console.log("nowdate :", nowdate);
      // console.log("d.date : ", d.date);
      if (d.date == nowdatestring) {
        currentdata.push(d);
      }
    });

    var nextdate = new Date(nowdate.setMonth(nowdate.getMonth() + 1));

    this.state.currentdate = nextdate;
    console.log("currentdata", currentdata);
    //data.push(Math.round(Math.random() * 100));
    this.setState({ currentdata: currentdata });

    //this.datarender(data);
  }

  //static renderForecastsTable(forecasts) {
  render() {
    // console.log("characterlist" , characterlist)
    let width = this.state.width - this.margin.left - this.margin.right;
    let height = this.state.height - this.margin.top - this.margin.bottom;

    const { data, currentdata } = this.state;
    return (
      <div className="mainpage">
        <svg
          width={width + this.margin.left + this.margin.right}
          height={height + this.margin.top + this.margin.bottom}
        >
          <g transform={`translate(100,0)`} className="geojson-layer">
            {/* {geojson.features.map(d => (
                <path
                  key={d.properties.district}
                  d={path(d)}
                  fill="#eee"
                  stroke="#0e1724"
                  //stroke="#ffffff"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  onMouseEnter={e => {
                    console.log("e", e);
                    console.log("e target", e.target);
                    select(e.target).attr("fill", "#000");
                  }}
                  onMouseOut={e => {
                    select(e.target).attr("fill", "#eee");
                  }}
                />
              ))} */}
          </g>
        </svg>
      </div>
    );
  }
}
//<LineChart data={data} />;
// BarGraphTest.propTypes = {
//   elementWidth: PropTypes.number.isRequired,
//   elementHeight: PropTypes.number.isRequired
// };
