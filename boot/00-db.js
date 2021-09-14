// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const { logger } = require('../logger/logger');

const { DBUrl } = require('../config');

module.exports = async function connectToDB() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  };

  try {
    await mongoose.connect(DBUrl, options);
    logger.info('Connected to Database Successfully...');
  } catch (err) {
    logger.error('Failed to connect to database', err);
  }
};
