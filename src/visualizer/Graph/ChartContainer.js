import React, { Component } from 'react';
import BarChart from "./BarChart";

class ChartContainer extends Component {

    render() {
        let {data, transformed, intervalLines} = this.props;
        return (
            <div className="ChartContainer ">
                {Object.keys(data).sort().map((title) => {return Object.keys(data[title]).sort().map((subtitle) =>{
                    return (
                        <div className="ChartContainer_duo">
                            <BarChart data={data[title][subtitle]} title={title+" "+subtitle}/>
                            <BarChart data={transformed[title][subtitle]} lineData={intervalLines[title][subtitle]} title={"cumulative"}/>
                        </div>
                    )
                })}
                )}
            </div>
        );
    }
}

export default ChartContainer;