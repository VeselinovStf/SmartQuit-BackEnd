/** 
 * User Repository
 * @namespace endpoints/auth/user-repository 
 * @desc Contains functions that comunicates with database and in perticular Users.
 */
const dbContext = require('../../app-packages/db/db.data.mongodb')
const dbConnect = dbContext.getDb();

/**
 * @description Application Environment Provider
 * - Module
 */
const appConfigMod = require('../../app/app.config');

ObjectId = require('mongodb').ObjectId;

/**
 * Find user by Email
 * @param {string} userEmail 
 * @memberof endpoints/auth/user-repository
 * @returns Found User
 */
async function findUser(userEmail) {
    return dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.users)
        .findOne({ 'email': userEmail, 'isLocked': false });
}

/**
 * @description Searches in DB for Single user with specific userId, user must be not locked.
 * @param {*} userId Id Of user 
 * @memberof endpoints/auth/user-repository
 * @returns Single user or null/undefined
 */
async function findSingleUser(userId) {
    return await dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.users)
        .findOne({ '_id': new ObjectId(userId), 'isLocked': false }); // TODO: #81 Missing filter for IsLocked property
}

/**
 * @description Updates user password. User is found based on userId
 * @param {*} userId Id Of user 
 * @param {*} confirmationStatus Status of confirmation
 * @param {*} newPassword New User Password
 * @memberof endpoints/auth/user-repository
 * @returns Update status
 */
async function updatePasswordConfirmation(userId, confirmationStatus, newPassword) {
    return dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.users)
        .updateOne({ '_id': new ObjectId(userId) },
            {
                $set: {
                    confirmationStatus: confirmationStatus,
                    password, newPassword
                }
            }
        );
}

/**
 * Update Tile Access Token
 * @memberof endpoints/auth/user-repository
 */
async function updateTilesAccessToken(userId, token) {
    return dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.users)
        .updateOne(
            { '_id': new ObjectId(userId), 'isLocked': false },
            {
                $set: {
                    tilesAccessToken: token
                }
            }
        );
}

/**
 * Updates Routes access token
 * @param {string} userId 
 * @memberof endpoints/auth/user-repository
 */
async function updateRoutesAccessToken(userId, token) {
    return dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.users)
        .updateOne({ '_id': new ObjectId(userId), 'isLocked': false }, {
            $set: {
                routesAccessToken: token
            }
        }
        );
}

/**
 * Authentication User Repository Methods
 * @module auth
 */
module.exports = {
    findUser,
    updatePasswordConfirmation,
    findSingleUser,
    updateTilesAccessToken,
    updateRoutesAccessToken
}