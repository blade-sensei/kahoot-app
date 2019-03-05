const express = require('express');
const quizzService = require('../../services/quizz.service');
const userService = require('../../services/user.service');
const logger = require('../../utils/logger');

const router = express.Router();

router.get('', async (req, res) => {
  try {
    const users = await userService.findAll();
    res.send(users);
  } catch (e) {
    logger.info(e.message);
    return res.status(500).send('not found');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const quizz = await quizzService.findById(req.params.id);
    if (quizz) {
      res.status(200);
      return res.send(quizz);
    }
    return res.status(404).send({ error: 'not found' });
  } catch (e) {
    logger.info(e.message);
    return res.status(500).send({ error: 'Internal error' });
  }
});

module.exports = router;
