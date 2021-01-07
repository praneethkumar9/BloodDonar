//express modules
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const compression = require( 'compression' );
const cors = require('cors');

//loggers
const logger = require('morgan');

//Express routes
const routes = require('../routes/index');


//shared modules
const responseUtil= require('../shared/responseUtil');


/**
 * A expressLoader utility method to handle all app related configuration
 * @author Esari praneeth kumar
 * @modifiedBy Esari praneeth kumar
 * @param {Object} app Express app
 * @requires express express npm module
 */
const expressLoader = (app)=>{
    app.use(
        cors()
    );
    app.use(logger('common'));
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use( compression() );
    
    //loading routes
    routes(app);
    
    // Handling  unhandled function in the express app
    process.on('unhandledRejection',(reason)=>{
        // eslint-disable-next-line no-console
        console.log(reason.message);
    });
    // Handling  uncaught exception in the express app
    process.on('uncaughtException', err => {   
        // eslint-disable-next-line no-console
        console.log(err.name, err.message);
        // eslint-disable-next-line no-console
        console.log('UNCAUGHT EXCEPTION!  Shutting down...');
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });

    
    // central error handler
    // eslint-disable-next-line no-unused-vars
    app.use(function(err, req, res , next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        return responseUtil.sendError(err,res,req);  
    });

};


module.exports = expressLoader;
