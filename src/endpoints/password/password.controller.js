/** 
 * Password Controller
 * @namespace endpoints/password/controller 
 */
const passwordService = require('./password.service');
const logger = require('../../app-packages/logger')

/**
 * api/password [POST] initialPasswordChange
 * @memberof endpoints/password/controller
 * @param {Express.req} req Endpoind Request
 * @param {Express.res} res Endpoind Response
 * @param {Express.next} next Next Call
 */
async function initialPasswordChange(req, res, next) {
    try {
        res.json(await passwordService.initialPasswordChange(req.body))
    } catch (err) {
        logger.error(`Password Change: Error : ${err.message}`);

        res.status(400).end();
    }
}

/**
 * Password Controller
 * @module auth
 */
module.exports = { initialPasswordChange };
