const express = require('express');
const router = express.Router();

const userTrackRoutes = require('./user-tracking.routes');
const userRoutes = require('./user.routes');

router.use('/user', userRoutes);
router.use('/user-track', userTrackRoutes);

module.exports = router;
