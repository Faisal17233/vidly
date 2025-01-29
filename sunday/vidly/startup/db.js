const mongoose = require('mongoose');
const winston = require('winston');
//const config = require('config');


module.exports = function () {
    //const db = config.get('mongodb+srv://faisal17233:12345@cluster0.axsvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    mongoose.connect('mongodb+srv://faisal17233:12345@cluster0.axsvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => {winston.info(`Connected to MongoDB:`);})
}