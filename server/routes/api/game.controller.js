const express = require('express');
const projectService = require('../../services/project.service');
const logger = require('../../utils/logger');
const requestHelper = require('../../utils/request');
const app = require('../../server');
const server = require('http').Server(app);

const router = express.Router();

router.get('', async (req, res) => {
  try {
    return res.send({ roomId: 'room123'});
    // create room
  } catch (e) {
    console.log(e);
    return res.send(e);
  }
});

router.get('/:id/join', async (req, res) => {
      return res.send({ join: true });
});

module.exports = router;
