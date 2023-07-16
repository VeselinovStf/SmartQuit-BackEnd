/**
 * @file Database environment configuration.
 * @author VeselinovStf 
 */

/**
 * Database Environment Configuration
 * @namespace env
 * @property {module:db} Module 
 * @requires dotenv
 */

/**
 * @description Environment
 * - Module
 */
require('dotenv').config()

/**
 * Database Environment Configuration Valirables
 * @module db
 * @example
 * const dbConfigMod = require('./db.config')
 * const DB_CONNECTION_STRING = dbConfigMod.DB_CONNECTION_STRING;
 */
module.exports = {
    DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    DB_DATABASE: process.env.MONGO_DB_DATABASE_NAME,
    INITIAL_USER_EMAIL: process.env.BACKEND_INITIAL_USER_EMAIL,
    INITIAL_USER_PASSWORD: process.env.BACKEND_INITIAL_USER_PASSWORD,
    INITIAL_USER_DEVICE_ID: process.env.BACKEND_INITIAL_USER_DEVICE_ID
}