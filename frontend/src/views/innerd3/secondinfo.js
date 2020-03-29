import * as d3 from "d3";

export const SecondGroup = (
  maininfo,
  windata,
  data2,
  graphnum,
  yAxisNAME,
  xAxisName,
  graphxpos
) => {
  console.log("secondset ", graphnum, windata);

  // if (graphnum === "First") this.firstmonth.text(nownum + "월");
  // else if (graphnum === "Second") this.secondmonth.text(nownum + "월");
  // else if (graphnum === "Third") this.thirdmonth.text(nownum + "월");
  // else if (graphnum === "Fourth") this.fourthmonth.text(nownum + "월");

  //let svgmove = d3.select(".mainFirst");
  d3.select(".mainFirst")
    .transition()
    .duration(1000)
    .attr("transform", "translate(-1900,0)");
  d3.select(".mainSecond")
    .transition()
    .duration(1000)
    .attr("transform", "translate(-1900,250)");
  d3.select(".mainThird")
    .transition()
    .duration(1000)
    .attr("transform", "translate(-1900,250)");
  d3.select(".mainFourth")
    .transition()
    .duration(1000)
    .attr("transform", "translate(-1900,250)");

  var text1 =
    maininfo.koreamonth +
    "월 " +
    maininfo.koreaday +
    "일 " +
    maininfo.koreahour +
    "시 기준";

  var text2 = "확진환자  : " + maininfo.koreacnt1 + " 명";
  var text3 = "확진환자 격리해제 : " + maininfo.koreacnt2 + " 명";
  var text4 = "사망자 : " + maininfo.koreacnt3 + " 명";
  var text5 = "검사진행 : " + maininfo.koreacnt4 + " 명";

  this.secondtest2.text(text1);
  this.secondtest3.text(text2);
  this.secondtest4.text(text3);
  this.secondtest5.text(text4);
  this.secondtest6.text(text5);

  let svg = d3.select(".main" + graphnum);
  svg
    .transition()
    .duration(1000)
    .attr("transform", "translate(0,0)");

  this.ysecond.domain(windata.map(d => d[yAxisNAME])).padding(0.1);
  //this.yfirst2.domain(data2.map(d => d[yAxisNAME])).padding(0.1);

  let barsecond = svg.selectAll(".bar" + graphnum).data(windata, function(d) {
    return d.name;
  });

  let barsecond2 = svg
    .selectAll(".bar" + graphnum + "2")
    .data(data2, function(d) {
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
        //graphxpos +
        0 +
        "," +
        //this.ysecond(d[this.state.yAxisAttributeMAIN]) +
        this.ysecond(d[yAxisNAME]) +
        ")"
      );
    });

  var barEntersecond2 = barsecond2
    .enter()
    .insert("g", ".axis" + graphnum + "2")
    .attr("class", "bar" + graphnum + "2")
    .attr("transform", d => {
      console.log(
        " y(d[yAxisNAME])",
        yAxisNAME,
        graphnum,
        this.ysecond2(d[yAxisNAME])
      );
      return (
        "translate(" +
        // this.graphXpos2 +
        //graphxpos +
        1050 +
        "," +
        //this.ysecond(d[this.state.yAxisAttributeMAIN]) +
        this.ysecond2(d[yAxisNAME]) +
        ")"
      );
    });

  barEntersecond
    .append("rect")
    .attr("x", this.xsecond(0))
    //.attr("y", d => y(d[this.state.yAxisAttribute]))
    .attr("width", 0)
    .attr("height", 20) //y.bandwidth() - 30)
    .attr("fill", d => this.getColor(d))
    .attr("y", 0)
    .attr("width", 0)
    .transition(d3.transition().duration(3000))
    .attr("width", d => this.xsecond(d[xAxisName])); //d => this.xsecond(d[this.state.xAxisAttributeWin]));

  barEntersecond2
    .append("rect")
    .attr("x", this.xsecond(0))
    //.attr("y", d => y(d[this.state.yAxisAttribute]))
    .attr("width", 0)
    .attr("height", 20) //y.bandwidth() - 30)
    .attr("fill", d => this.getColor(d))
    .attr("y", 0)
    .attr("width", 0)
    .transition(d3.transition().duration(3000))
    .attr("width", d => this.xsecond2(d[xAxisName])); //d => this.xsecond(d[this.state.xAxisAttributeWin]));

  //console.log("windata ", windata);

  var barInfoSecond = barEntersecond
    .append("text")
    .attr("x", this.xsecond(windata[windata.length - 1].value))
    //.attr("stroke", d=> getWordColor(d) )// d => getColor(d))
    //.style("fill", "#000000") //d => getWordColor(d))
    .attr("fill", "#EF8000")
    .attr("class", "barInfo" + graphnum)
    .attr("y", 135)
    .attr("stroke-width", "0px")
    .attr("fill-opacity", 0)
    .attr("font-family", "BMDOHYEON")
    .attr("font-size", function(d, i) {
      return "20px";
    })
    .transition()
    .duration(1000) //interval_time)
    .text(function(d) {
      return d.name;
    })
    .attr("x", d => {
      return d => this.xsecond(d[xAxisName]) + 10;
    })
    .attr("fill-opacity", 1)
    .attr("y", 15)
    // .attr("dy", ".5em")
    .attr("text-anchor", "end");

  var barInfoSecond2 = barEntersecond2
    .append("text")
    .attr("x", this.xsecond2(data2[data2.length - 1].value))
    //.attr("stroke", d=> getWordColor(d) )// d => getColor(d))
    //.style("fill", "#000000") //d => getWordColor(d))
    .attr("fill", "#EF8000")
    .attr("class", "barInfo" + graphnum + "2")
    .attr("y", 135)
    .attr("stroke-width", "0px")
    .attr("fill-opacity", 0)
    .attr("font-family", "BMDOHYEON")
    .attr("font-size", function(d, i) {
      return "20px";
    })
    .transition()
    .duration(1000) //interval_time)
    .text(function(d) {
      return d.name;
    })
    .attr("x", d => {
      return d => this.xsecond2(d[xAxisName]) + 10;
    })
    .attr("fill-opacity", 1)
    .attr("y", 15)
    // .attr("dy", ".5em")
    .attr("text-anchor", "end");

  // value
  barEntersecond
    .append("text")
    .attr("x", d => this.xsecond(windata[windata.length - 1].value))
    .attr("y", 50)
    .style("fill", d => this.getColor(d))
    .attr("fill-opacity", 0)
    //.attr("font-family", "Righteous")
    .attr("font-family", "BMDOHYEON")
    .attr("x", 10)
    .transition()
    .duration(3000)
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
    .attr("fill-opacity", 1)
    .attr("y", 0)
    .attr("font-size", "20px")
    .attr("class", "value" + graphnum)
    .attr("x", d => this.xsecond(d[xAxisName]) + 10)
    .attr("y", 15);

  barEntersecond2
    .append("text")
    .attr("x", d => this.xsecond2(data2[data2.length - 1].value))
    .attr("y", 50)
    .style("fill", d => this.getColor(d))
    .attr("fill-opacity", 0)
    //.attr("font-family", "Righteous")
    .attr("font-family", "BMDOHYEON")
    .attr("x", 10)
    .transition()
    .duration(3000)
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
    .attr("fill-opacity", 1)
    .attr("y", 0)
    .attr("font-size", "20px")
    .attr("class", "value" + graphnum)
    .attr("x", d => this.xsecond2(d[xAxisName]) + 10)
    .attr("y", 15);

  let barUpdatesecond = barsecond
    .transition("2")
    .duration(1000)
    .ease(d3.easeLinear);

  let barUpdatesecond2 = barsecond2
    .transition("2")
    .duration(1000)
    .ease(d3.easeLinear);

  barUpdatesecond
    .select("rect")
    //.attr("y", d => y(d[yAxisNAME]))
    .attr("height", 67) //y.bandwidth() - 10)
    .duration(3000)
    .attr("width", d => this.xsecond(d[xAxisName]));

  barUpdatesecond2
    .select("rect")
    //.attr("y", d => y(d[yAxisNAME]))
    .attr("height", 67) //y.bandwidth() - 10)
    .duration(3000)
    .attr("width", d => this.xsecond2(d[xAxisName]));

  var deformat = function(val, postfix) {
    return Number(val.replace(postfix, "").replace(/\,/g, ""));
  };
  var format = ",.0f";

  // if (graphnum === "First") {
  //   format = ",.3f";
  // }

  if (graphnum === "Third" || graphnum === "Sixth") {
    format = ",.0f";
  }

  barUpdatesecond
    .select(".value" + graphnum)
    .tween("text", function(d) {
      var self = this;
      var i = d3.interpolate(deformat(self.textContent, ""), Number(d.value));
      var prec = (Number(d.value) + "").split("."),
        round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

      return function(t) {
        self.textContent =
          d3.format(format)(Math.round(i(t) * round) / round) + "";
      };
    })
    .duration(3000)
    .attr("x", d => this.xsecond(d[xAxisName]) + 10);

  barUpdatesecond2
    .select(".value" + graphnum + "2")
    .tween("text", function(d) {
      var self = this;
      var i = d3.interpolate(deformat(self.textContent, ""), Number(d.value));
      var prec = (Number(d.value) + "").split("."),
        round = prec.length > 1 ? Math.pow(10, prec[1].length) : 1;

      return function(t) {
        self.textContent =
          d3.format(format)(Math.round(i(t) * round) / round) + "";
      };
    })
    .duration(3000)
    .attr("x", d => this.xsecond2(d[xAxisName]) + 10);

  barUpdatesecond.attr("transform", d => {
    return (
      "translate(" +
      ///this.graphXpos2 +
      0 +
      "," +
      this.ysecond(d[yAxisNAME]) +
      ")"
    );
  });

  barUpdatesecond2.attr("transform", d => {
    return (
      "translate(" +
      ///this.graphXpos2 +
      1050 +
      "," +
      this.ysecond2(d[yAxisNAME]) +
      ")"
    );
  });

  var barExit = barsecond
    .exit()
    .attr("fill-opacity", 1)
    .transition()
    .duration(1000);

  var barExit2 = barsecond2
    .exit()
    .attr("fill-opacity", 1)
    .transition()
    .duration(1000);

  barExit.attr("transform", function(d) {
    return "translate(-5000," + "0" + ")";
  });

  barExit2.attr("transform", function(d) {
    return "translate(-5000," + "0" + ")";
  });
};
