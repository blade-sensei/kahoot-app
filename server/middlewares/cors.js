const cors = require('../utils/cors');

const enablePreFlightRequest = (req, res, next) => {
  if (cors.isPreFlightRequest(req)) {
    return res.end();
  }
  return next();
};

module.exports = { enablePreFlightRequest };
