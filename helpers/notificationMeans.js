const axios = require('axios');
const { sendMail } = require('../mail/nodmaile');
const { logger } = require('../logger/logger');

const sendToWebHook = ({ url, data }) => axios.post(url, { ...data })
  .then((res) => logger.info(`sent To Web Hook : ${url}`))
  .catch((err) => logger.error(err));

const notificationMeans = {
  mail: sendMail,
  webHook: sendToWebHook,
};

module.exports = notificationMeans;
