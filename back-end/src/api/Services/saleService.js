const { Sequelize } = require('sequelize');
const config = require('../../database/config/config');
const { Sale, SaleProduct, Product, User } = require('../../database/models');
const CustomError = require('../Errors/CustomError');
const { totalPriceCalculator } = require('../Utils/calculator');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

async function createSale({ sales, saleInfo }) {
  try {
    await sequelize.transaction(async (t) => {
      const prices = await Promise.all(sales.map(async ({ productId, quantity }) => {
        const product = await Product.findOne({ where: { id: productId } });
        return product.price * quantity;
      }));
      const sale = await Sale.create(
        { ...saleInfo, totalPrice: totalPriceCalculator(prices) }, { transaction: t },
      );
      await Promise.all(sales.map(async ({ productId, quantity }) => SaleProduct.create(
        { saleId: sale.id, productId, quantity }, { transaction: t },
      )));
    });
    return 'Successful sale';
  } catch (error) {
    throw new CustomError('Ops! Something went wrong', 404);
  }
}

async function findSaleByPk(id) {
  const orderById = await Sale.findOne({
    where: { id },
    include: [
      { model: User, as: 'seller', attributes: ['name'] },
      { model: Product, as: 'products', through: { attributes: ['quantity'] } },
    ],
  });
  const { seller, ...order } = orderById.dataValues;
  const purchaseInfo = { ...order, sellerName: seller.name };

  const products = purchaseInfo.products.map(({ dataValues }) => {
    const product = { ...dataValues };
    const { SaleProduct: { quantity } } = product;
    delete product.SaleProduct;
    const subTotal = parseFloat((product.price * quantity).toFixed(2));
    return { ...product, quantity, subTotal };
  });
  return { ...purchaseInfo, products };
}

module.exports = { createSale, findSaleByPk };
