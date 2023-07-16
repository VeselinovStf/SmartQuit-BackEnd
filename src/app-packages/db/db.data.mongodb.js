/**
 * @file Database environment configuration.
 * @author VeselinovStf 
 */

/**
 * Database Context
 * @namespace app-packages/db/data-mongodb
 * @property {module:db} Module 
 * @requires dotenv
 * @requires fs
 * @requires path
 */

/**
 * @description Database Environment
 * - Module
 */
const dbConfigMod = require('./db.config');

/**
 * @description Database Connection String
 * - Variable
 */
const url = dbConfigMod.DB_CONNECTION_STRING;

/**
 * @description Database Name
 * - Variable
 */
const database = dbConfigMod.DB_DATABASE;

/**
 * @description MongoDb Client
 * - Module
 */
var MongoClient = require('mongodb').MongoClient;

/**
 * @description Database Instance
 * - Variable
 */
var _db;

/**
 * MongoDB Connection
 * @module db
 */
module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(url, function (err, client) {
            _db = client.db(database);
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    }
};