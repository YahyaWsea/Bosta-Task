const _ = require('lodash');
const axios = require('./axiosInstance');
const User = require('../models/User');
const Check = require('../models/Check');
const {
  checkHandler, updateCheckOnFail, shouldSendNotification, getUrlFromCheck,
} = require('./checkHelpers');
const { UNAUTHORIZED_ERR } = require('../error/errors');

describe('Functionality from saving check to updating its status within interval', () => {
  const upCheck = {
    _id: '613e67c7c621984f07c53d57',
    name: 'google',
    url: 'https://google.com',
    protocol: 'https',
    path: '/yahya',
    port: 443,
    timout: 5,
    interval: 0.2,
    threshold: 3,
    currentStatus: 'up',
    userId: '613d43dfd5484ee2af6cd87a',
    isStopped: false,
  };

  // jwt.verify = jest.fn().mockImplementation(() => ({
  //   id: '12345',
  // }));

  test('Should send notification Function', async () => {
    const result = await shouldSendNotification(upCheck, 'up');
    // console.log({ result });
    expect(result).toEqual(false);
  });

  test('Should send notification Function', async () => {
    const result = await shouldSendNotification(upCheck, 'up');
    // console.log({ result });
    expect(result).toEqual(false);
  });
  // test('check to be down with right url and config', async () => {
  //   const downCheck = {
  //     _id: '613e67c7c621984f07c53d57',
  //     name: 'google',
  //     url: 'https://ggggggg',
  //     protocol: 'https',
  //     path: '',
  //     port: 443,
  //     timout: 5,
  //     interval: 0.2,
  //     threshold: 3,
  //     userId: '613d43dfd5484ee2af6cd87a',
  //     isStopped: false,
  //     currentStatus: 'up',
  //   };

  //   const configOptions = {
  //     timeout: downCheck.timout,
  //     ...(_.isEmpty(downCheck.authentication) ? {} : {
  //       auth: {
  //         ...downCheck.authentication,
  //       },
  //     }),
  //   };
  //   axios.get = jest
  //    .fn().mockImplementation((downCheck, configOptions) => { throw new Error(); });
  //   Check.findById = jest.fn().mockImplementation(() => downCheck);
  //   // updateCheckOnFail = jest.fn().mockImplementation(() => undefined);
  //   // shouldSendNotification = jest.fn().mockImplementation(() => false);
  //   await checkHandler(downCheck._id);
  //   // jest.setTimeout(10000);

  //   expect(axios.get).toBeCalledWith('https://ggggggg', configOptions);
  //   expect(axios.get).toThrow();
  //   expect(updateCheckOnFail).toBeCalledTimes(1);
  // });
});
