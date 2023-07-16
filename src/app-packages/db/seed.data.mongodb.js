/**
 * @file Database Initial Seading Module.
 * @author VeselinovStf 
 */

/**
 * Database Seeder
 * @namespace app-packages/db/seed
 * @property {module:db} Module 
 * @requires ../password.manager
 * @requires ./db.config
 * @requires .../../app/app.config
 * @requires ./db.data.mongodb
 */

/**
 * @description Password Encrypt/Decrypt Module
 * - Module
 */
const passwordManager = require('../password.manager');

/**
 * @description Database Environment
 * - Module
 */
const envConfigs = require('./db.config');

/**
 * @description Application Environment
 * - Module
 */
const appConfigs = require('../../app/app.config');

/**
 * @description Database Context
 * - Module
 */
const dbContext = require('./db.data.mongodb');
const dbConnect = dbContext.getDb();

ObjectId = require('mongodb').ObjectId;

/**
 * MongoDB Data Seeder
 * @module db
 * @example
 * require('../app-packages/db/seed.data.mongodb').up()
 *     .then(() => {
 *         logger.info("Synced db.");
 *     }).catch((err) => {
 *         logger.error("Failed to sync db: " + err.message);
 *     });
 */
module.exports = {
    up: async () => {
        let users = await dbConnect
            .collection(appConfigs.DB_COLLECTIONS.users)
            .find()
            .toArray();

        let userId = new ObjectId();

        // Insert initial user if not exist
        if (users.length == 0) {
            const hashedPwdOne = await passwordManager.encrypt(envConfigs.INITIAL_USER_PASSWORD, envConfigs.SALT_ROUND);

            const collection = await dbConnect
                .collection(appConfigs.DB_COLLECTIONS.users);

            // Insert entry
            await collection
                .insertOne(
                    {
                        _id: userId,
                        email: envConfigs.INITIAL_USER_EMAIL,
                        isLocked: false,
                        passwordConfirmed: true,
                        password: hashedPwdOne,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
        }
    }
}