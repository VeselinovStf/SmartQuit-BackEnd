/**
 * Application Routes Configuration
 * @namespace app/routes
 * 
 * @param {Express} app Express app 
 */

/**
 * Adds all Endpoinds addresses to router instance
 * @module app
 * @param {Express} app Express app 
 */
module.exports = function (app) {

    /* App Routers */
    app.use('/api/auth', require('../endpoints/auth/auth.route'));
    app.use('/api/refreshtoken', require('../endpoints/refresh/refresh.route'));
    app.use('/api/initial', require('../endpoints/password/password.route')); // Password Endpoind - used only for initial password change AUTHORIZED
}