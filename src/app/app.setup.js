/**
 * @file Application Server Setup Module
 * @author @VeselinovStf
 */

/** 
 * App Setup Abstraction
 * @namespace app/setup
 * 
 * @desc Methods Set Up of Server Application.
 * @requires winston
 * @requires ../app-packages/logger
 * @requires errorhandler
 * @requires ../app-packages/middlewares/errorHandler.middleware
 */

const logger = require('../app-packages/logger')
const winston = require('winston')
const errorHandler = require('errorhandler')
const appErrorHandlerMiddleware = require('../app-packages/middlewares/errorHandler.middleware');
const nodeEnvironment = process.env.NODE_ENV;

/**
 * @description Setup server environment and configuration. Selects specific configuration based on nodeEnvironment
 * @module app
 * @param {Express} app Express app 
 */
module.exports = function (app) {
     /** Logging setup */
    if (nodeEnvironment !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    }

    /** Exception Handling setup */
    if (nodeEnvironment === 'development') {
        app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    }

    if (nodeEnvironment === 'production') {
        /* Error handler middleware */
        app.use(appErrorHandlerMiddleware);
    }
}