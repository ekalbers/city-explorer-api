'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const getForecast = require('./weather');
const getMovies = require('./movies.js');

const PORT = process.env.PORT;
const REACT_APP_WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;
const REACT_APP_MOVIE_KEY = process.env.REACT_APP_MOVIE_KEY;

app.use(cors());

/* let getForecast = (data) => {
    return data.map(item => {
        return ({
            'description': 'Low of ' + String(item.low_temp) + ', high of ' + String(item.high_temp) + ' with ' + item.weather.description,
            'date': item.datetime
        });
    });
};

let getMovies = (data) => {
    let x = 0;
    return data.map(item => {
        x++;
        return ({
            'key': x,
            'Title': item.title,
            'Overview': item.overview
        });
    });
}; */

app.get('', async (request, response) => {
    response.status(200).send('use this api to get weather and movie information about a city');
});


app.get('/weather', async (request, response) => {
    let city = request.query;
    console.log(city.lat);

    if (!city.lat) {
        response.status(404).send('no lat or lon for test');
    } else {
        let proxy = {
            url: `https://api.weatherbit.io/v2.0/forecast/daily?key=${REACT_APP_WEATHER_KEY}&days=${5}&lat=${city.lat}&lon=${city.lon}`,
            method: 'GET'
        };
        let weatherForecast = await axios(proxy);
        // console.log(weatherForecast.data);
        console.log(weatherForecast.data.data);
        let fiveDayForecast = getForecast(weatherForecast.data.data);
        response.status(200).send(fiveDayForecast);
    }
});

app.get('/movies', async (request, response) => {
    let movieSearch = request.query;
    console.log(movieSearch);

    let proxy = {
        url: `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_MOVIE_KEY}&language=en-US&query=${movieSearch.city}&page=1&include_adult=false`,
        method: 'GET'
    };

    let movieData = await axios(proxy);
    console.log(proxy);
    if (movieData.total_results === 0) {
        response.status(404).send('Error: No movies found');
    } else {
        console.log(movieData.data);
        let movies = getMovies(movieData.data.results);
        response.status(200).send(movies);
    }
});

app.listen(PORT, () => {
    console.log('app is running');
});

// https://image.tmdb.org/t/p/w185/$%7Bmovie.poster_path%7D
