const express = require('express');
const userController = require('./api/user');
const authController = require('./api/auth');
const quizzControler = require('./api/quizz.controller');
const gameController = require('./api/game.controller');

const router = express.Router();

router.use('/users', userController);
router.use('/auth', authController);
router.use('/quizz', quizzControler);
router.use('/game', gameController);

module.exports = router;
