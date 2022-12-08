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
    await adminService.adminDeleteUser(req.params.id);
    res.sendStatus(204);
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
