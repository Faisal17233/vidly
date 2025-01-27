const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
//const Fawn = require('fawn');
const app = express();

require('./startup/errLogs')();
require('./startup/routes')(app);
require('./startup/db')();


//$env:vidly_jwtPrivateKey="putanythinghere"
if (!config.get('jwtPrivateKey')) {
  throw new Error('FATAL ERROR: vidly_jwtPrivateKey is not defined.');
}

//throw new Error('Something failed during startup'); // to test the process.on error handle
const port = process.env.PORT || 3000;
module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));