/**
 * Represent model shema validation
 * 
 * Properties Validations
 */
const smokeRequestShema = {
    smokeDateTime: function (str1) {
        return str1 != null && str1.length > 0;
    }
}

/**
 * Refresh Reguest Model Shema
 * @module smoke
 */
module.exports = smokeRequestShema;