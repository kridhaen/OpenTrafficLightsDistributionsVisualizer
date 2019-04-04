import React, { Component } from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import BarChart from "./BarChart";
import {frequencyDistributionParser} from "./Parser.js";

class ChartContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: undefined,
        }
    }

    componentDidMount(){
        if(this.props.data){
            this.setState({
                data: frequencyDistributionParser(this.props.data)
            });
        }
    }

    render() {
        let {data} = this.state;
        if(!data){
            return (
                <div>
                    <Segment>
                        <Dimmer active>
                            <Loader>Loading</Loader>
                        </Dimmer>
                    </Segment>
                </div>
            );  //loader does not work?
        }

        console.log(data);
        return (
            <div className="ChartContainer ">
                {Object.keys(data).map((signalGroup) => {return Object.keys(data[signalGroup]).map((signalPhase) =>{
                    return <BarChart data={data[signalGroup][signalPhase]} title={signalGroup+" "+signalPhase}/>
                })}
                )}
                {/*<BarChart data={data} title={title}/>*/}
            </div>
        );
    }
}

export default ChartContainer;