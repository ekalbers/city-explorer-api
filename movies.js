'use strict';

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

module.exports = getMovies;
