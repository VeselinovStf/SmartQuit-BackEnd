/**
 * Password Environment Configuration
 * @namespace env
 * 
 * @requires dotenv

 */
require('dotenv').config()

/**
 * Password Environment Configuration
 * @module auth
 */
module.exports = {
        SALT_ROUND: process.env.BACKEND_SALT_ROUND,
}
