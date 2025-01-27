const winston = require('winston');
require('express-async-errors'); // to handle async errors in the application


module.exports = function () {
    winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true })); // to log errors in the console
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));  // to log errors in a file
    
    process.on('uncaughtException', (ex) => {  // to handle any uncaught exceptions in the application
      console.log('WE GOT AN UNCAUGHT EXCEPTION');
      winston.error(ex.message, ex);
      process.exit(1); // stops the application
    });
    
    process.on('unhandledRejection', (ex) => {  // to handle any unhandle rejections from any promise  in the application
      console.log('WE GOT AN UNCAUGHT Rejection');
      winston.error(ex.message, ex);
      process.exit(1); // stops the application
    });
}