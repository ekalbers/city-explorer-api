'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./weather.json');
const app = express();

const PORT = process.env.PORT;

app.use(cors());

class Forecast {
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
}

app.get('/weather', (request, response) => {
    let city = request.query;
    console.log(city);
    let weatherReport = new Forecast({ 'city': city.city, 'lat': Number(city.lat), 'lon': Number(city.lon) });
    let index = weatherReport.cityIndex();
    if (!(index + 1)) {
        response.status(404).send('no city found');
    } else {
        let report = weatherReport.threeDayForecast(index);
        response.status(200).send(report);
    }
});

app.listen(PORT, () => {
    console.log('app is running');
});

