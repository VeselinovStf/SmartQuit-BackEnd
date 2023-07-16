/**
 * Represent model shema validation
 * 
 * Properties Validations
 */
const refreshRequestShema = {
    refreshToken: function (str1) {
        return str1 != null && typeof str1 === "string" && str1.length > 0;
    }
}

/**
 * Refresh Reguest Model Shema
 * @module refresh
 */
module.exports = refreshRequestShema;