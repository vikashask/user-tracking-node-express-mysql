const express = require('express');
const router = express.Router();

const userTrackController = require('../controllers/userTrackController');
router.post('/page', userTrackController.getAllTrackingDetails);

module.exports = router;