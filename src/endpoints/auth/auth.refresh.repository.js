/** 
 * Refresh Repository
 * @namespace endpoints/auth/refresh-repository
 */
const dbContext = require('../../app-packages/db/db.data.mongodb')
const dbConnect = dbContext.getDb();

/**
 * @description Application Environment Provider
 * - Module
 */
const appConfigMod = require('../../app/app.config');

ObjectId = require('mongodb').ObjectId;

async function getRefreshToken(requestToken) {
    return await dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.refreshTokens)
        .findOne({ 'token': requestToken });
}

async function destroyById(id) {
    let ids = [id]
    return await destroyByIds(ids)
}

/**
 * 
 * @param {*} requestIdsArray Array of Id's to delete 
 * @returns Deleted Result
 */
async function destroyByIds(requestIdsArray) {
    return await dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.refreshTokens)
        .deleteMany({ _id: { $in: requestIdsArray } });
}


async function add(refreshToken) {
    const collection = await dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.refreshTokens);

    await collection
        .insertOne(refreshToken);

    return refreshToken;
}

async function getUserRefreshTokens(userId) {
    return await dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.refreshTokens)
        .find({ 'userId': new ObjectId(userId) })
        .toArray();
}

/**
 * Authentication Refresh Repository Methods
 * @module auth
 */
module.exports = {
    getRefreshToken,
    add,
    getUserRefreshTokens,
    destroyByIds,
    destroyById
}