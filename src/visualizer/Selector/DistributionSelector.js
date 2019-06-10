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
            onlineFrequencyDistribution: undefined,
            onlineTimeFrequencyDistribution: undefined,
            onlineTimeGroupedFrequencyDistribution: undefined,
        };
        this.setOption = this.setOption.bind(this);
        this.transformData = this.transformData.bind(this);
    }

    componentDidMount(){
        fetch("/Data/frequencyDistribution.json")
            .then(r => r.json())
            .then(data => {
                let parsed = frequencyDistributionParser(data);
                this.setState({
                    frequencyDistribution: {normal: parsed, cumulative: this.transformData(parsed)}
                });
            });
        fetch("/Data/timeFrequencyDistribution.json")
            .then(r => r.json())
            .then(data => {
                let parsed = timeFrequencyDistributionParser(data);
                this.setState({
                    timeFrequencyDistribution: {normal: parsed, cumulative: this.transformData(parsed)}
                });
            });
        fetch("/Data/timeGroupedFrequencyDistribution.json")
            .then(r => r.json())
            .then(data => {
                let parsed = timeGroupedFrequencyDistributionParser(data);
                this.setState({
                    timeGroupedFrequencyDistribution: {normal: parsed, cumulative: this.transformData(parsed)}
                });
            });
        // fetch("http://localhost:8080/distribution/fd")
        //     .then(r => r.json())
        //     .then(data => {
        //         let parsed = frequencyDistributionParser(data);
        //         this.setState({
        //             onlineFrequencyDistribution: {normal: parsed, cumulative: this.transformData(parsed)}
        //         });
        //     });
        // fetch("http://localhost:8080/distribution/tfd")
        //     .then(r => r.json())
        //     .then(data => {
        //         let parsed = timeFrequencyDistributionParser(data);
        //         this.setState({
        //             onlineTimeFrequencyDistribution: {normal: parsed, cumulative: this.transformData(parsed)}
        //         });
        //     });
        // fetch("http://localhost:8080/distribution/tgfd")
        //     .then(r => r.json())
        //     .then(data => {
        //         let parsed = timeGroupedFrequencyDistributionParser(data);
        //         this.setState({
        //             onlineTimeGroupedFrequencyDistribution: {normal: parsed, cumulative: this.transformData(parsed)}
        //         });
        //     });
    }

    setOption(option){
        this.setState({
            option: option
        });
    }

    transformData(data){
        let transformedData = {};
        let intervalLines = {};
        Object.keys(data).forEach((title) => {
            if(!transformedData[title]){
                transformedData[title] = {};
            }
            if(!intervalLines[title]){
                intervalLines[title] = {};
            }
            Object.keys(data[title]).forEach((subtitle) => {
                if(!transformedData[title][subtitle]){
                    transformedData[title][subtitle] = [];
                }
                if(!intervalLines[title][subtitle]){
                    intervalLines[title][subtitle] = [];
                }
                let counter = 0;
                let maxX = undefined;
                let minX = undefined;
                for(let item of data[title][subtitle]){
                    let x = Number.parseInt(item.x, 10);
                    let y = item.y;
                    counter+=y;
                    transformedData[title][subtitle].push({ x: x, y: counter});
                    if(maxX === undefined || x > maxX){
                        maxX = x;
                    }
                    if(minX === undefined || x < minX){
                        minX = x;
                    }
                }
                let interval95 = counter * 0.05;
                let minLine = [{x: minX, y: interval95}, {x: maxX, y: interval95}];
                let maxLine = [{x: minX, y: counter-interval95},{x: maxX, y: counter-interval95}];
                intervalLines[title][subtitle].push(minLine);
                intervalLines[title][subtitle].push(maxLine);
            });
        });
        return [transformedData, intervalLines];
    }

    render() {
        // let {option, frequencyDistribution, timeFrequencyDistribution, timeGroupedFrequencyDistribution} = this.state;
        // let data;
        // if(option === "frequencyDistribution"){
        //     data = frequencyDistribution;
        // }
        // else if(option === "timeGroupedFrequencyDistribution"){
        //     data = timeGroupedFrequencyDistribution;
        // }
        // else if(option === "timeFrequencyDistribution"){
        //     data = timeFrequencyDistribution;
        // }
        let { option } = this.state;
        let data = this.state[option];
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
                    <ChartContainer data={data.normal} transformed={data.cumulative[0]} intervalLines={data.cumulative[1]}/>
                </header>
            </div>
        );
    }
}

export default DistributionSelector;