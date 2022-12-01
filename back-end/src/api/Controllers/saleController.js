const { saleService } = require('../Services');

const createSale = async (req, res, next) => {
  try {
    const sale = await saleService.createSale(req.body);
    res.status(201).json(sale);
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

module.exports = { createSale, findSale };
