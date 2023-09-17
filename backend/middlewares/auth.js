const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');
const { AUTH_KEY_DEV } = require('../utils/constants');

const { NODE_ENV, AUTH_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new AuthenticationError('Неправильные почта или пароль');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? AUTH_KEY : AUTH_KEY_DEV,
    );
  } catch (err) {
    next(new AuthenticationError('Неправильные почта или пароль'));
    return;
  }
  req.user = payload;
  next();
};
