const Joi = require('joi');
const CustomError = require('../../Errors/CustomError.js');

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(6).required(),
})

const validateLogin = (userData) => {
  const { error, value } = loginSchema.validate(userData);

  if (error) {
    throw new CustomError(error, 401)
  }
  return value;
};

module.exports = validateLogin;
