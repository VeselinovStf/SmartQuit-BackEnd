/** 
 * Password Routes
 * @namespace endpoints/password/routes
 * 
 * @requires express
 * @requires ./password.controller
 * @requires ../../app-packages/token/jwt.auth.middleware
 */
const express = require('express');
const router = express.Router();

const passwordController = require('./password.controller');
const auth = require('../../app-packages/token/jwt.auth.middleware');

/**
 * api/password [POST]
 * @memberof endpoints/password/routes
 * @param {Express.req} req Endpoind Request
 * @param {Express.res} res Endpoind Response
 * @param {Express.next} next Next Call
 */
router.post('', auth, passwordController.initialPasswordChange);

/**
 * Password Router
 * @module auth
 */
module.exports = router;