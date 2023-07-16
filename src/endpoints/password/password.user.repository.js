/** 
 * Password User Repository
 * @namespace endpoints/password/user-repository 
 * 
 * @requires ../../app-packages/db/db.data.mongodb
 */
const dbContext = require('../../app-packages/db/db.data.mongodb')
const dbConnect = dbContext.getDb();

/**
 * @description Application Environment Provider
 * - Module
 */
const appConfigMod = require('../../app/app.config');

/**
 * Find User By Email
 * @memberof endpoints/password/controller
 * @param {string} userEmail User Email
 */
async function findUser(userEmail) {
    return dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.users)
        .findOne({ 'email': userEmail,'isLocked' : false });
}

/**
 * Password User Repository
 * @module auth
 */
module.exports = {
    findUser
}