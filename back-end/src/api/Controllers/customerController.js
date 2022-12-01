const { userService } = require('../Services');

const allSellers = async (_req, res, next) => {
  try {
    const sellers = await userService.findSellers();
    return res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allSellers,
};