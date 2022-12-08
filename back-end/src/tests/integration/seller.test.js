const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiHttp = require('chai-http');

const app = require('../../api/app');
const { Sale } = require('../../database/models');
const { saleByIdDbMock, newSaleDbMock } = require('./mocks/db.mock');
const { orderId } = require('./mocks/customer.mock');
const { invalidSellerIdMessage } = require('./mocks/joi.mock');


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /seller route', () => {
  afterEach(sinon.restore);
  describe('Testing GET /seller/orders/:id route', () => {
    it('Get sale by id', async () => {
      sinon.stub(Sale, 'findOne').resolves(saleByIdDbMock);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/seller/orders/1');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(orderId);
    });

    it('Unexpected error', async () => {
      const error = new Error('Internal error');
      sinon.stub(Sale, 'findOne').throws(error);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/seller/orders/1');

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.message).to.be.equal('Internal error');
    });
  });

  describe('Testing POST /seller/orders route', () => {
    it('Get sale by seller id when succeeds', async () => {
      sinon.stub(Sale, 'findAll').resolves([newSaleDbMock.dataValues]);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/seller/orders')
        .send({ sellerId: 2 });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([newSaleDbMock.dataValues]);
    });

    it('Unexpected error', async () => {
      const error = new Error('Internal error');
      sinon.stub(Sale, 'findAll').throws(error);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/seller/orders')
        .send({ sellerId: 999 });

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.message).to.be.equal('Internal error');
    });

    it('Testing when send the wrong body', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/seller/orders')
        .send({ sellerId: 'Two' });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.deep.equal(invalidSellerIdMessage);
    });
  });
})