/** 
 * Smoke Service
 * @namespace endpoints/smoke/service 
 */
const dbRepository = require('./smoke.repository');
const Response = require('../../app-packages/models/response.model')
const logger = require('../../app-packages/logger')
const objectValidator = require('../../app-packages/object.validator');
const smokeRequestShema = require('./shemas/smoke.request.shema')

async function smokeCount(req) {
    try {
        const requestValidation = objectValidator(req, smokeRequestShema);
        if (!requestValidation.success) {
            logger.warn("Requested Smoke is invalid!");

            return Response.createResponse(false, "Invalid Request", 404);
        }

        const smokeDateTime = req.smokeDateTime;
        
        await dbRepository.add({
            smokeDateTime: smokeDateTime
        });

        return Response.createResponse(true, "Smoke Added to Statistics", 200);
    } catch (err) {
        logger.error(err.message);

        return Response.createResponse(false, "Invalid Request", 500);
    }
}

/**
 * Smoke Service
 * @module smoke
 */
module.exports = { smokeCount };