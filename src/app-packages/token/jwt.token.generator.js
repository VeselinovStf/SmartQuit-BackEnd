/** 
 * JWT Generation/Verify 
 * @namespace app-package/token/jwt-token-generator
 * @desc Deals with JWT Tokens
 * @requires jsonwebtoken
 * @requires ../logger
 * @requires path
 * @requires ./jwt.token.options
 */
const jwt = require('jsonwebtoken');
const logger = require('../logger');

const signOptions = require('./jwt.token.options').signOptions;
const verifyOptions = require('./jwt.token.options').verifyOptions;
const verifyRefreshOptions = require('./jwt.token.options').verifyRefreshOptions;

const authConfigMod = require('./jwt.config');

/**
 * Generates new token based on userId and expiration
 * 
 * @param {object} tokenPayload Payloads included in token 
 * @param {options} option Token Expiery options
 * @memberof app-package/token/jwt-token-generator
 * @returns {token} token  Generated token, expiredAt: Time of expiration of token 
 */
function generate(tokenPayload, option) {
    var payload = {
        data1: tokenPayload.userId.toString(), // TODO: Rename this property!
        tt: tokenPayload.tilesAccessToken,
        rt: tokenPayload.routesAccessToken
    };

    const jwtBearerToken = jwt.sign(payload, authConfigMod.RSA_PRIVATE_KEY, option);

    if (!jwtBearerToken) {
        throw Error("Cant create token")
    }

    return {
        token: jwtBearerToken,
    }
}

/**
 * Verifies validity of passed Token
 * @memberof app-package/token/jwt-token-generator
 */
function verify(token) {

    try {
        var payload = jwt.verify(token, authConfigMod.RSA_PUBLIC_KEY, verifyOptions)
        return {
            code: 200,
            success: true,
            payload: payload
        }
    } catch (error) {
        logger.warn(`Token Verification Exception: ${error}`)
        if (error instanceof jwt.TokenExpiredError) {
            return {
                code: 401,
                success: false
            }
        }

        if (error) {
            return {
                code: 403,
                success: false
            }
        }

        return {
            code: 404,
            success: false
        }
    }
}

/**
 * Verifies validity of passed refresh Token
 * @memberof app-package/token/jwt-token-generator
 */
function verifyRefreshToken(token) {
    try {
        var payload = jwt.verify(token, authConfigMod.RSA_PUBLIC_KEY, verifyRefreshOptions)

        return {
            code: 200,
            success: true,
            payload: payload
        }
    } catch (error) {
        logger.warn(`Refresh Token Verification Exception: ${error}`)
        if (error instanceof jwt.TokenExpiredError) {
            return {
                code: 401,
                success: false
            }
        }

        if (error) {
            return {
                code: 403,
                success: false
            }
        }

        return {
            code: 404,
            success: false
        }
    }
}

/**
 * JWT Token Utilitie Functions
 * @module auth
 */
module.exports = { verify, verifyRefreshToken, generate }