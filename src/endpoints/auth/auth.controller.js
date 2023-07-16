/** 
 * Auth Controller
 * @namespace endpoints/auth/controller
 */
const authService = require('./auth.service');
const logger = require('../../app-packages/logger')

/**
 * api/auth [POST] Authenticate
 * @memberof endpoints/auth/controller
 * @param {Express.req} req Endpoind Request
 * @param {Express.res} res Endpoind Response
 * @param {Express.next} next Next Call
 */
async function post(req, res, next) {
    try {
        res.json(await authService.authenticate(req.body))
    } catch (err) {
        logger.error(`Authentication: Error : ${err.message}`);
        res.status(400).end();
    }
}

async function logout(req, res, next) {
    try {
        res.json(await authService.logout(req.user.data1))
    } catch (err) {
        logger.error(`Logout: Error : ${err.message}`);
        res.status(400).end();
    }
}

/**
 * Authentication Controller
 * @module auth
 */
module.exports = { 
    post,
    logout 
};
