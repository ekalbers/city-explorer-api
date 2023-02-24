'use strict';

const axios = require('axios');
const REACT_APP_MOVIE_KEY = process.env.REACT_APP_MOVIE_KEY;

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
};

const movieRequest = async (request, response) => {
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
};

module.exports = movieRequest;
