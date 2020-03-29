import React, { Component } from "react";
import { render } from "react-dom";
import Map from "./Map";
import "./maptest.css";

export class MapTest extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return <Map name={this.state.name} />;
  }
}
