/** 
 * JWT Configuration options
 * @namespace app-package/token/jwt-token-options
 * @desc Holds Options for JWT Creation and Verify
 * @requires ./jwt.config
 */


/**
 * JWT Configuration
 */
const authConfigMod = require('./jwt.config');

const issuer = authConfigMod.JWT_ISSUER;
const subject = authConfigMod.JWT_SUBJECT;        // TODO: Pass user email as Subject 
const audience = authConfigMod.JWT_AUDIENCE;

/**
 * Sign In Options
 */
const signOptions = {
    issuer: issuer,
    subject: subject,
    audience: audience,
    expiresIn: authConfigMod.TOKEN_EXPIRATION_TIME,
    algorithm: "RS256"
}

/**
 * Token Verify Options
 */
const verifyOptions = {
    issuer: issuer,
    subject: subject,
    audience: audience,
    expiresIn: authConfigMod.TOKEN_EXPIRATION_TIME,
    algorithm: "RS256"
}

/**
 * Refresh Token Verify Options
 */
const verifyRefreshOptions = {
    issuer: issuer,
    subject: subject,
    audience: audience,
    expiresIn: authConfigMod.JWR_REFRESH_EXPIRATION,
    algorithm: "RS256"
}

/**
 * JWT Configurations
 * @module auth
 */
module.exports = {
    signOptions,
    verifyOptions,
    verifyRefreshOptions
}