const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;

const checkToken = (token) => {
  return jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'key');
};

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
};

module.exports = {
  checkToken,
  signToken,
};
