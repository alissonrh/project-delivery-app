const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');

const chaiHttp = require('chai-http');

const { User } = require('../../database/models');
const { userBody, wrongUser, invalidBody } = require('./mocks/login.mock');
const app = require('../../api/app');
const { tokenMock, tokenResponseMock } = require('./mocks/token.mock');
const { invalidPasswordMessage } = require('./mocks/joi.mock');
const { newUserDbMock } = require('./mocks/db.mock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /login route', () => {
  afterEach(sinon.restore);
  it('Testing login route when succeeds', async () => {
    sinon.stub(User, 'findOne').resolves(newUserDbMock);
    sinon.stub(jwt, 'sign').returns(tokenMock);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userBody);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ ...newUserDbMock.dataValues, ...tokenResponseMock });
    expect(chaiHttpResponse.body).to.have.property('token');
  });
  it('Error if email is invalid', async () => {
    sinon.stub(User, 'findOne').resolves(null);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(wrongUser)

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
  });

  it('Testing login route when invalid body', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(invalidBody);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(invalidPasswordMessage);
  });
});