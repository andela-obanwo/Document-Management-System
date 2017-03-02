import chai from 'chai';
import Request from 'supertest';
import app from '../app';
import testData from './TestData';
import db from '../models';

const request = Request.agent(app);
const expect = chai.expect;
const superAdmin = testData.superAdminUser;
const departmentAdmin = testData.departmentAdminUser1;

let superAdminToken, departmentAdminToken;
describe('Access Type Tests', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
    .then(() => done());
  });
  before((done) => {
    db.Roles.bulkCreate([testData.superAdminRole, testData.departmentAdminRole])
    .then(() => db.Departments.bulkCreate([
      testData.department1,
      testData.department2,
      testData.department3
    ]))
    .then(() => db.Users.bulkCreate([
      superAdmin,
      departmentAdmin
    ], { individualHooks: true }))
    .then(() => {
      request.post('/users/login')
      .send(superAdmin)
      .end((err, res) => {
        superAdminToken = res.body.token;
        done();
      });
    });
  });
  before((done) => {
    request.post('/users/login')
    .send(departmentAdmin)
    .end((err, res) => {
      departmentAdminToken = res.body.token;
      done();
    });
  });

  describe('Test Default route', () => {
    it('should check that a welcome message is returned', (done) => {
      request.get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Document Management API, Welcome');
        done();
      });
    });
  });
  describe('Create Access Type', () => {
    it('should check Access Type is successfully created', (done) => {
      request.post('/accesstypes')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.publicAccessType)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message)
        .to.equal('AccessType public successfully created');
        done();
      });
    });
    it('should check Access Type already exists', (done) => {
      request.post('/accesstypes')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.publicAccessType)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message)
        .to.equal("'public' already exists");
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.post('/accesstypes')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.publicAccessType)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
    it('should check if errors are handled', (done) => {
      request.post('/accesstypes')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.publicAccessType')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Fetch Access Type', () => {
    it('should check Access Type is successfully fetched', (done) => {
      request.get('/accesstypes')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.get('/accesstypes')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
  });
  describe('Edit Access Types', () => {
    it('should check if access type exists', (done) => {
      request.put('/accesstypes/2')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.publicAccessType)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('AccessType not found');
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.put('/accesstypes/2')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.publicAccessType)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.put('/accesstypes/water')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.publicAccessType')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should check that access type is successfully edited', (done) => {
      request.put('/accesstypes/1')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.publicAccessType)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Update Successful');
        done();
      });
    });
  });
  describe('Delete Access Types', () => {
    it('should check if access type exists', (done) => {
      request.delete('/accesstypes/2')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.publicAccessType)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('AccessType not found');
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.delete('/accesstypes/2')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.publicAccessType)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.delete('/accesstypes/water')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.publicAccessType')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should check that access type is successfully deleted', (done) => {
      request.delete('/accesstypes/1')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.publicAccessType)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('AccessType deleted successfully.');
        done();
      });
    });
  });
});
