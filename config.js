const config = {
  port: process.env.PORT,
  DBUrl: process.env.MONGO_URL,
  mailUsername: process.env.MAIL_USER_NAME || 'yahyaahmed717@gmail.com',
  mailPassword: process.env.MAIL_PASSWORD || '0846305298',
};

module.exports = config;
