/** 
 * Refresh Controller
 * @namespace endpoints/refresh/controller 
 */
const refreshService = require('./refresh.service');
const logger = require('../../app-packages/logger')

async function post(req, res, next) {
    try {
        res.json(await refreshService.refresh(req.body))
    } catch (err) {
        logger(`Refresh Token: Error: ${err.message}`);
        res.status(400).end();
    }
}

/**
 * Refresh Controller
 * @module refresh
 */
module.exports = { post };
