/** 
 * App Server Abstraction
 * @namespace app/server
 * 
 * @requires app.routes'
 * @requires ../app-packages/logger
 * @requires errorhandler
 * @requires ./app.config
 * @requires ../app-packages/db/db.data.mongodb
 */

const appRoutes = require('./app.routes');
const logger = require('../app-packages/logger')
const appConfigMod = require('./app.config')
const PORT = appConfigMod.PORT;

/**
 * Runs application server in db context
 * Wrapt Mongodb
 * Add new routes in function body
 * @module app
 * @param {Express} app Express app 
 */
module.exports = function (app) {
    const mongoDb = require('../app-packages/db/db.data.mongodb')
    mongoDb.connectToServer(function () {
        appRoutes(app);

        require('../app-packages/db/seed.data.mongodb').up()
            .then(() => {
                logger.info("Synced db.");
            }).catch((err) => {
                logger.error("Failed to sync db: " + err.message);
            });

        app.listen(PORT, (req, res) => {
            logger.info(`Backend server working on ${PORT}`)
        })
    });
}