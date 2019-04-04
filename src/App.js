import React, { Component } from 'react';
import './App.css';
import DistributionSelector from "./visualizer/Selector/DistributionSelector.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <DistributionSelector />
        </header>
      </div>
    );
  }
}

export default App;
