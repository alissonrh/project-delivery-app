const saleValidation = require('../Utils/validations/saleValidation');

const createSalesValidation = (req, _res, next) => {
  try {
    saleValidation(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = createSalesValidation;
