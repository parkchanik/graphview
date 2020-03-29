import React, { Component } from "react";
import BarGraphHistory from "../modules/views/bargraphhistory";
import BarGraphHistoryLocal from "../modules/views/bargraphhistoryLocal";
import * as d3 from "d3";
import Map from "./Map";
import LineChart from "../modules/views/linechart";
import { getData } from "../services/getdata";
import "./bargraphhistory.css";
import csvdata from "./readme.csv";

export class BarGraphTest extends Component {
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

    this.dataFromTSV();
  }

  dataFromTSV(path) {
    path = path || "data.tsv";
    console.log(path);

    const data = [
      { skill: "AWS DEV ASIA", value: 80 },
      { skill: "AWS DEV USA", value: 70 },
      { skill: "AWS QA ASIA", value: 45 },
      { skill: "AWS QA USA", value: 50 },
      { skill: "서버1", value: 75 },
      { skill: "서버2", value: 70 },
      { skill: "서버3", value: 65 },
      { skill: "서버4", value: 65 },
      { skill: "서버5", value: 70 },
      { skill: "서버6", value: 65 }
    ];

    d3.csv(csvdata).then(data => {
      console.log("data", data);
      this.setState({ data: data });
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

  componentDidMount() {
    // const { config, data } = this.state;
    //console.log("didmoun data ", data);
    //console.log("BarGraphHistory componentDidMount", config);
    //this.datarender(data);

    // let timter = setInterval(() => {
    //   this.SetData(data);
    // }, 1500);
    let timter = setInterval(() => {
      //  this.getQueryServerInfo();
      this.SetData();
    }, 1500);
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
        <BarGraphHistory
          data={currentdata}
          // calldata={data}
          // elementWidth={1200}
          // elementHeight={700}
          // marginleft={50}
          // margintop={30}
        />

        <Map name={this.state.name} />
      </div>
    );
  }
}
//<LineChart data={data} />;
// BarGraphTest.propTypes = {
//   elementWidth: PropTypes.number.isRequired,
//   elementHeight: PropTypes.number.isRequired
// };
