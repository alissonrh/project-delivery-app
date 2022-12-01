const { loginService } = require('../Services');

const loginController = async (req, res, next) => {
  try {
    const user = await loginService(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = loginController;
