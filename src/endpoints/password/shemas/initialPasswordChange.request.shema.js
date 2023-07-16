/** 
 * Auth Request Shema
 * @namespace endpoints/password/shemas/initialPasswrdChange-request
 */

/**
 * Represent model shema validation. Properties Validations
 * @memberof endpoints/password/shemas/initialPasswrdChange-request
 */
const initialPasswordChangeRequestShema = {
    email: function (value) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    },
    oldPassword: function (value) {
        return /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/.test(value);
    },
    newPassword: function (value) {
        return /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/.test(value);
    }
}

/**
 * Initial Password Change Request Shema Model
 * @module auth
 */
module.exports = initialPasswordChangeRequestShema;