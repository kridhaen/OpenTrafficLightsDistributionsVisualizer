import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, VerticalBarSeries, LineSeries, LineMarkSeries, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import {timeFrequencyDistributionParser} from "../Selector/Parser";
import BarChart from "../Graph/BarChart";

export default class TimeGraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: undefined
        }
    }

    componentDidMount() {
        fetch("/Data/durations_small_2019-05-17.json")
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

    _transformData(data){
        let newdata = [];
        for(let item of data){
            item.y < 200 && newdata.push({x: new Date(item.x), y: item.y});
        }
        return newdata;
    }

    render() {
        let {data} = this.state;
        return <XYPlot height={1000} width={3700} xType={"time"}>
            <HorizontalGridLines />
            {data && Object.keys(data).sort().map((title) => {return Object.keys(data[title]).sort().map((subtitle) =>{
                return (
                    <LineMarkSeries data={data[title][subtitle]} />
                )
            })})}
            <XAxis title={"Time"}/>
            <YAxis title={"Duration (s)"}/>
        </XYPlot>
    }
}
