const Joi = require('joi');
const CustomError = require('../../Errors/CustomError');

const saleInfoSchema = Joi.object({
  userId: Joi.number().required(),
  sellerId: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
}).required();

const salesSchema = Joi.object({
  id: Joi.number().required(),
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

module.exports = validateCreateSale;
