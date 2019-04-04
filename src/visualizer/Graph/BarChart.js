import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, VerticalBarSeries, HorizontalGridLines, XAxis, YAxis} from 'react-vis';

class BarChart extends Component {

    render() {
        const {data, title} = this.props;
        return (
            <div className="BarChart">
                <p>{title}</p>
                <XYPlot height={300} width={1000} xType={"ordinal"}>
                    <HorizontalGridLines />
                    <VerticalBarSeries data={data} barWidth={0.95}/>
                    <XAxis title={"Duration (s)"}/>
                    <YAxis title={"Frequency"}/>
                </XYPlot>
            </div>
        );
    }
}

export default BarChart;