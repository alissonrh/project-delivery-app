const { saleService } = require('../Services');

const findAllSellerSales = async (req, res, next) => {
  try {
    const sales = await saleService.findAllSellerSales(req.body);
    res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const findSale = async (req, res, next) => {
  try {
    const saleById = await saleService.findSaleByPk(req.params.id);
    res.status(200).json(saleById);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllSellerSales,
  findSale,
};
