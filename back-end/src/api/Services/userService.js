const md5 = require('md5');
const { User } = require('../../database/models');
const CustomError = require('../Errors/CustomError');
const { createToken } = require('../Utils/jwt');

async function createUser({ name, email, password }) {
  const user = await User.findOne({ where: { email } });
  if (user) throw new CustomError('User already exist', 409);
  const hash = md5(password);
  const createdUser = await User.create(
    { name, email, password: hash },
    { attributes: { exclude: ['password', 'id'] } },
  );
  const payload = { ...createdUser.dataValues };
  const token = createToken(payload);
  return { ...payload, token };
}

async function findSellers() {
  const sellers = await User.findAll({ where: { role: 'seller' } });
  return sellers;
}

module.exports = {
  createUser,
  findSellers,
};