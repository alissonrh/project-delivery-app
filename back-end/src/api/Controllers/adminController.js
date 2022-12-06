const { adminService } = require('../Services');

const adminCreateUser = async (req, res, next) => {
  try {
    const user = await adminService.adminCreateUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const adminDeleteUser = async (req, res, next) => {
  try {
    const deleteMessage = await adminService.adminDeleteUser(req.params.id);
    res.status(204).json(deleteMessage);
  } catch (error) {
    next(error);
  }
};

const findlAllUsers = async (_req, res, next) => {
  try {
    const users = await adminService.findlAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { adminCreateUser, adminDeleteUser, findlAllUsers };
