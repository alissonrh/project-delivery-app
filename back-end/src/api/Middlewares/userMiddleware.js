const userValidation = require('../Utils/validations/userValidation');

const createUserValidation = (req, _res, next) => {
  try {
    userValidation.validateUser(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const adminCreateUserValidation = (req, _res, next) => {
  try {
    userValidation.validateUserbyAdmin(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { createUserValidation, adminCreateUserValidation };
