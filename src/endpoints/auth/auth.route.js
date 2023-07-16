/** 
 * Route
 * @namespace endpoints/auth/routes
 */
const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const auth = require('../../app-packages/token/jwt.auth.middleware');

/* POST authentication */
router.post('', authController.post);

/* POST logout */
router.post('/logout/', auth, authController.logout);

/**
 * Authentication Routes Endpoind Configuration
 * @module auth
 */
module.exports = router;