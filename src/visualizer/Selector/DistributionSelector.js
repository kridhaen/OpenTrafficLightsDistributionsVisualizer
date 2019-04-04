import React, { Component } from 'react';
import ChartContainer from "../Graph/ChartContainer";
import DistributionDropdown from "./DistributionDropdown";
import {frequencyDistributionParser, timeFrequencyDistributionParser, timeGroupedFrequencyDistributionParser} from "./Parser.js";

class DistributionSelector extends Component {
    constructor(props){
        super(props);
        this.state = {
            option: "frequencyDistribution",
            frequencyDistribution: undefined,
            timeFrequencyDistribution: undefined,
            timeGroupedFrequencyDistribution: undefined,
        };
        this.setOption = this.setOption.bind(this);
    }

    componentDidMount(){
        fetch("/Data/frequencyDistribution.json")
            .then(r => r.json())
            .then(data => {
                this.setState({
                    frequencyDistribution: frequencyDistributionParser(data)
                });
            });
        fetch("/Data/timeFrequencyDistribution.json")
            .then(r => r.json())
            .then(data => {
                this.setState({
                    timeFrequencyDistribution: timeFrequencyDistributionParser(data)
                });
            });
        fetch("/Data/timeGroupedFrequencyDistribution.json")
            .then(r => r.json())
            .then(data => {
                this.setState({
                    timeGroupedFrequencyDistribution: timeGroupedFrequencyDistributionParser(data)
                });
            });
    }

    setOption(option){
        this.setState({
            option: option
        });
    }

    render() {
        let {option, frequencyDistribution, timeFrequencyDistribution, timeGroupedFrequencyDistribution} = this.state;
        let data;
        if(option === "frequencyDistribution"){
            data = frequencyDistribution;
        }
        else if(option === "timeGroupedFrequencyDistribution"){
            data = timeGroupedFrequencyDistribution;
        }
        else if(option === "timeFrequencyDistribution"){
            data = timeFrequencyDistribution;
        }
        console.log(data);
        if(!data){
            return (
                <div>
                    <DistributionDropdown onChange={this.setOption}/>
                </div>
            );
        }
        return (
            <div className="DistributionSelector">
                <DistributionDropdown onChange={this.setOption}/>
                <header className="App-header">
                    <ChartContainer data={data}/>
                </header>
            </div>
        );
    }
}

export default DistributionSelector;