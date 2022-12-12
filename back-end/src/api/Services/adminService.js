const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../../database/models');
const CustomError = require('../Errors/CustomError');

async function adminCreateUser({ name, email, password, role }) {
  const user = await User.findOne({ where: { [Op.or]: [{ name }, { email }] } });
  if (user) throw new CustomError('User already exist', 409);
  const hash = md5(password);
  const createdUser = await User.create(
    { name, email, password: hash, role },
  );
  const { password: _, ...userInfo } = createdUser.dataValues;
  return { ...userInfo };
}

async function adminDeleteUser(id) {
  const user = await User.findOne({ where: { id } });
  if (!user) throw new CustomError('User not found', 404);
  if (user.role === 'administrator') throw new CustomError('Forbidden', 403);

  await User.destroy({ where: { id } });
}

async function findlAllUsers() {
  return User.findAll({
    where: {
      role: {
        [Op.not]: 'administrator',
      },
    },
    attributes: { exclude: ['password'] },
  });
}

module.exports = { adminCreateUser, adminDeleteUser, findlAllUsers };
