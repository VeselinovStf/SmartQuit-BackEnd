/** 
 * Refresh User Repository
 * @namespace endpoints/refresh/user-repository 
 */
const dbContext = require('../../app-packages/db/db.data.mongodb')
const dbConnect = dbContext.getDb();

/**
 * @description Application Environment Provider
 * - Module
 */
const appConfigMod = require('../../app/app.config');

ObjectId = require('mongodb').ObjectId;


async function updateTilesAccessToken(userId, token) {
    return dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.users)
        .updateOne(
            { '_id': new ObjectId(userId), 'isLocked' : false },
            {
                $set: {
                    tilesAccessToken: token
                }
            }
        );
}

async function updateRoutesAccessToken(userId, token) {
    return dbConnect
        .collection(appConfigMod.DB_COLLECTIONS.users)
        .updateOne({ '_id': new ObjectId(userId), 'isLocked' : false }, {
            $set: {
                routesAccessToken: token
            }
        }
        );
}

/**
 * Refresh User Repository
 * @module refresh
 */
module.exports = {
    updateTilesAccessToken, updateRoutesAccessToken
}