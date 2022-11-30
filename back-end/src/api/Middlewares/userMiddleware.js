const userValidation = require('../Utils/validations/userValidation');

const createUserValidation = (req, _res, next) => {
  try {
    userValidation(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = createUserValidation;
