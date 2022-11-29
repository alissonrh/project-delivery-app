const validateLogin = require("../utils/validations/loginValidation");

const loginMiddleware = (req, _res, next) => {
  try {
    validateLogin(req.body)
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = loginMiddleware;
