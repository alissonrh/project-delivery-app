const md5 = require('md5');
const { User } = require('../../database/models');
const CustomError = require('../Errors/CustomError');
const { createToken } = require('../Utils/jwt');

async function loginService({ email, password }) {
  const user = await User.findOne({
    where: { email, password: md5(password) },
    attributes: { exclude: ['password', 'id'] },
  });
  if (!user) throw new CustomError('Incorrect email or password', 404);
  const payload = { ...user.dataValues };
  const token = createToken(payload);
  return { ...payload, token };
}

module.exports = loginService;
