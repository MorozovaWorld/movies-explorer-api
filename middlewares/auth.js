const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const Err401Unauthorized = require('../errors/Err401Unauthorized');
const { ERROR_AUTHORIZATION_NEEDED } = require('../utils/constants.js');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const unauthorizedError = new Err401Unauthorized(ERROR_AUTHORIZATION_NEEDED);
    next(unauthorizedError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    const unauthorizedError = new Err401Unauthorized(ERROR_AUTHORIZATION_NEEDED);
    next(unauthorizedError);
  }

  req.user = payload;

  return next();
};
