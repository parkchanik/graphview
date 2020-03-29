import React, { Component } from "react";
import * as d3 from "d3";
import "./bargraphhistory.css";

class BarGraphHistory extends Component {
  constructor(props) {
    // const { calldata } = this.props;
    super(props);
    this.state = {
      // data: [
      //   { skill: "CSS", value: 80 },
      //   { skill: "HTML", value: 70 },
      //   { skill: "JS", value: 85 },
      //   { skill: "ANGULAR", value: 90 },
      //   { skill: "REACT", value: 75 },
      //   { skill: "D3", value: 70 },
      //   { skill: "NODE JS", value: 65 },
      //   { skill: "JAVA", value: 65 },
      //   { skill: "UI DESIGN", value: 70 },
      //   { skill: "XD", value: 65 }
      // ],
      //yAxisAttribute: "skill",
      //xAxisAttribute: "value",
      yAxisAttribute: "value",
      xAxisAttribute: "date",

      width: 1000,
      height: 400
    };
    this.chartRef = React.createRef();
    this.drawChart = this.drawChart.bind(this);

    this.margin = { top: 20, right: 30, bottom: 40, left: 90 };

    this.x = d3.scaleLinear().range([0, this.state.width]);
    this.y = d3.scaleBand().range([0, this.state.height]);
  }

  drawChart() {
    //const data = this.props.data;
    const data = this.props.currentdata;

    //if (data.length == 0) return;
    console.log("drawChart", data);
    // let margin = { top: 20, right: 30, bottom: 40, left: 90 },
    let width = this.state.width - this.margin.left - this.margin.right;
    let height = this.state.height - this.margin.top - this.margin.bottom;

    let svg = d3.select(".maing");
    // Add X axis

    this.x.domain([0, 100]);
    // let x = d3
    //   .scaleLinear()
    //   .domain([0, 100])
    //   .range([0, width]);
    // svg
    //   .append("g")
    //   .attr("transform", "translate(0," + height + ")")
    //   .attr("class", "axis x")

    svg
      .select(".axisX")
      .call(d3.axisBottom(this.x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    let y = d3
      .scaleBand()
      .range([0, height])
      //.domain(this.state.data.map(d => d[this.state.yAxisAttribute]))
      // .domain(data.map(d => d[this.state.yAxisAttribute]))
      .padding(0.1);

    // svg
    //   .append("g")
    //   .attr("class", "axis y")
    svg
      .select(".axisY")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("dy", null);
  }

  componentDidMount() {
    // let width = this.getWidth();
    // let height = this.getHeight();
    // this.setState({ width: width, height: height }, () => {
    this.drawChart();
    // });
    // let resizedFn;
    // window.addEventListener("resize", () => {
    //   clearTimeout(resizedFn);
    //   resizedFn = setTimeout(() => {
    //     this.redrawChart();
    //   }, 200);
    // });
  }

  componentWillUpdate() {
    var data = [];
    data = this.props.currentdata;

    console.log("will update ", data);

    // let margin = { top: 20, right: 30, bottom: 40, left: 90 },
    const width = this.state.width - this.margin.left - this.margin.right;
    const height = this.state.height - this.margin.top - this.margin.bottom;
    // let x = d3
    //   .scaleLinear()
    //   .domain([0, 100])
    //   .range([0, width]);

    var minvalue = d3.min(data, function(d) {
      console.log("d3 min ", d.value);
      return d.value;
    });

    var maxvalue = d3.max(data, function(d) {
      //console.log("d3 max ", d.value);
      return d.value;
    });

    this.x.domain([0, maxvalue + 20]);
    // .domain(
    //   d3.extent(data, function(d) {
    //     return d.value;
    //   })
    // )
    // .range([0, this.state.width]);
    let svg = d3.select(".maing");

    svg
      .select(".axisX")
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .call(d3.axisBottom(this.x));

    // Add Y axis
    let y = d3
      .scaleBand()
      .range([0, height])
      //.domain(this.state.data.map(d => d[this.state.yAxisAttribute]))
      .domain(data.map(d => d[this.state.yAxisAttribute]))
      .padding(0.1);

    svg
      .select(".axisY")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("dy", null);

    // data.map(d => {
    //   console.log("data.map", d[this.state.yAxisAttribute]);
    // });

    let bar = svg.selectAll(".bar").data(data, function(d) {
      return d.skill;
    });

    var barEnter = bar
      .enter()
      .insert("g", ".axis")
      .attr("class", "bar")
      .attr("transform", d => {
        // console.log(
        //   "y(d[this.state.yAxisAttribute]) ",
        //   y(d[this.state.yAxisAttribute])
        // );
        return "translate(0," + y(d[this.state.yAxisAttribute]) + ")";
      });

    barEnter
      .append("rect")
      .attr("x", this.x(0))
      //.attr("y", d => y(d[this.state.yAxisAttribute]))
      .attr("width", 0)
      .attr("height", y.bandwidth() - 10)
      .attr("fill", "#DF337D")
      .transition(d3.transition().duration(1000))
      .attr("width", d => this.x(d[this.state.xAxisAttribute]));

    barEnter
      .append("text")
      .attr("x", d => this.x(d[this.state.xAxisAttribute]))
      .text(function(d) {
        return d.value;
      });

    barEnter
      .append("text")
      .attr("x", this.x(-10))
      .text(function(d) {
        return d.skill;
      });

    let barUpdate = bar
      .transition("2")
      .duration(1000)
      .ease(d3.easeLinear);

    barUpdate
      .select("rect")

      // .attr("y", d => y(d[this.state.yAxisAttribute]))
      // .attr("width", 0)
      // .attr("height", y.bandwidth() - 10)
      // .attr("fill", "#DF337D")
      // .transition(d3.transition().duration(1000))
      .attr("height", y.bandwidth() - 10)
      .attr("width", d => this.x(d[this.state.xAxisAttribute]));

    //console.log("will update data", data);
  }
  // redrawChart() {
  //   let width = this.setWidth();
  //   this.setState({ width: width });
  //   d3.select(".rowChart svg").remove();
  //   this.drawChart = this.drawChart.bind(this);
  //   this.drawChart();
  // }

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
    //let margin = { top: 20, right: 30, bottom: 40, left: 90 },
    let width = this.state.width - this.margin.left - this.margin.right;
    let height = this.state.height - this.margin.top - this.margin.bottom;

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
              <g className="axisX" transform={`translate(0,${height})`}></g>
              <g className="axisY"></g>
            </g>
          </svg>
        </div>
        <div>
          <h1> 여기는 다른 내용 입니다 </h1>
        </div>
      </div>
    );
  }
}

export default BarGraphHistory;

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
