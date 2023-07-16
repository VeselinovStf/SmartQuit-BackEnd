/**
 * @file Application environment configuration.
 * @author VeselinovStf 
 */

/**
 * Application Environment Configuration
 * @namespace env
 * @property {module:app} Module 
 * @requires dotenv
 * @requires fs
 * @requires path
 */

/**
 * @description Environment
 * - Module
 */
require('dotenv').config()

/**
 * @description File System
 * - Module
 */
const fs = require("fs");

/**
 * @description Path
 * - Module
 */
const path = require('path');

/**
 * @description Application Environment Configuration Valirables
 * @module app
 * @example
 * const appConfigMod = require('./app.config')
 * const PORT = appConfigMod.PORT;
 * 
 */
module.exports = {
    PORT: process.env.BACKEND_PORT,
    CORS_ORIGIN_ADDRESS: process.env.BACKEND_CORS_ORIGIN_ADDRESS,
    DB_COLLECTIONS: {
        users: 'users',
        refreshTokens: 'refreshTokens',
        smokes: 'smokes'
    }
}