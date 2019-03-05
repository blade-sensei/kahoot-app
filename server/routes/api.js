const express = require('express');
const userController = require('./api/user');
const authController = require('./api/auth');
const quizzControler = require('./api/quizz.controller');

const router = express.Router();

router.use('/users', userController);
router.use('/auth', authController);
router.use('/quizz', quizzControler);

module.exports = router;
