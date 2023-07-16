/** 
 * Smoke Routes
 * @namespace endpoints/smoke/routes 
 */
const express = require('express');
const router = express.Router();

const smokeController = require('./smoke.controller');
const auth = require('../../app-packages/token/jwt.auth.middleware');

/* POST smoke */
router.post('', auth, smokeController.smokeCount);

/* GET smokes */
router.get('', auth, smokeController.getAllSmokes)

/**
 * Smoke Route
 * @module smoke
 */
module.exports = router;