/** 
 * Password Refresh Repository
 * @namespace endpoints/password/refresh-repository 
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
 * Add Refresh Token
 * @memberof endpoints/password/controller
 * @param {object} refreshToken Refresh Token To insert
 */
async function add(refreshToken) {
    const collection = await dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.refreshTokens);

    await collection
        .insertOne(refreshToken);

    return refreshToken;
}

/**
 * Password Refresh Repository
 * @module auth
 */
module.exports = {
    add,
}