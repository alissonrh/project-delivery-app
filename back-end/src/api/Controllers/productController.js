const { productService } = require('../Services');

const allProducts = async (_req, res, next) => {
  try {
    const result = await productService.getProducts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allProducts,
};