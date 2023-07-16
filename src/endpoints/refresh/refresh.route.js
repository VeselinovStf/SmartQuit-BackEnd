/** 
 * Refresh Routes
 * @namespace endpoints/refresh/routes 
 */
const express = require('express');
const router = express.Router();

const refreshController = require('./refresh.controller');

/* POST refresh token */
router.post('', refreshController.post);

/**
 * Refresh Route
 * @module refresh
 */
module.exports = router;