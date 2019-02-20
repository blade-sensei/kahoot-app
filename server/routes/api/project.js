const express = require('express');
const projectService = require('../../services/project.service');
const logger = require('../../utils/logger');
const requestHelper = require('../../utils/request');

const router = express.Router();

router.get('', async (req, res) => {
  try {
    const projects = await projectService.findAll();
    res.send(projects);
  } catch (e) {
    logger.info(e.message);
    return res.status(500).send('not found');
  }
});

router.get('/:id', async (req, res) => {
  if (!requestHelper.isIdObjectIDType(req.params.id)) {
    return res.status(404)
      .send({ error: 'query parameter is not valid' });
  }
  try {
    const project = await projectService.findById(req.params.id);
    if (project) {
      res.status(200);
      return res.send(project);
    }
    return res.status(404).send({ error: 'not found' });
  } catch (e) {
    logger.info(e.message);
    return res.status(500).send({ error: 'Internal error' });
  }
});

module.exports = router;
