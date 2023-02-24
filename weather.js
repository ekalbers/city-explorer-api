'use strict';

let getForecast = (data) => {
    return data.map(item => {
        return ({
            'description': 'Low of ' + String(item.low_temp) + ', high of ' + String(item.high_temp) + ' with ' + item.weather.description,
            'date': item.datetime
        });
    });
};

module.exports = getForecast;

