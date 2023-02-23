'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT;
const REACT_APP_WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;
const REACT_APP_MOVIE_KEY = process.env.REACT_APP_MOVIE_KEY;

app.use(cors());

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

app.get('/movies', async (request, response) => {
    let movieSearch = request.query;
    console.log(movieSearch);

    let proxy = {
        url: `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_MOVIE_KEY}&language=en-US&query=${movieSearch.city}&page=1&include_adult=false`,
        method: 'GET'
    };

    let movies = await axios(proxy);
    if (movies.total_results === 0) {
        response.status(404).send('Error: No movies found');
    } else {
        console.log(movies.data);
        response.status(200).send(movies.data.results);
    }
});

app.listen(PORT, () => {
    console.log('app is running');
});

// https://image.tmdb.org/t/p/w185/$%7Bmovie.poster_path%7D