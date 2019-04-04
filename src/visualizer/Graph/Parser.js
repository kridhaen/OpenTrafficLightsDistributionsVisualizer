export function timeGroupFrequencyDistributionParser(distribution) {

}

export function timeFrequencyDistributionParser(distribution) {

}

export function frequencyDistributionParser(distribution) {
    let output = {};
    Object.keys(distribution).forEach((signalGroup) => {
        output[signalGroup] = {};
        Object.keys(distribution[signalGroup]).forEach((signalPhase) => {
            output[signalGroup][signalPhase] = [];
            Object.keys(distribution[signalGroup][signalPhase]).forEach((duration) => {
                output[signalGroup][signalPhase].push({x: duration, y: distribution[signalGroup][signalPhase][duration]});
            });
        });
    });
    return output;
}