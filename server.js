'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const weatherRequest = require('./lib/weather');
const movieRequest = require('./lib/movies');

const PORT = process.env.PORT;

app.use(cors());

app.get('', (request, response) => {
    response.status(200).send('use this api to get weather and movie information about a city');
});

app.get('/weather', (request, response) => {
    console.log('weather');
    weatherRequest(request, response);
});

app.get('/movies', (request, response) => {
    movieRequest(request, response);
});

app.listen(PORT, () => {
    console.log('app is running');
});

// https://image.tmdb.org/t/p/w185/$%7Bmovie.poster_path%7D
