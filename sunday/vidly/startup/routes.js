const express = require('express');
const genres = require('../routes/genres');
const costumers = require('../routes/costumers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const error = require('../middleware/error');


module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/costumers', costumers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/returns', returns)

    app.use(error); // to handle errors, always have this use at the end of all the routes
}