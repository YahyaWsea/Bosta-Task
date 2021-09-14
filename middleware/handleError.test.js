const { VALIDATION_ERROR } = require('../error/errors');
const { asyncTryCatch } = require('./asyncTryCatch');

describe('Error Handler Utility', () => {
  const mockReq = {};
  const mockRes = {
    status: jest
      .fn()
      .mockImplementation((code) => ({ ...mockRes, statusCode: code })),
    json: jest.fn(),
  };

  test('Return response json with result and status code 200', async () => {
    const handler = jest
      .fn()
      .mockImplementation(() => Promise.resolve('success'));

    await asyncTryCatch(handler)(mockReq, mockRes);
    expect(handler).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith('success');
    expect(mockRes.status).toBeCalledWith(200);
  });

  test('Throw error on calling the handler', async () => {
    const handler = jest
      .fn()
      .mockImplementation(() => Promise.reject(VALIDATION_ERROR('Dummy Error')));

    await asyncTryCatch(handler)(mockReq, mockRes);
    expect(handler).toBeCalledTimes(1);
    expect(mockRes.json).toBeCalledWith({
      code: 'VALIDATION_ERROR',
      message: 'Dummy Error',
      success: false,
    });
    expect(mockRes.status).toBeCalledWith(422);
  });
});
