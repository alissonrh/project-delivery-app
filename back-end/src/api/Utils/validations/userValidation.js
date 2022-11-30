const Joi = require('joi');
const CustomError = require('../../Errors/CustomError');

const createUserSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(6).required(),
});

const validateUser = (userData) => {
  const { error, value } = createUserSchema.validate(userData);

  if (error) {
    throw new CustomError(error, 401);
  }
  return value;
};

module.exports = validateUser;
