const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const CustomError = require('../error/CustomError');
const { UNAUTHORIZED_ERR } = require('../error/errors');
const authenticateUser = require('./authMiddleware');

describe('Get User Middleware Function', () => {
  let mockReq = {};
  const mockRes = {};
  const next = jest.fn();

  jwt.verify = jest.fn().mockImplementation(() => ({
    id: '12345',
  }));

  test('Authorization header not found', async () => {
    mockReq = {
      headers: {},
    };

    await authenticateUser(
      mockReq,
      mockRes,
      next,
    );
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(UNAUTHORIZED_ERR);
  });

  test('UserID in token is not found', async () => {
    mockReq = {
      headers: {
        authorization: 'AUTH_TOKEN',
      },
    };

    User.findById = jest.fn().mockImplementation(() => null);

    await authenticateUser(
      mockReq,
      mockRes,
      next,
    );
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(UNAUTHORIZED_ERR);
    expect(mockReq.user).toBeUndefined();
  });

  test('UserID found and User appended to req', async () => {
    mockReq = {
      headers: {
        authorization: 'AUTH_TOKEN',
      },
    };

    User.findById = jest.fn().mockImplementation(() => ({
      email: 'user@mail.com',
    }));

    await authenticateUser(
      mockReq,
      mockRes,
      next,
    );

    expect(User.findById).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
    expect(mockReq.user).toEqual({
      email: 'user@mail.com',
    });
  });
});
