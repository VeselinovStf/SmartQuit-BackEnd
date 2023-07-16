/**
 * @file Main Application Startup Point, Setting up and Running The Server
 * @author VeselinovStf 
 */

/**.
 * Main Application Entrypoint
 * 
 * @namespace app/app
 */
const express = require('express');
const app = express();

/**.
 * Application Security Headers Functionality
 *
 * @requires ./src/app/app.security
 * @function appSecurityHeaders
 */
const appSecurityHeaders = require('./src/app/app.security');
/**.
 * Application Middlewares Functionality
 *
 * @requires ./src/app/app.middlewares
 * @function appMiddlewares
 */
const appMiddlewares = require('./src/app/app.middlewares');
/**.
 * Application Setup Configuration
 *
 * @requires ./src/app/app.setup
 * @function appSetupFunctions
 */
const appSetupFunctions = require('./src/app/app.setup');

/**.
 * Application Server Functionality
 *
 * @requires ./src/app/app.server
 * @function appServer
 */
const appServer = require('./src/app/app.server');

/**.
 * Application Startup Set-Up
 *
 * @module app
 */

/**
 *  Configure Security headers.
 */
appSecurityHeaders(app);

/**.
 *  Configure Middleware.
 */
appMiddlewares(app);

/**.
 *  Configure Dev Logger set up.
 */
appSetupFunctions(app);

/**.
 * Run Server.
 */
appServer(app);

