const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [new (winston.transports.Console)({ json: true })],
});

logger.level = 'debug';

if (process.env.LEVEL) {
  logger.level = process.env.LEVEL;
}

module.exports = logger;
