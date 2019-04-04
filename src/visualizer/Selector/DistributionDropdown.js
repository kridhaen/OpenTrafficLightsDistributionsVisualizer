import React, { Component } from 'react';

class DistributionDropdown extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.options[0].value,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    options = [
        {
            key: 'frequencyDistribution',
            text: 'Dataset not grouped in time',
            value: 0
        },
        {
            key: 'timeGroupedFrequencyDistribution',
            text: 'Dataset grouped by weekend of weekday and hours',
            value: 1
        },
        {
            key: 'timeFrequencyDistribution',
            text: 'Dataset grouped every 20 minutes',
            value: 2
        }
    ];

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value);
    }


    render(){
        return (
            <select value={this.state.value} onChange={this.handleChange}>
                <option value={this.options[0].key}>{this.options[0].text}</option>
                <option value={this.options[1].key}>{this.options[1].text}</option>
                <option value={this.options[2].key}>{this.options[2].text}</option>
            </select>
        );
    }

}


export default DistributionDropdown;