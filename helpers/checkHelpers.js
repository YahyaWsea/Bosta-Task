/* eslint-disable max-len */
const _ = require('lodash');
const https = require('https');
const Check = require('../models/Check');
const User = require('../models/User');
const axios = require('./axiosInstance');
const { logger } = require('../logger/logger');
const { mail, webHook } = require('./notificationMeans');
const { urlStatusMailBody } = require('../mail/mailTemplates');

const updateCheckOnSuccess = async (checkInstance, responseTime) => Check.updateOne({ _id: checkInstance._id }, {
  $inc: {
    upTime: checkInstance.interval * 60,
  },
  $set: {
    currentStatus: 'up',
  },
  $push: {
    histroy: new Date(),
    responseTimes: responseTime,
  },
});
const updateCheckOnFail = async (checkInstance, responseTime) => Check.updateOne({ _id: checkInstance._id }, {
  $inc: {
    alerts: 1,
    outages: 1,
    downTime: checkInstance.interval * 60,
  },
  $set: {
    currentStatus: 'down',
  },
  $push: {
    histroy: new Date(),
    responseTimes: responseTime,
  },
});

const checkForThreshold = async (checkInstance) => {
  if (checkInstance.threshold === 1) return true;
  if (checkInstance.threshold === checkInstance.alerts) {
    checkInstance.alerts = 1;
    await checkInstance.save();
    return true;
  }
  checkInstance.alerts += 1;
  await checkInstance.save();
  return false;
};

const getUrlFromCheck = (checkInstance) => {
  const Url = new URL(`${checkInstance.url}`);
  Url.protocol = checkInstance.protocol;
  Url.pathname = checkInstance.path || '';
  Url.port = checkInstance.port;
  return Url.href;
};

const sendNotifications = async (checkInstance) => {
  logger.info('Notification should be sent...............');
  const user = await User.findById(checkInstance.userId);
  mail({ email: user.email, body: urlStatusMailBody(checkInstance), subject: 'URL alert' });
  if (checkInstance.webHook) {
    await webHook({
      url: getUrlFromCheck(checkInstance),
      data: {
        name: checkInstance.name,
        url: getUrlFromCheck(checkInstance),
        currentStatus: checkInstance.currentStatus,
      },
    });
  }
};

const shouldSendNotification = async (checkInstance, newStatus) => {
  if (checkInstance.currentStatus !== newStatus) {
    return newStatus === 'up' ? true : checkForThreshold(checkInstance);
  }
  return newStatus === 'up' ? false : checkForThreshold(checkInstance);
};

const checkHandler = async (checkId) => {
  const checkInstance = await Check.findById(checkId);

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const configOptions = {
    headers: checkInstance.httpHeaders,
    timeout: checkInstance.timeout * 1000,
    ...(checkInstance.ignoreSSL ? {} : { httpsAgent: agent }),
    ...(_.isEmpty(checkInstance.authentication) ? {} : {
      auth: {
        ...checkInstance.authentication,
      },
    }),
  };

  let response;
  try {
    response = await axios.get(getUrlFromCheck(checkInstance), configOptions);
  } catch (err) {
    logger.error(err);
    logger.info(
      `url failed, 
      check is: ${checkInstance.currentStatus} 
      and the error code is: ${err.code}`,
    );
    await updateCheckOnFail(checkInstance, err.duration);
    if (await shouldSendNotification(checkInstance, 'down')) {
      sendNotifications(checkInstance);
    }
  }
  if (response) {
    await updateCheckOnSuccess(checkInstance, response.duration);
    logger.info(
      `url succeess, 
         check is: ${checkInstance.currentStatus} 
         and the response status is: ${response.status}`,
    );
    if (await shouldSendNotification(checkInstance, 'up')) {
      sendNotifications(checkInstance);
    }
  }
};

module.exports = {
  checkHandler,
  updateCheckOnFail,
  shouldSendNotification,
  getUrlFromCheck,
};
