/** 
 * JWT ENV Configuration
 * @namespace env
 * @desc Maps NodeJS Environment veriables to constant
 * @requires dotenv
 * @requires fs
 * @requires path
 */

require('dotenv').config()
const fs = require("fs");
const path = require('path');

/**
 * JWT Environment Configuration
 * @module auth
 */
module.exports = {
    RSA_PRIVATE_KEY: fs.readFileSync(path.resolve(process.env.BACKEND_RSA_PRIVATE_KEY),'utf8'),
    RSA_PUBLIC_KEY: fs.readFileSync(path.resolve(process.env.BACKEND_RSA_PUBLIC_KEY),'utf8'),
    TOKEN_EXPIRATION_TIME: process.env.BACKEND_TOKEN_EXPIRATION_TIME,
    JWR_REFRESH_EXPIRATION: process.env.BACKEND_JWR_REFRESH_EXPIRATION,
    JWT_ISSUER:process.env.BACKEND_JWT_ISSUER,
    JWT_SUBJECT:process.env.BACKEND_JWT_SUBJECT,
    JWT_AUDIENCE:process.env.BACKEND_JWT_AUDIENCE
}