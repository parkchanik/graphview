import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./views/Layout";
import { Home } from "./views/Home";
import { Counter } from "./views/Counter";
import { BarGraphTest } from "./views/BarGraphTest";
import { BarGraphTestLocal } from "./views/BarGraphTestLocal";
import { BarGraphRyuKimYang } from "./views/BarGraphRyuKimYang";
import { BarGraphHistoryLim } from "./views/BarGraphHistoryLim";
import { BarGraphHistoryLimAVGandH } from "./views/BarGraphHistoryLimAVGandH";
import { BarGraphHistoryAndyGoden } from "./views/BarGraphHistoryAndyGoden";
import { BarGraphHistoryRKY } from "./views/BarGraphHistoryRKY";
import { BarGraphHistoryLimVSKBO7YEAR } from "./views/BarGraphHistoryLimVSKBO7YEAR";
import { BarGraphHistoryCorona } from "./views/BarGraphHistoryCorona";
import { CoronaWorldList } from "./views/CoronaWorldList";

import { MapTest } from "./views/MapTest";
import { KoreaMap } from "./views/KoreaMap";
import { Cloud } from "./views/Cloud";
//import { RectGraph } from "./views/RectGraph";
import { TreeMap } from "./views/TreeMap";
import { TreeMapElection } from "./views/TreeMapElection";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/bargraphtest" component={BarGraphTest} />
        <Route path="/map" component={MapTest} />
        <Route path="/bargraphtestLocal" component={BarGraphTestLocal} />
        <Route path="/ryukimyang" component={BarGraphRyuKimYang} />
        <Route path="/lim" component={BarGraphHistoryLim} />
        <Route path="/limavgh" component={BarGraphHistoryLimAVGandH} />
        <Route path="/andygoden" component={BarGraphHistoryAndyGoden} />
        <Route path="/RKY" component={BarGraphHistoryRKY} />
        <Route path="/koreamap" component={KoreaMap} />
        <Route path="/cloud" component={Cloud} />
        <Route path="/limvskbo7" component={BarGraphHistoryLimVSKBO7YEAR} />
        <Route path="/corona" component={BarGraphHistoryCorona} />
        <Route path="/worldcorona" component={CoronaWorldList} />

        <Route path="/treemap" component={TreeMap} />
        <Route path="/treemapelection" component={TreeMapElection} />
      </div>
    );
  }
}

// <Route path="/rectgraph" component={RectGraph} />
