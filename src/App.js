import React, { Component } from 'react';
import './App.css';
import DistributionSelector from "./visualizer/Selector/DistributionSelector.js";
import TimeGraph from "./visualizer/TimeGraph/TimeGraph.js";
import TimeBeforeChange from "./visualizer/TimeBeforeChange/TimeBeforeChange.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            {/*<TimeGraph/>*/}
          {/*<DistributionSelector />*/}
          <TimeBeforeChange/>
        </header>
      </div>
    );
  }
}

export default App;
