const md5 = require('md5');
const { User } = require('../../database/models');
const CustomError = require('../Errors/CustomError');
const { createToken } = require('../Utils/jwt');

async function loginService({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new CustomError('User not found', 404);
  if (md5(password) !== user.password) throw new CustomError('Invalid password', 401);
  const payload = { ...user.dataValues };
  delete payload.password;
  return createToken(payload);
}

module.exports = loginService;
