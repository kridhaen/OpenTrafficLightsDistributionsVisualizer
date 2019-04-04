import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
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

const DistributionDropdown = () => (
    <Dropdown
        fluid
        selection
        options={options}
    />
);

export default DistributionDropdown;