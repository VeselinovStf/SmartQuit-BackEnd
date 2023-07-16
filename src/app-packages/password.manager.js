/**
 * @file Handles Verify/Encrypt methods for passwords.
 * @author VeselinovStf 
 */

/**
 * @namespace app-package/password-manager
 * @requires bcrypt
 */

/**
 * @description Encryption library.
 */
const bcrypt = require('bcrypt');

/**
 * Verify that password string is same as encrypted one.
 * 
 * @example
 * // Verify Existing password
 * var passwordManager = require('../app-packages/middlewares/errorHandler.middleware'))
 * var password = "Test";
 * var user = {
 *      password: "asdasW()*&YSADHk"
 * };
 * 
 * let result = passwordManager.verify(password, user.password)
 * 
 * @param {string} data Data to check
 * @param {string} encrypted Encrypted String
 * @returns {boolean} Same/Not same
 */
async function verify(data, encrypted) {
    return await bcrypt.compare(data, encrypted);
}

/**
 * Encrypt String using salt Db
 * 
 * @example
 * // Encrypts a string or throws exception
 * let newPassword = "new_password";
 * let salt = passwordConfig.SALT_ROUND;
 * const hashedPwd = await passwordManager.encrypt(newPassword, passwordConfig.SALT_ROUND);
 * 
 * @param {string} data String to Encode
 * @param {number} saltRounds Encryption Salt Value
 * @returns {string} Hashed password or Exception
 * @throws 'Cant Encrypt'
 */
async function  encrypt(data, saltRounds){
    const salt = await bcrypt.genSalt(saltRounds);
    var hash = await bcrypt.hash(data, salt);
    if (!hash) {
        throw 'Cant Encrypt';
    }

    return hash;
}

/**
 * Password Utilities for Encription and Verify.
 * 
 * @name PasswordManager
 * @module auth
 * @exports verify,encrypt
 */
module.exports = {
    verify,
    encrypt
};