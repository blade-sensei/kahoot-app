const request = require('../utils/request');

const hasRequiredParameters = (req, res, next) => {
  const requiredParameters = ['username', 'password'];
  if (request.hasRequiredParameters(requiredParameters, req.body)) {
    return next();
  }
  return res
    .status(404)
    .send('Some of this required parameters are missing: '.concat(requiredParameters.join(', ')));
};

const hasRequiredParametersProject = (req, res, next) => {
  const requiredParameters = ['title'];
  if (request.hasRequiredParameters(requiredParameters, req.body)) {
    return next();
  }
  return res
    .status(404)
    .send('Some of this required parameters are missing: '.concat(requiredParameters.join(', ')));
};


module.exports = {
  hasRequiredParameters,
  hasRequiredParametersProject,
};
