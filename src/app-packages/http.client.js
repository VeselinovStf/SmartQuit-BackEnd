/** 
 * HTTP Client Abstraction
 * @namespace app-package/http-client
 * @desc Contains methods for HTTP Calls.
 * @property {module:app-packages/http-client} Module
 * @requires axios
 */

const axios = require("axios");

/**
 * [GET] HTTP Call
 * @param {string} url URL Address to call
 * @param {object} params To pass with call
 * @memberof app-package/http-client
 * @returns Response of call
 */
async function getWithParams(url, params) {
    if (!url || url.length == 0 || !params) {
        throw `Invalid Params: ${url}`
    }

    const response = await axios.get(url, { params: params });
    return response;
}

/**
 * [GET] Image 
 * @param {*} url URL to call
 * @memberof app-package/http-client
 * @returns Response image as base64 string
 */
async function getImage(url) {
    if (!url) {
        throw `Invalid Params: ${url}`
    }

    const response = await axios.get(url, { responseType: 'arraybuffer' });

    if (!response) {
        throw `Invalid Response: ${url} : ${response}`
    }

    const buffer64 = Buffer.from(response.data, 'binary');

    if (!buffer64) {
        throw `Invalid Buffer: ${url} : ${response.data}`
    }

    return buffer64;
}

/**
 * Validate object ageins shema
 * @module app-packages/http-client
 */
module.exports =
{
    /**
     * @member getWithParams
     */
    getWithParams,
     /**
     * @member getImage
     */
    getImage
}