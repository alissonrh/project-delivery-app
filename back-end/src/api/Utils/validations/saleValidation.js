const Joi = require('joi');
const CustomError = require('../../Errors/CustomError');

const saleInfoSchema = Joi.object({
  userId: Joi.number().required(),
  sellerId: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
}).required();

const salesSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
}).required();

const createSaleSchema = Joi.object({
  saleInfo: saleInfoSchema,
  sales: Joi.array().items(salesSchema),
}).required();

const validateCreateSale = (saleData) => {
  const { error, value } = createSaleSchema.validate(saleData);

  if (error) {
    throw new CustomError(error, 401);
  }
  return value;
};

const getUserSaleSchema = Joi.object({
  userId: Joi.number().required(),
}).required();

const validateUserSale = (userData) => {
  const { error, value } = getUserSaleSchema.validate(userData);

  if (error) {
    throw new CustomError(error, 401);
  }
  return value;
};

const getSellerSaleSchema = Joi.object({
  sellerId: Joi.number().required(),
}).required();

const validateSellerSale = (userData) => {
  const { error, value } = getSellerSaleSchema.validate(userData);

  if (error) {
    throw new CustomError(error, 401);
  }
  return value;
};

const updateSaleSchema = Joi.object({
  status: Joi.string().valid('Preparando', 'Em Trânsito', 'Entregue').required(),
}).required();

const validateUpdateSale = (saleStatus) => {
  const { error, value } = updateSaleSchema.validate(saleStatus);

  if (error) {
    throw new CustomError(error, 401);
  }
  return value;
};

module.exports = {
  validateCreateSale,
  validateUserSale,
  validateSellerSale,
  validateUpdateSale,
};
