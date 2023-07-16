const helmet = require('helmet')

/**
 * Application Security Configuration
 * @namespace app/security
 * 
 * @param {Express} app Express app 
 */

/**
 * Adds all Security middlewares to app
 * @module app
 * 
 * @param {Express} app Express app 
 */
module.exports = function (app) {
    /*
    Disabling the X-Powered-By header does not prevent a sophisticated attacker from determining that an app is running Express. 
    It may discourage a casual exploit, but there are other ways to determine an app is running Express.
*/
    app.disable('x-powered-by')

    /*
        Security
    */
    app.use(helmet.contentSecurityPolicy());
    app.use(helmet.crossOriginEmbedderPolicy());
    app.use(helmet.crossOriginOpenerPolicy());
    app.use(helmet.crossOriginResourcePolicy());
    app.use(helmet.dnsPrefetchControl());
    app.use(helmet.expectCt());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.originAgentCluster());
    app.use(helmet.permittedCrossDomainPolicies());
    app.use(helmet.referrerPolicy());
    app.use(helmet.xssFilter());

}