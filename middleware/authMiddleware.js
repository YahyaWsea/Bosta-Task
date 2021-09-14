const _ = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { UNAUTHORIZED_ERR } = require('../error/errors');

module.exports = async (req, res, next) => {
  try {
    const token = _.get(req, 'headers.authorization');
    if (!token) return next(UNAUTHORIZED_ERR);
    const payload = await jwt.verify(token, process.env.JWT_SECRET || 'JWT_SECRET');
    const { id } = payload;
    const currentUser = await User.findById(id);
    if (!currentUser) return next(UNAUTHORIZED_ERR);
    req.user = currentUser;
    return next();
  } catch (err) {
    err.statusCode = 401;
    return next(UNAUTHORIZED_ERR);
  }
};
