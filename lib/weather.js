'use strict';

const axios = require('axios');
const REACT_APP_WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;

const getForecast = (data) => {
    return data.map(item => {
        return ({
            'description': 'Low of ' + String(item.low_temp) + ', high of ' + String(item.high_temp) + ' with ' + item.weather.description,
            'date': item.datetime
        });
    });
};

const weatherRequest = async (request, response) => {
    console.log(request);
    let city = request.query;
    console.log(request.query);
    console.log(city.lat);

    if (!city.lat) {
        response.status(404).send('no lat or lon for test');
    } else {
        let proxy = {
            url: `https://api.weatherbit.io/v2.0/forecast/daily?key=${REACT_APP_WEATHER_KEY}&days=${5}&lat=${city.lat}&lon=${city.lon}`,
            method: 'GET'
        };
        let weatherForecast = await axios(proxy);
        console.log(weatherForecast);
        let fiveDayForecast = getForecast(weatherForecast.data.data);
        response.status(200).send(fiveDayForecast);
    }
};

module.exports = weatherRequest;

