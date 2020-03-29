import React, { Component } from "react";
import BarGraphHistory from "../modules/views/bargraphhistory";
import * as d3 from "d3";
import "./bargraphhistory.css";

export class GraphTest extends Component {
  //displayName = CharacterInfo.name

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      config: "",
      data: []
      // data: [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8]
    };

    // <LineChart elementWidth={600} elementHeight={270} />,
    //let { elementWidth, elementHeight } = props;

    // this.datarender = this.datarender.bind();
  }

  componentWillMount() {
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

    this.setState({ data: data });

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
    const { config, data } = this.state;

    //console.log("BarGraphHistory componentDidMount", config);
    //this.datarender(data);

    let timter = setInterval(() => {
      this.SetData(data);
    }, 1500);
  }

  SetData(data) {
    // data.shift();

    data.map(d => {
      if (d.skill == "AWS DEV ASIA") {
        //console.log("dddddddddddddddd");
        d.value = Math.round(Math.random() * 100);
      }
    });

    //data.push(Math.round(Math.random() * 100));
    this.setState({ data: data });

    //this.datarender(data);
  }

  //static renderForecastsTable(forecasts) {
  render() {
    // console.log("characterlist" , characterlist)

    const { data } = this.state;
    return (
      <div className="mainpage">
        <BarGraphHistory
          data={data}
          // calldata={data}
          // elementWidth={1200}
          // elementHeight={700}
          // marginleft={50}
          // margintop={30}
        />
      </div>
    );
  }
}

// BarGraphTest.propTypes = {
//   elementWidth: PropTypes.number.isRequired,
//   elementHeight: PropTypes.number.isRequired
// };
