/** 
 * HTTP Client Abstraction
 * @namespace app-package/object-validator
 * @desc Contains methods for HTTP Calls.
 */

/**
 * Validate object ageins shema
 * @param {object} object Object to validate against Shema
 * @param {object} schema Validation Shema Object 
 * @memberof app-package/object-validator
 * @returns true if object is falid or false for invalid
 */
function objectValidator(object, schema) {
    try {
        var errors = Object.keys(schema)
            .filter(function (key) {
                return !schema[key](object[key])
            }).map(function (key) {
                return {
                    success: false,
                    message: `${key} : is invalid; `
                }
            });

        if (errors.length > 0) {
            let msg = "";
            errors.forEach(function (err) {
                msg += err.message;
            });

            return {
                success: false,
                message: msg
            }
        } else {
            return {
                success: true
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}

/**
 * Validate object ageins shema
 * @module app-packages/object-validator
 */
module.exports = objectValidator;