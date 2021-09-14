const { handleError } = require('./handleError');

const asyncTryCatch = (handler) => async (req, res, next) => {
  try {
    const result = await handler(req, res);
    return res.status(200).json(result);
  } catch (error) {
    return handleError(error, res);
  }
};

module.exports = { asyncTryCatch };
