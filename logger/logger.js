const {
  createLogger, format, transports, addColors,
} = require('winston');
// const winston = require('winston/lib/winston/config');

// winston

addColors({
  info: 'italic blue whiteBG',
  warn: 'italic yellow whiteBG',
  error: 'italic red whiteBG',
});

const transportLevels = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  VERBOSE: 'verbose',
  DEBUG: 'debug',
  SILLY: 'silly',
};

const {
  combine, timestamp, label, metadata, errors, json, colorize, simple, splat,
} = format;

const logger = createLogger({
  level: transportLevels.SILLY,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    colorize({ all: true }),
    simple(),
    errors({ stack: true }),
    splat(),
  ),
  defaultMeta: { service: 'server-service' },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.Console({
      level: transportLevels.SILLY,
    }),
  ],
});

module.exports = {
  logger,
};
