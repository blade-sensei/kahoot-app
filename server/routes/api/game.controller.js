const express = require('express');
const projectService = require('../../services/project.service');
const logger = require('../../utils/logger');
const requestHelper = require('../../utils/request');

const router = express.Router();

router.get('', async (req, res) => {
  try {
    return { roomId: 'room'}
  } catch (e) {
  }
});

router.get('/:id/join', async (req, res) => {
      return res.send({ join: true });
});

module.exports = router;
