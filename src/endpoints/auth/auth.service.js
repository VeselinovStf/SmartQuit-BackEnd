/** 
 * Auth Service
 * @namespace endpoints/auth/services
 */
const dbUserRepository = require('./auth.user.repository');
const dbRefreshRepository = require('./auth.refresh.repository');
const Response = require('../../app-packages/models/response.model')
const tokenGeneratorUtility = require('../../app-packages/token/jwt.token.generator')
const logger = require("../../app-packages/logger")
const passwordManager = require("../../app-packages/password.manager")
const objectValidator = require('../../app-packages/object.validator');
const authenticationRequestShema = require('./shemas/auth.request.shema')

const tokentOptions = require('../../app-packages/token/jwt.token.options').signOptions;
const refreshTokenOptions = require('../../app-packages/token/jwt.token.options').verifyRefreshOptions;
const uuid = require('uuid').v4;

async function authenticate(req) {
    const requestValidation = objectValidator(req, authenticationRequestShema);
    const email = req.email;
    const password = req.password;

    if (!requestValidation.success) {
        logger.error(`Invalid User Request: ${requestValidation.message}`)
        return Response.createResponse(false, "Invalid User Credentials", 404);
    }

    const user = await dbUserRepository.findUser(email);

    if (!user) {
        logger.error(`User with email: ${email} : Is not found`)
        return Response.createResponse(false, "Invalid User Credentials", 404);
    }

    // User is Locked
    if (user.isLocked) {
        logger.error(`User: ${user._id} : Is Locked and try to login`)

        return Response.createResponse(false, "Invalid User Credentials", 404);
    }

    // Is password correct
    const isPasswordVerify = await passwordManager.verify(password, user.password);
    if (isPasswordVerify) {

        // Remove User Refresh Tokens
        let userRefreshTokens = await dbRefreshRepository.getUserRefreshTokens(user._id);

        if (userRefreshTokens.length > 0) {
            let deleteIds = userRefreshTokens.map(rt => {
                return rt._id;
            })

            await dbRefreshRepository.destroyByIds(deleteIds);

            logger.info(`Login User: ${user._id} : Refresh Tokens Cleared!`)
        }

        let newRefreshToken = await dbRefreshRepository.add({
            token: refreshToken.token,
            userId: user._id,
        });

        // User Password change
        let responseCode = 404;
        if (!user.passwordConfirmed) {
            logger.info(`User: ${user._id} : Is Performing first log in`)
        } else {
            responseCode = 200;
        }

        return Response.createResponse(true, "User Logged In Succesfully", responseCode, {
            idToken: signInToken.token,
            refreshToken: newRefreshToken.token
        });
    } else {
        return Response.createResponse(false, "Invalid User Credentials", 404);
    }
}

async function logout(userId) {

    if (!userId) {
        logger.error(`LogOut User: ${userId} : Parameter not valid`)

        return Response.createResponse(false, "Invalid User Id", 404);
    }

    let user = await dbUserRepository.findSingleUser(userId);

    if (!user) {
        logger.error(`LogOut User: ${userId} : Not Found`)

        return Response.createResponse(false, "Invalid User", 404);
    }

    // Remove User Refresh Tokens
    let userRefreshTokens = await dbRefreshRepository.getUserRefreshTokens(userId);

    if (userRefreshTokens.length > 0) {
        let deleteIds = userRefreshTokens.map(rt => {
            return rt._id;
        })

        await dbRefreshRepository.destroyByIds(deleteIds);

        logger.info(`LogOut User: ${userId} : Refresh Tokens Cleared!`)
    }

    return Response.createResponse(true, "User Log Out In Succesfull", 200);

}

/**
 * Authentication Service Functionality
 * @module auth
 */
module.exports = { authenticate, logout };