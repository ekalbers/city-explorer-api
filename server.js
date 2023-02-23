'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT;
const REACT_APP_WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;

app.use(cors());

/* class Forecast {
    constructor(city) {
        this.city = city.city;
        this.lat = city.lat;
        this.lon = city.lon;
    }

    cityIndex() {
        let x = 0;
        let index = -1;
        weather.forEach(item => {
            console.log('this lat: ' + this.lat + ', item lat: ' + item.lat);
            console.log('this lon: ' + this.lon + ', item lon: ' + item.lon);
            if (this.lat === item.lat && this.lon === item.lon) {
                index = x;
            }
            x++;
        });
        return index;
    }

    threeDayForecast(index) {
        console.log(index);
        console.log(weather[index]);
        let arr = weather[index].data;
        let forecast = arr.map(item => {
            return ({
                'description': 'Low of ' + String(item.low_temp) + ', high of ' + String(item.high_temp) + ' with ' + item.weather.description,
                'date': item.datetime
            });
        });
        return forecast;
    }
} */

let getForecast = (data) => {
    return data.map(item => {
        return ({
            'description': 'Low of ' + String(item.low_temp) + ', high of ' + String(item.high_temp) + ' with ' + item.weather.description,
            'date': item.datetime
        });
    });
};


app.get('/weather', async (request, response) => {
    let city = request.query;
    console.log(city);

    let proxy = {
        url: `https://api.weatherbit.io/v2.0/forecast/daily?key=${REACT_APP_WEATHER_KEY}&days=${5}&lat=${city.lat}&lon=${city.lon}`,
        method: 'GET'
    };
    let weatherForecast = await axios(proxy);
    // console.log(weatherForecast.data);
    console.log(weatherForecast.data.data);
    let fiveDayForecast = getForecast(weatherForecast.data.data);
    response.status(200).send(fiveDayForecast);
});

app.listen(PORT, () => {
    console.log('app is running');
});

