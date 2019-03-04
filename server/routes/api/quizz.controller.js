const express = require('express');
const token = require('../../middlewares/token');
const projectService = require('../../services/project.service');
const userService = require('../../services/user.service');
const logger = require('../../utils/logger');
const requestMiddleware = require('../../middlewares/request');

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

router.post(
  '/:uid/projects',
  requestMiddleware.hasRequiredParametersProject,
  async (req, res) => {
    req.body.uid = req.params.uid;
    try {
      const project = await projectService.add(req.body);
      return res.send(project);
    } catch (e) {
      return res.status(500).send({ error: 'Internal error' });
    }
  },
);

module.exports = router;
