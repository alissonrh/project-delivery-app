const { Sequelize } = require('sequelize');
const config = require('../../database/config/config');
const { Sale, SaleProduct, Product, User } = require('../../database/models');
const CustomError = require('../Errors/CustomError');
const { totalPriceCalculator } = require('../Utils/calculator');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

async function createSale({ sales, saleInfo }) {
  const t = await sequelize.transaction();
  try {
    const prices = await Promise.all(sales.map(async ({ productId, quantity }) => {
      const product = await Product.findOne({ where: { id: productId } }, { transaction: t });
      return product.price * quantity;
    }));
    const sale = await Sale.create({ ...saleInfo, totalPrice: totalPriceCalculator(prices) },
      { transaction: t });
    await Promise.all(sales.map(async ({ productId, quantity }) => SaleProduct.create(
      { saleId: sale.id, productId, quantity }, { transaction: t },
    )));
    await t.commit();
    return { saleId: sale.dataValues.id };
  } catch (error) {
    await t.rollback();
    throw new CustomError('Ops! Something went wrong', 500);
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

async function findAllUserSales({ userId }) {
  return Sale.findAll({ where: { userId } });
}

async function findAllSellerSales({ sellerId }) {
  return Sale.findAll({ where: { sellerId } });
}

async function updateSale({ status }, id) {
  const sale = await Sale.findByPk(id);
  if (!sale) throw new CustomError('Sale not found', 404);
  await Sale.update(
    { status },
    { where: { id } },
  );
  return 'Status updated';
}

module.exports = {
  createSale,
  findSaleByPk,
  findAllUserSales,
  findAllSellerSales,
  updateSale,
  sequelize,
};
