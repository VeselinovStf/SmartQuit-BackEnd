/** 
 * Smoke Controller
 * @namespace endpoints/smoke/controller 
 */
const smokeService = require('./smoke.service');
const logger = require('../../app-packages/logger')

/**
 * api/smoke [POST] smokeCount
 * @memberof endpoints/smoke/controller
 * @param {Express.req} req Endpoind Request
 * @param {Express.res} res Endpoind Response
 * @param {Express.next} next Next Call
 */
async function smokeCount(req, res, next) {
    try {
        res.json(await smokeService.smokeCount(req.body))
    } catch (err) {
        logger.error(`Smoke Counter: Error : ${err.message}`);

        res.status(400).end();
    }
}

/**
 * api/smoke [POST] getAllSmokes
 * @memberof endpoints/smoke/controller
 * @param {Express.req} req Endpoind Request
 * @param {Express.res} res Endpoind Response
 * @param {Express.next} next Next Call
 */
async function getAllSmokes(req, res, next) {
    try {
        res.json(await smokeService.getAll())
    } catch (err) {
        logger.error(`Can't Get Smokes: Error : ${err.message}`);

        res.status(400).end();
    }
}

/**
 * Smoke Controller
 * @module smoke
 */
module.exports = { smokeCount, getAllSmokes };
