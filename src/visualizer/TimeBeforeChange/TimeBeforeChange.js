import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';

export default class TimeBeforeChange extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: undefined,
        };
    }

    componentDidMount() {
        fetch(process.env.PUBLIC_URL + "/Data/full_previous_testsuite_run.json") //optionally fetch "http://localhost:8080/analytics" if local OpenTrafficLightsPrediction server is running TestSuite
            .then(r => r.json())
            .then(data => {
                this.setState({
                    data: data,
                });
            });
    }

    render() {
        let {data} = this.state;
        if(!data){
            return (
                <div>
                    waiting
                </div>
            );
        }
        return (
            <div>
                {
                    Object.keys(data).map((signalGroup) => {
                        return Object.keys(data[signalGroup]).map((signalPhase) => {
                            return Object.keys(data[signalGroup][signalPhase]).map((distributionType) => {
                                return Object.keys(data[signalGroup][signalPhase][distributionType]).map((predictionType) => {
                                    // if(distributionType !== "tfd" || predictionType !== "median"){
                                    //     return null;
                                    // }
                                    if( !data[signalGroup][signalPhase][distributionType][predictionType].abs_e_result_time_list){
                                        return null;
                                    }
                                    let transformed = [];
                                    data[signalGroup][signalPhase][distributionType][predictionType].abs_e_result_time_list.forEach((item) => {
                                        item.x = Number.parseInt(item.x, 10);
                                       if(item.x < 200){
                                           transformed.push(item);
                                       }
                                    });
                                    return (
                                        <div>{signalGroup+" "+signalPhase+" "+distributionType+" "+predictionType}
                                            <XYPlot width={400} height={300} xType={"linear"} >
                                                <HorizontalGridLines />
                                                <VerticalGridLines />
                                                <XAxis title={"Tijd tot faseovergang (s)"}/><YAxis title={"MAE (s)"}/>
                                                {/*<XAxis title={"Time before phase change (s)"}/><YAxis title={"MAE (s)"}/>*/}
                                                <LineMarkSeries data={transformed} size={2}/>
                                            </XYPlot>
                                        </div>
                                    );
                                });
                            });
                        });
                    })
                }
            </div>
        );
    }
}


