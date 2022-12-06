const {
  validateCreateSale,
  validateUserSale,
  validateSellerSale,
  validateUpdateSale,
} = require('../Utils/validations/saleValidation');

const createSalesValidation = (req, _res, next) => {
  try {
    validateCreateSale(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const getUserSalesValidation = (req, _res, next) => {
  try {
    validateUserSale(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const getSellerSalesValidation = (req, _res, next) => {
  try {
    validateSellerSale(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const updateSaleValidation = (req, _res, next) => {
  try {
    validateUpdateSale(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSalesValidation,
  getUserSalesValidation,
  getSellerSalesValidation,
  updateSaleValidation,
};
