const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');

const chaiHttp = require('chai-http');

const { User } = require('../../database/models');
const { newUserDbMock, userAdminDbMock } = require('./mocks/db.mock');
const { newUser, missingFieldUser, newUserAdm, newAdminUser } = require('./mocks/user.mock');
const { invalidStatusMessage, invalidUserIdMessage, invalidUserRoleMessage } = require('./mocks/joi.mock');

const app = require('../../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /admin route', () => {
  afterEach(sinon.restore);
  describe('Testing GET /manage route', () => {
    it('Get all users', async () => {
      sinon.stub(User, 'findAll').resolves([newUserDbMock]);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/admin/manage');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([newUserDbMock]);
    });
    it('Unexpected error to get all users', async () => {
      const error = new Error('Internal error');
      sinon.stub(User, 'findAll').throws(error);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/admin/manage');

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body.message).to.be.equal('Internal error');
    });
  });
  describe('Testing POST /manage route', () => {
    it('Create a new User', async () => {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(newUserDbMock);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/admin/manage')
        .send(newUserAdm);

      expect(chaiHttpResponse.status).to.be.equal(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(newUserDbMock.dataValues);
    });
    it('Unable to create a new User with role admin', async () => {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(newUserDbMock);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/admin/manage')
        .send(newAdminUser);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.deep.equal(invalidUserRoleMessage);
    });
    it('Unable to create a new user with an existent email', async () => {
      sinon.stub(User, 'findOne').resolves(newUserDbMock);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/admin/manage')
        .send(newUserAdm);

      expect(chaiHttpResponse.status).to.be.equal(409);
      expect(chaiHttpResponse.body.message).to.be.equal('User already exist');
    });
  });
  describe('Testing DELETE /manage/id route', () => {
    it('Testing if its possible to delete an user', async () => {
      sinon.stub(User, 'findOne').resolves(newUserDbMock.dataValues);
      sinon.stub(User, 'destroy').resolves({});

      const chaiHttpResponse = await chai
        .request(app)
        .delete('/admin/manage/6');

      expect(chaiHttpResponse.status).to.be.equal(204);
    });
    it('Unable to delete an admin user', async () => {
      sinon.stub(User, 'findOne').resolves(userAdminDbMock.dataValues);

      const chaiHttpResponse = await chai
        .request(app)
        .delete('/admin/manage/6');

      expect(chaiHttpResponse.status).to.be.equal(403);
      expect(chaiHttpResponse.body.message).to.be.equal('Forbidden'); 
    });
    it('Unable to delete an inexistent user', async () => {
      sinon.stub(User, 'findOne').resolves(null);

      const chaiHttpResponse = await chai
        .request(app)
        .delete('/admin/manage/999');

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body.message).to.be.equal('User not found');
    });
  });
})