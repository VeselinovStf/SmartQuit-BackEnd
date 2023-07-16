/** 
 * Auth Request Shema
 * @namespace endpoints/auth/shemas/auth-request
 */

/**
 * Represent model shema validation. Properties Validations
 * @memberof endpoints/auth/shemas/auth-request
 */
const authenticationRequestShema = {
    email: function (value) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    },
    password: function (value) {
        return /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/.test(value);
    }
}

/**
 * Authentication Request Shema Model
 * @module auth
 */
module.exports = authenticationRequestShema;