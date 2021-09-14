const { logger } = require('../logger/logger');

const handleError = (err, res) => {
  const {
    statusCode = 500, code, message, details,
  } = err;

  logger[statusCode === 500 ? 'error' : 'info'](
    `Error in handling request with the following details: ${code} - ${message}`,
  );

  return res.status(statusCode).json({
    code,
    message,
    details,
    success: false,
  });
};

module.exports = { handleError };
