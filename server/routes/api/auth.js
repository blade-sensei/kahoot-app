const express = require('express');
const authService = require('../../services/auth.service');
const requestMiddleware = require('../../middlewares/request');
const logger = require('../../utils/logger');

const router = express.Router();
router.post('/login', requestMiddleware.hasRequiredParameters, async (req, res) => {
  try {
    const authentication = await authService.login({
      username: req.body.username,
      password: req.body.password,
    });
    if (authentication) {
      return res.json(authentication);
    }
    return res.status(401).send({ error: 'Fail to login' });
  } catch (e) {
    logger.info(e.message);
    return res.status(500).send({ error: 'Internal error' });
  }
});
module.exports = router;
