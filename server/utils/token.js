const jwt = require('jsonwebtoken');
const config = require('../config');

const TOKEN_EXPIRATION = 60 * 60 * 24 * 1000;

const getToken = (user) => {
  if (!Reflect.has(user, 'admin') && !Reflect.has(user, 'uid')) {
    throw new Error('user object has not uid or admin property');
  }
  return jwt.sign(
    {
      iss: 'rtn-token',
      id: user.uid,
      admin: user.admin,
    },
    config.auth.key,
    {
      expiresIn: TOKEN_EXPIRATION,
    }
  );
};

module.exports = {
  getToken,
};
