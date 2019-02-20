const winston = require('winston');

const tsFormat = () => {
  return new Date().toLocaleTimeString();
};

class  Logger {
    constructor() {
        this.logEngine = new winston.Logger({
          transports: [
            new winston.transports.Console({
              level: 'debug',
              prettyPrint: true,
              colorize: true,
              timestamp: tsFormat,
            }),
          ],
        });
    }

    info(message) {
      this.logEngine.info(message);
    }

    debug(message) {
      this.logEngine.log('debug', message);
    }
    error(message) {
      this.logEngine.error(`[error]: ${message} `);
    }

    warn(message) {
      this.logEngine.warn(message);
    }

}

module.exports = Logger;