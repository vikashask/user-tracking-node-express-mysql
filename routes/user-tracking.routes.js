const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
router.post('/track-page', userController.login);

module.exports = router;