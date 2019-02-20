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

router.get('/current-user', token.verifyToken, async (req, res) => {
  try {
    const user = await userService.getCurrentUser(req.auth);
    if (user) {
      return res.send(user);
    }
    res.status(404).send('not found');
  } catch (e) {
    return res.status(500).send({ error: 'Internal error' });
  }
});

// user projects
router.get('/:uid/projects', async (req, res) => {
  try {
    const userProjects = await userService.getProjects(req.params.uid, req.query);
    res.status(200);
    return res.send(userProjects);
  } catch (e) {
    return res.status(500).send({ error: 'Internal error' });
  }
});

router.post(
  '/:uid/projects',
  token.verifyToken,
  token.isAuthorized,
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

router.patch(
  '/:uid/projects/:id',
  token.verifyToken,
  token.isAuthorized,
  requestMiddleware.hasRequiredParametersProject,
  async (req, res) => {
    try {
      const project = await userService.updateProject(req.params.uid, req.params.id, req.body);
      res.status(200);
      return res.send(project);
    } catch (e) {
      return res.status(500).send({ error: 'Internal error' });
    }
  },
);

router.get('/:name', async (req, res) => {
  const user = await userService.getByName(req.params.name);
  if (user) {
    return res.send(user);
  }
  return res.status(404).send('not found');
});

module.exports = router;
