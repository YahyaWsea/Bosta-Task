class CustomError extends Error {
  constructor({
    statusCode,
    code,
    message,
    details,
    internalErrorDetails = [],
  }) {
    super(message);
    Object.assign(this, {
      statusCode,
      code,
      details,
      internalErrorDetails,
    });
  }
}

module.exports = CustomError;
