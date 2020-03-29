import React, { Component } from "react";
//import BarGraphHistory from "../modules/views/bargraphhistory";
//import BarGraphHistoryLocal from "../modules/views/bargraphhistoryLocal";
import BarGraphHistoryRyuKimYang from "../modules/views/BarGraphHistoryRyuKimYang";

import * as d3 from "d3";
//import Map from "./Map";
import Maphistory from "../modules/views/Maphistory";
import LineChart from "../modules/views/linechart";
//import Grid from "@material-ui/core/Grid";
import { getData } from "../services/getdata";
import "./bargraphhistory.css";
//import csvdata from "./readme.csv";

export class BarGraphRyuKimYang extends Component {
  //displayName = CharacterInfo.name

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      config: "",
      data: [],
      linedata: [],
      currentdate: new Date("2019-01")
      // data: [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8]
    };

    // <LineChart elementWidth={600} elementHeight={270} />,
    //let { elementWidth, elementHeight } = props;

    // this.datarender = this.datarender.bind();
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
    //   this.SetData();
    // }, 1500);
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

    const { data, currentdata } = this.state;
    return (
      <div className="mainpage">
        <BarGraphHistoryRyuKimYang />
        {/* <BarGraphHistoryLocal
        // data={currentdata}
        // calldata={data}
        // elementWidth={1200}
        // elementHeight={700}
        // marginleft={50}
        // margintop={30}
        />

        Maphistory name={this.state.name} /> */}
      </div>
    );
  }
}
//<LineChart data={data} />;
// BarGraphTest.propTypes = {
//   elementWidth: PropTypes.number.isRequired,
//   elementHeight: PropTypes.number.isRequired
// };
