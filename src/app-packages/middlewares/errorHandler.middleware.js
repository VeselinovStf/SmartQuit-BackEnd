/**
 * @file Handles Global Exception catch on Express Request/Responses. Supports Logging to <a href="module-app-packages_logger.html"> Logger </a> and return of <a href="app-packages_models.html">Response Model</a>
 * @author VeselinovStf 
 */

/**
 * Error Handling Middleware.
 * @namespace app-packages/middlewares
 * @requires ../logger
 * @requires ../models/response.model
 */

/**
 * @description Application Logger
 * Object
 * @type {object}
 */
const logger = require('../logger');

/**
 * @description Response Model
 * Object
 * @type {object} {  success, message, data, status}
 */
const responseModel = require('../models/response.model');

/**
 * @description Error Handling Middleware.
 * @module app-packages/middlewares
 * @example
 * // Add middleware to Express.app.use function
 * app.use(require('../app-packages/middlewares/errorHandler.middleware'))
 * 
 * @param {Express.err} err Express.err - The encountered error
 * @param {Express.req} req Express.req - HTTP Request
 * @param {Express.res} res Express.res - HTTP Response
 * @param {Express.next} next Express.next - Next Middleware in line
 * @returns HTTP Response with the Response model or continues request pipeline
 */
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
    const errorStatusCode = err.statusCode || 500;
    logger.error(err.message);
    logger.error(err.stack);
    res.status(errorStatusCode).json(
        responseModel.createResponse(false, 'Error Accures', 404)
    );

    return;
};