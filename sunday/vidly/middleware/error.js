// all the middleware fn error handling is done in this file
const winston = require('winston');
function error(err, req, res, next) {
    winston.error(err.message, err);

    res.status(500).send('Something failed.');
}
module.exports = error;