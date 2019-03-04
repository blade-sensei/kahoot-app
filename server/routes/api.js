const express = require('express');
const userController = require('./api/user');
const authController = require('./api/auth');

const router = express.Router();

router.use('/users', userController);
router.use('/auth', authController);

module.exports = router;
