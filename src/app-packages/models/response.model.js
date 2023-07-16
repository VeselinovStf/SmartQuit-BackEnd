/**
 * @file Creates Response Model.
 *  - success: Is action done with success true/false
 *  - message: action result message
 *  - status: HTTP code status
 *  - data: Default to null, the data passed based on success status
 * @author VeselinovStf 
 */

/**
 * Base Response Model
 * @namespace app-packages/models
 * 
 */

/**
 * Creates Response Model. 
 *  - success: Is action done with success true/false
 *  - message: action result message
 *  - status: HTTP code status
 *  - data: Default to null, the data passed based on success status
 */
function createResponse(success, message,  status = 500,data = null,) {
    return {
        success,
        message,
        data,
        status
    }
}

/**
 * @description Base Response Model
 * @module app-packages/models
 * @example
 * // require
 * const responseModel = require('../../app-packages/models/response.model');
 * return responseModel.createResponse(true, 'Returning Devices', 200, devices);
 */
module.exports = { createResponse };