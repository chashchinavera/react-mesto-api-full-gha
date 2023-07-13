const { checkToken } = require('../utils/jwtAuth');
const UnauthorizedStatusError = require('../errors/UnauthorizedStatusError');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  try {
    const payload = checkToken(token);

    req.user = {
      _id: payload._id,
    };
    next();
  } catch (err) {
    next(new UnauthorizedStatusError('Пользователь не авторизован'));
  }
};

module.exports = auth;
