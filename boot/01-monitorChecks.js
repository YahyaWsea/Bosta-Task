const _ = require('lodash');
const { logger } = require('../logger/logger');
const Check = require('../models/Check');
const { checkHandler } = require('../helpers/checkHelpers');

const startMonitorChecks = async () => {
  const allChecks = await Check.find();

  if (_.isEmpty(allChecks)) {
    logger.info('There are no checks in database to monitor...');
    logger.info('Waiting for new Checks to monitor...');
    return;
  }

  allChecks.forEach(async (check) => {
    checkHandler(check._id);
    const handlerInterval = setInterval(checkHandler, check.interval * 60 * 1000, check._id);
    check.intervalId = handlerInterval;
    await check.save();
  });

  logger.info('Started Monitoring all checks in database ...');
};

module.exports = startMonitorChecks;
