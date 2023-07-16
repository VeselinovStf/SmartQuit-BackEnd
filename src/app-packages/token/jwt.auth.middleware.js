/** 
 * JWT Authentication Middleware
 * @namespace app-package/token/jwt-auth-middleware
 * @desc Adds Authentication Middleware to requests
 * @requires ./jwt.token.generator
 */

const tokenGeneratorUtility = require('./jwt.token.generator')

/**
 * JWT Authentication Middleware
 * @module auth
 */
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    var verifyResult = tokenGeneratorUtility.verify(token);

    // if token is expired return verifyResult.code
    if (verifyResult.code == 401) {
        verifyResult = tokenGeneratorUtility.verifyRefreshToken(token);
    }

    if (verifyResult.success) {
        req.user = verifyResult.payload;
        next()
    } else {
        return res.sendStatus(verifyResult.code);
    }
}