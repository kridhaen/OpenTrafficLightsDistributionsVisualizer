import React, { Component } from 'react';

import ChartContainer from "../Graph/ChartContainer";

class DistributionSelector extends Component {
    constructor(props){
        super(props);
        this.state = {
            option: 0,
            frequencyDistribution: undefined,
            timeFrequencyDistribution: undefined,
            timeGroupedFrequencyDistribution: undefined,
        }
    }

    componentDidMount(){
        fetch("/frequencyDistribution.json")
            .then(r => r.json())
            .then(data => {
                this.setState({
                    frequencyDistribution: data
                });
            });
        fetch("/timeFrequencyDistribution.json")
            .then(r => r.json())
            .then(data => {
                this.setState({
                    timeFrequencyDistribution: data
                });
            });
        fetch("/timeGroupedFrequencyDistribution.json")
            .then(r => r.json())
            .then(data => {
                this.setState({
                    timeGroupedFrequencyDistribution: data
                });
            });
    }

    render() {
        let Data = this.state.frequencyDistribution;
        return (
            <div className="DistributionSelector">
                <header className="App-header">
                    <ChartContainer data={Data}/>
                </header>
            </div>
        );
    }
}

export default DistributionSelector;