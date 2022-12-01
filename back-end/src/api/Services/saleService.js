const { Sequelize } = require('sequelize');
const config = require('../../database/config/config');

const { Sale, SaleProduct, Product } = require('../../database/models');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const CustomError = require('../Errors/CustomError');

async function createSale({ sales, saleInfo }) {
  try {
    await sequelize.transaction(async (t) => Promise.all(
      sales.map(async ({ id, quantity }) => {
        const product = await Product.findOne({ where: { id } });
        const totalPrice = (product.price * quantity).toFixed(2);
        const sale = await Sale.create(
          { ...saleInfo, totalPrice: parseFloat(totalPrice) }, { transaction: t },
        );
        return SaleProduct.create(
          { saleId: sale.id, productId: id, quantity },
          { transaction: t },
        );
      }),
    ));
    return 'Successful sale';
  } catch (error) {
    throw new CustomError('Ops! Something went wrong', 404);
  }
}

module.exports = { createSale };
