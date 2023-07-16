const appConfigMod = require('./app.config');
const bodyParser = require("body-parser");
const cors = require("cors")

/**
 * Application middlewares
 * @namespace app/middleware
 * 

 */

/**
 * Applies all middlewares
 * @module app
 * @param {Express} app Express app 
 */
module.exports = function (app) {
    app.use(bodyParser.json())

    var corsOptions = {
        origin: appConfigMod.CORS_ORIGIN_ADDRESS,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }

    app.use(cors(corsOptions))
}