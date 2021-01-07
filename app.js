const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const {config,printAllConfigurations} = require('./loaders/config');

/* Making mongoose to make use of new ES6 promise feature */
mongoose.Promise = global.Promise;
const connectionString = config.mongoDbUrl;
// Options used for connecting mongo database with mongoose
const mongooseOptions = {
    useNewUrlParser    : true,
    useCreateIndex     : true,
    useUnifiedTopology : true,
    useFindAndModify   : false
};
/* Connecting to the mongo database */
mongoose.connect(connectionString,mongooseOptions);

/* Adding event listeners of open & error for mongoose connection*/
mongoose.connection
    .once('open',()=>{
        console.log('Database connected \n'); 
        loadApplication();
    })
    .on('error',error=>{
        console.log('Failure in connecting database');
        console.log('Error message : '+error.message);
    });

/**
 * A loadApplication  method to load application
 * @author Esari praneeth kumar
 * @modifiedBy Esari praneeth kumar
 * @requires printAllConfigurations An utility method to print all configurations 
 * @requires appFileSystemLoader A loader method to manage application file system
 * @requires expressLoader A loader method to load express app with all routes 
 */
const loadApplication = () =>{
    try {
        printAllConfigurations();
        require('./loaders/appFileSystemLoader')();
        require('./loaders/expressLoader')(app);
    } catch (error) {
        console.log(error);
        console.log('Failure in loading express app');
        console.log('Error message : '+error.message);
    }
};


module.exports = app;
