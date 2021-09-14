const CustomError = require('./CustomError');

const ErrorCode = {
  InternalServerError: 'INTERNAL_SERVER_ERROR',
  UnAuthorized: 'UNAUTHORIZED',
  ValidationError: 'VALIDATION_ERROR',
  SchemaValidationError: 'SCHEMA_VALIDATION_ERROR',
  Forbidden: 'FORBIDDEN',
  LoginFailed: 'LOGIN_FAILED',
  NotFound: 'NOT_FOUND',
};

const SERVER_ERR = new CustomError(
  {
    statusCode: 500,
    code: ErrorCode.InternalServerError,
    message: 'Error in Server while handling Request',
  },
);

const UNAUTHORIZED_ERR = new CustomError(
  {
    statusCode: 403,
    code: ErrorCode.UnAuthorized,
    message: 'You are not allowed to perform this action',
  },
);

const LOGIN_FAIL_ERR = new CustomError(
  {
    statusCode: 401,
    code: ErrorCode.LoginFailed,
    message: 'Invalid credentials',
  },
);

const NOT_FOUND_ERR = new CustomError(
  {
    statusCode: 404,
    code: ErrorCode.NotFound,
    message: 'Resource Not Found',
  },
);

const VALIDATION_ERROR = (message) => new CustomError(
  { statusCode: 422, code: ErrorCode.ValidationError, message },
);

const SCHEMA_VALIDATION_ERROR = ({ details }) => new CustomError(
  {
    statusCode: 422,
    code: ErrorCode.SchemaValidationError,
    message: details[0].message,
    details,
  },
);

module.exports = {
  SERVER_ERR,
  UNAUTHORIZED_ERR,
  LOGIN_FAIL_ERR,
  NOT_FOUND_ERR,
  VALIDATION_ERROR,
  SCHEMA_VALIDATION_ERROR,
};
