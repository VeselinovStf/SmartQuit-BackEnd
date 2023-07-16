/** 
 * Refresh Service
 * @namespace endpoints/refresh/service 
 */
const dbRepository = require('./refresh.repository');
const dbUserRepository = require('./user.repository');
const Response = require('../../app-packages/models/response.model')
const logger = require('../../app-packages/logger')
const tokenGeneratorUtility = require('../../app-packages/token/jwt.token.generator')
const objectValidator = require('../../app-packages/object.validator');
const refreshRequestShema = require('./shemas/refresh.request.shema')

const tokentOptions = require('../../app-packages/token/jwt.token.options').signOptions;
const refreshTokenOptions = require('../../app-packages/token/jwt.token.options').verifyRefreshOptions;

const uuid = require('uuid').v4;

async function refresh(req) {
    try {
        const requestValidation = objectValidator(req, refreshRequestShema);
        if (!requestValidation.success) {
            logger.warn("Refresh Token is required!");

            return Response.createResponse(false, "Invalid Request", 403);
        }

        const requestRefreshToken = req.refreshToken;
        let refreshTokenVerification = tokenGeneratorUtility.verifyRefreshToken(requestRefreshToken);
        if (!refreshTokenVerification.success) {
            logger.warn(`Invalid Refresh Token`);

            return Response.createResponse(false, "Invalid Request", 404);
        }

        let refreshToken = await dbRepository.getRefreshToken(requestRefreshToken);
        if (!refreshToken) {
            logger.warn("Refresh token is not in database!");

            return Response.createResponse(false, "Invalid Request", 403);
        }

        let userId = refreshToken.userId;

        await dbRepository.add({
            token: newRefreshToken.token,
            userId: userId,
        });

        await dbRepository.destroyById(refreshToken._id);

        return Response.createResponse(true, "Refreshed", 200, {
            idToken: signToken.token,
            refreshToken: newRefreshToken.token
        });


    } catch (err) {
        logger.error(err.message);

        return Response.createResponse(false, "Invalid Request", 500);
    }

}

/**
 * Refresh Service
 * @module refresh
 */
module.exports = { refresh };