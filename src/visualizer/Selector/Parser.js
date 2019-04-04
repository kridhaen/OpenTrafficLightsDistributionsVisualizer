export function timeGroupedFrequencyDistributionParser(distribution) {
    console.log("tgfd parser started");
    let output = {};
    Object.keys(distribution).forEach((signalGroup) => {
        output[signalGroup] = {};
        Object.keys(distribution[signalGroup]).forEach((signalPhase) => {
            Object.keys(distribution[signalGroup][signalPhase]).forEach((isWeekend) => {
                Object.keys(distribution[signalGroup][signalPhase][isWeekend]).forEach((hour) => {
                    let subtitle =signalPhase+ " hour: "+hour;
                    if(isWeekend === "1" ){
                        subtitle+=" weekend";
                    }
                    else{
                        subtitle+=" weekday";
                    }
                    output[signalGroup][subtitle] = [];
                    Object.keys(distribution[signalGroup][signalPhase][isWeekend][hour]).forEach((duration) => {
                        output[signalGroup][subtitle].push({x: duration, y: distribution[signalGroup][signalPhase][isWeekend][hour][duration]});
                    })
                })
            });
        });
    });
    console.log("tgfd parser ended");
    return output;
}

export function timeFrequencyDistributionParser(distribution) {
    console.log("tfd parser started");
    let output = [];
    Object.keys(distribution).forEach((signalGroup) => {
        output[signalGroup] = {};
        Object.keys(distribution[signalGroup]).forEach((signalPhase) => {
            Object.keys(distribution[signalGroup][signalPhase]).forEach((year) => {
                Object.keys(distribution[signalGroup][signalPhase][year]).forEach((month) => {
                    Object.keys(distribution[signalGroup][signalPhase][year][month]).forEach((day) => {
                        Object.keys(distribution[signalGroup][signalPhase][year][month][day]).forEach((hour) => {
                            Object.keys(distribution[signalGroup][signalPhase][year][month][day][hour]).forEach((minutes) => {
                                let subtitle = signalPhase+" "+year+"-"+month+"-"+day+" "+hour+"h third: "+minutes;
                                output[signalGroup][subtitle] = [];
                                Object.keys(distribution[signalGroup][signalPhase][year][month][day][hour][minutes]).forEach((duration) => {
                                    output[signalGroup][subtitle].push({x: duration, y: distribution[signalGroup][signalPhase][year][month][day][hour][minutes][duration]});
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    console.log("tfd parser ended");
    return output;
}

export function frequencyDistributionParser(distribution) {
    console.log("fd parser started");
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
    console.log("fd parser ended");
    return output;
}