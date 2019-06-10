import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, VerticalBarSeries, LineSeries, LineMarkSeries, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import {timeFrequencyDistributionParser} from "../Selector/Parser";
import BarChart from "../Graph/BarChart";

export default class TimeGraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: undefined,
            showSeriesOnly: undefined
        };
        this.onSeriesClick = this.onSeriesClick.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
    }

    componentDidMount() {
        fetch("/Data/durations_big.json") //optionally fetch "http://localhost:8081/durations" if local OpenTrafficLightsPrediction server is running TestSuite ShowPhaseDurationOverTime
            .then(r => r.json())
            .then(data => {
                let result = {};
                Object.keys(data).forEach((sg)=> {
                    if(!result[sg]){
                        result[sg] = {};
                    }
                    Object.keys(data[sg]).forEach((sf) => {
                       result[sg][sf] = this._transformData(data[sg][sf]);
                    })
                });
                this.setState({
                    data: result,
                });
            });
    }

    onSeriesClick(series){
        this.setState({
            showSeriesOnly: series,
        });
    }

    onResetClick(){
        this.setState({
            showSeriesOnly: undefined,
        });
    }

    _transformData(data){
        let newdata = [];
        for(let item of data){
            item.y < 200 && newdata.push({x: new Date(item.x), y: item.y});
        }
        return newdata;
    }

    render() {
        let {data, showSeriesOnly} = this.state;
        return <div><button onClick={this.onResetClick}>Reset Graph</button>{showSeriesOnly && <div>{showSeriesOnly}</div>}<XYPlot height={1000} width={1600} xType={"time"} >
            <HorizontalGridLines />
            {data && Object.keys(data).sort().map((title) => {return Object.keys(data[title]).sort().map((subtitle) =>{
                // if(showSeriesOnly === undefined){
                //     return (
                //         <LineMarkSeries data={data[title][subtitle]} onSeriesClick={(event) => {this.onSeriesClick(title+" "+subtitle)}} />
                //     )
                // }
                // else if(showSeriesOnly === title+" "+subtitle){
                //     return (
                //         <LineMarkSeries data={data[title][subtitle]} onSeriesClick={(event) => {this.onSeriesClick(title+" "+subtitle)}} />
                //     )
                // }
                return (
                    <LineMarkSeries data={data[title][subtitle]} onSeriesClick={(event) => {this.onSeriesClick(title+" "+subtitle)}} opacity={showSeriesOnly ? showSeriesOnly === title+" "+subtitle ? 1 : 0.1 : 1} />
                )
            })})}
            <XAxis title={"Time"}/>
            <YAxis title={"Duration (s)"}/>
        </XYPlot></div>
    }
}
