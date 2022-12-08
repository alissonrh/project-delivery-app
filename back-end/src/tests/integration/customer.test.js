const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');

const chaiHttp = require('chai-http');

const { Product, Sale, SaleProduct, User } = require('../../database/models');
const app = require('../../api/app');
const { allProducts, allSellers, newSale, missingUserIdSale, orderId, updateSaleStatusMock } = require('./mocks/customer.mock');
const { tokenMock, tokenPayloadMock } = require('./mocks/token.mock');
const { newSaleDbMock, newSaleProductDbMock, saleByIdDbMock } = require('./mocks/db.mock');
const { sequelize } = require('../../api/Services/saleService');
const { invalidStatusMessage, invalidUserIdMessage } = require('./mocks/joi.mock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /customer route', () => {
  afterEach(sinon.restore);
  describe('Testing GET /customer/products route', () => {
    it('Get all products', async () => {
      sinon.stub(Product, 'findAll').resolves(allProducts);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/customer/products');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(allProducts);
    });

    it('Unexpected error', async () => {
      const error = new Error('Internal error');
      sinon.stub(Product, 'findAll').throws(error);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/customer/products');

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.message).to.be.equal('Internal error');
    });
  });

  describe('Testing GET /customer/checkout route', () => {
    it('Get all sellers', async () => {
      sinon.stub(User, 'findAll').resolves([allSellers]);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/customer/checkout');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([allSellers]);
    });

    it('Unexpected error', async () => {
      const error = new Error('Internal error');
      sinon.stub(User, 'findAll').throws(error);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/customer/checkout');

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.message).to.be.equal('Internal error');
    });
  });

  describe('Testing POST /customer/checkout route', () => {
    it('Testing sale creation when succeeds', async () => {
      sinon.stub(sequelize, 'transaction').resolves({ commit: () => { } });
      sinon.stub(Product, 'findOne').resolves(allProducts[0]);
      sinon.stub(Sale, 'create').resolves(newSaleDbMock);
      sinon.stub(SaleProduct, 'create').resolves(newSaleProductDbMock);
      sinon.stub(jwt, 'verify').returns(tokenPayloadMock);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/customer/checkout')
        .set('authorization', tokenMock)
        .send(newSale);

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal({ saleId: newSaleDbMock.dataValues.id });
    });

    it('Testing sale creation when not succeeds', async () => {
      sinon.stub(sequelize, 'transaction').resolves({ rollback: () => { } });
      sinon.stub(Product, 'findOne').throws();
      sinon.stub(jwt, 'verify').returns(tokenPayloadMock);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/customer/checkout')
        .set('authorization', tokenMock)
        .send(newSale);

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.message).to.be.equal('Ops! Something went wrong');
    });

    it('Testing when token not found', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/customer/checkout')
        .send(newSale);

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
    });

    it('Testing when token is invalid', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/customer/checkout')
        .set('authorization', 'invalid_token')
        .send(newSale);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Invalid token');
    });

    it('Testing when body is invalid', async () => {
      sinon.stub(jwt, 'verify').returns(tokenPayloadMock);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/customer/checkout')
        .set('authorization', tokenMock)
        .send(missingUserIdSale);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('ValidationError: "saleInfo.userId" is required');
    });
  });

  describe('Testing GET /customer/orders/:id route', () => {
    it('Get sale by id', async () => {
      sinon.stub(Sale, 'findOne').resolves(saleByIdDbMock);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/customer/orders/1');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(orderId);
    });

    it('Unexpected error', async () => {
      const error = new Error('Internal error');
      sinon.stub(Sale, 'findOne').throws(error);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/customer/orders/1');

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.message).to.be.equal('Internal error');
    });
  });

  describe('Testing PUT /customer/orders/:id route', () => {
    it('Testing sale status update when succeeds', async () => {
      sinon.stub(Sale, 'findByPk').resolves(newSaleDbMock);
      sinon.stub(Sale, 'update').resolves({});

      const chaiHttpResponse = await chai
        .request(app)
        .put('/customer/orders/1')
        .send(updateSaleStatusMock);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal('Status updated');
    });
    it('Testing sale status update when sale not found', async () => {
      sinon.stub(Sale, 'findByPk').resolves(null);

      const chaiHttpResponse = await chai
        .request(app)
        .put('/customer/orders/9999')
        .send(updateSaleStatusMock);

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body.message).to.be.equal('Sale not found');
    });
    it('Testing with invalid status', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .put('/customer/orders/9999')
        .send({ status: 'Any_status' });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal(invalidStatusMessage);
    })
  });

  describe('Testing POST /customer/orders route', () => {
    it('Get sale by user id when succeeds', async () => {
      sinon.stub(Sale, 'findAll').resolves([newSaleDbMock.dataValues]);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/customer/orders')
        .send({ userId: 3 });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([newSaleDbMock.dataValues]);
    });

    it('Unexpected error', async () => {
      const error = new Error('Internal error');
      sinon.stub(Sale, 'findAll').throws(error);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/customer/orders')
        .send({ userId: 999 });

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.message).to.be.equal('Internal error');
    });

    it('Testing when send the wrong body', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/customer/orders')
        .send({ userId: 'Three' });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.deep.equal(invalidUserIdMessage);
    });
  });
});