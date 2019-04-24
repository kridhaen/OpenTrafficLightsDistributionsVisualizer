import React, { Component } from 'react';
import BarChart from "./BarChart";

class ChartContainer extends Component {

    render() {
        let {data} = this.props;
        return (
            <div className="ChartContainer ">
                {Object.keys(data).sort().map((title) => {return Object.keys(data[title]).sort().map((subtitle) =>{
                    return <BarChart data={data[title][subtitle]} title={title+" "+subtitle}/>
                })}
                )}
            </div>
        );
    }
}

export default ChartContainer;