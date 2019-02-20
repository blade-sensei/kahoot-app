const winston = require('winston');
const eslint = require('eslint-config-core');

const tsFormat = () => {
  return new Date().toLocaleTimeString();
};


const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
      colorize: true,
      timestamp: tsFormat,
    }),
  ],
});
module.exports = logger;
