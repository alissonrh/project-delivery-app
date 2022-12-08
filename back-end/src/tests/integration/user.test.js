const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');

const chaiHttp = require('chai-http');

const { User } = require('../../database/models');
const app = require('../../api/app');
const { tokenMock, tokenResponseMock } = require('./mocks/token.mock');
const { newUser, missingFieldUser } = require('./mocks/user.mock');
const { invalidPasswordMessage } = require('./mocks/joi.mock');
const { newUserDbMock } = require('./mocks/db.mock');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /register route', () => {
  afterEach(sinon.restore);
  it('Testing user creation when succeeds', async () => {
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(User, 'create').resolves(newUserDbMock);
    sinon.stub(jwt, 'sign').returns(tokenMock);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send(newUser);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      ...newUserDbMock.dataValues,
      ...tokenResponseMock,
    });
    expect(chaiHttpResponse.body).to.have.property('token');
  });
  it('Testing user creation when invalid body', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send(missingFieldUser);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal(invalidPasswordMessage);
  });
  
  it('Error if email is invalid', async () => {
    sinon.stub(User, 'findOne').resolves(newUserDbMock);

    const chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send(newUser)

    expect(chaiHttpResponse.status).to.be.equal(409);
    expect(chaiHttpResponse.body.message).to.be.equal('User already exist');
  });
});