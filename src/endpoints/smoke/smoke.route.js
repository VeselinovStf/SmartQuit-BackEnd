/** 
 * Smoke Routes
 * @namespace endpoints/smoke/routes 
 */
const express = require('express');
const router = express.Router();

const smokeController = require('./smoke.controller');
const auth = require('../../app-packages/token/jwt.auth.middleware');

/* POST refresh token */
router.post('', auth, smokeController.smokeCount);

/**
 * Smoke Route
 * @module smoke
 */
module.exports = router;