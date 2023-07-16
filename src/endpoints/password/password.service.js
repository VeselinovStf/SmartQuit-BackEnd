/** 
 * Password Routes
 * @namespace endpoints/password/service
 * 
 * @requires ../../app-packages/models/response.model
 * @requires ./password.refresh.repository
 * @requires ./password.user.repository
 */
const Response = require('../../app-packages/models/response.model')
const dbRefreshRepository = require('./password.refresh.repository')
const dbUserRepository = require('./password.user.repository')
const passwordManager = require('../../app-packages/password.manager')
const tokenGeneratorUtility = require('../../app-packages/token/jwt.token.generator')
const logger = require('../../app-packages/logger')
const passwordConfig = require('./password.config')
const objectValidator = require('../../app-packages/object.validator');
const initialPasswordChangeRequestShema = require('./shemas/initialPasswordChange.request.shema')

const tokentOptions = require('../../app-packages/token/jwt.token.options').signOptions;
const refreshTokenOptions = require('../../app-packages/token/jwt.token.options').verifyRefreshOptions;

ObjectId = require('mongodb').ObjectId;

/**
 * Changes initial password on not confirmed logins
 * @memberof endpoints/password/service
 * @param {Express.req} req Endpoind Request
 */
async function initialPasswordChange(req) {
    try {
        const requestValidation = objectValidator(req, initialPasswordChangeRequestShema);
        if (!requestValidation.success) {
            logger.error(`Invalid User Request: ${requestValidation.message}`)
            return Response.createResponse(false, "Invalid User Credentials", 404);
        }

        const email = req.email;
        const oldPassword = req.oldPassword;
        const newPassword = req.newPassword;

        const users = await dbUserRepository.findUser(email.trim());

        if (!users || users.length == 0) {
            logger.warn(`User with email: ${email}, is not found`);
            return Response.createResponse(false, "Invalid User Credentials", 404);
        }

        if (users.length > 1) {
            logger.error("WARNING! FOUND MORE THE ONE UNIQUE USERS")

            return Response.createResponse(false, "Invalid User Credentials", 404);
        }

        const user = users[0];

        // User is Locked
        if (user.isLocked) {
            logger.error(`User: ${user._id} : Is Locked and try to login`)

            return Response.createResponse(false, "Invalid User Credentials", 404);
        }

        const cmp = await passwordManager.verify(oldPassword, user.password);
        if (cmp) {

            if (!user.passwordConfirmed) {
                logger.info(`User: ${user._id} : Is Performing first log in password change`)

                // change password and passwordConfirmed
                const hashedPwd = await passwordManager.encrypt(newPassword, passwordConfig.SALT_ROUND);

                if (hashedPwd === user.password) {
                    logger.error(`User: ${user._id} : Is Trying same password as new`)

                    return Response.createResponse(false, "Invalid User Credentials", 404);
                }

                await dbUserRepository.updatePasswordConfirmation(user._id, true, hashedPwd);

                let newRefreshToken = await dbRefreshRepository.add(refreshToken.token);

                return Response.createResponse(true, "User Logged In Succesfully", 200, {
                    idToken: signToken.token,
                    refreshToken: newRefreshToken
                });

            } else {
                logger.error(`User: ${user._id} : TRUING TO CHANGE PASSWORD AGAIN!!!`)

                return Response.createResponse(false, "Invalid User Credentials", 404);
            }
        } else {
            return Response.createResponse(false, "Invalid User Credentials", 404);
        }
    } catch (error) {
        logger.error(`ERROR: ${error}`)

        return Response.createResponse(false, "Invalid Request" , 404);
    }

}

/**
 * Password Configuration
 * @module auth
 */
module.exports = { initialPasswordChange };