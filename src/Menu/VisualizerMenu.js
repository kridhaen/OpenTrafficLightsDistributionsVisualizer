import React, { Component } from 'react';
import TimeGraph from "../visualizer/TimeGraph/TimeGraph";
import DistributionSelector from "../visualizer/Selector/DistributionSelector";
import TimeBeforeChange from "../visualizer/TimeBeforeChange/TimeBeforeChange";

export default class VisualizerMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            option: 1,
            title: [
                "Visualization of phase durations for 2019-05-08 for each signalGroup and signalPhase",
                "Frequency distributions for large test dataset (rendering can take some time)",
                "Visualization of the prediction error for each time to phase change for large dataset"
            ],
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(direction){
        let {option} = this.state;
        if(direction === 0){
            option--;
            if(option < 0) option=2;
        }
        else{
            option = (option+1)%3;
        }
        this.setState({
            option: option,
        });
    }

    render() {
        let {title, option} = this.state;
        return (
            <div>
            <div><button onClick={() => this.onClick(0)}>{"<-"}</button><div>{title[option]}</div><button onClick={() => this.onClick(1)}>{"->"}</button></div>
                {option === 0 && <TimeGraph/>}
                {option === 1 && <DistributionSelector />}
                {option === 2 && <TimeBeforeChange/>}
            </div>
        )
    }
}