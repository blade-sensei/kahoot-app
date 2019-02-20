const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
  if (token) {
    return jwt.verify(token, req.app.get('secret_key'), (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.',
        });
      }
      req.auth = decoded;
      return next();
    });
  }
  return res.status(403).send({
    success: false,
    message: 'No token provided.',
  });
};

const isAuthorized = (req, res, next) => {
  if (req.auth.admin === true) {
    return next();
  } else if (req.auth.id === req.params.uid) {
    return next();
  }
  return res.sendStatus(403);
};

module.exports = {
  isAuthorized,
  verifyToken,
};
