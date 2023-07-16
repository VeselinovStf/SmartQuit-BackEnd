/** 
 * Smoke Repository
 * @namespace endpoints/smoke/smoke-repository 
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
 * @memberof endpoints/smoke/controller
 * @param {object} smoke Smoke To insert
 */
async function add(smoke) {
    const collection = await dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.smokes);

    await collection
        .insertOne(smoke);

    return smoke;
}

/**
 * Smoke Repository
 * @module smoke
 */
module.exports = {
    add,
}