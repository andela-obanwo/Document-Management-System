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
describe('Department Tests', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
    .then(() => done());
  });
  before((done) => {
    db.Roles.bulkCreate([testData.superAdminRole, testData.departmentAdminRole])
    .then(() => db.Departments.bulkCreate([
      testData.department1,
      testData.department2
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

  describe('Create Department', () => {
    it('should check Department is successfully created', (done) => {
      request.post('/departments')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.department3)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message)
        .to.equal('Department marketing successfully created');
        done();
      });
    });
    it('should check Department already exists', (done) => {
      request.post('/departments')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.department3)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message)
        .to.equal("'marketing' already exists");
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.post('/departments')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.department3)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('Forbidden, You do not have sufficient Admin rights');
        done();
      });
    });
    it('should check if errors are handled', (done) => {
      request.post('/departments')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.department3')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Fetch Department', () => {
    it('should check Department is successfully fetched', (done) => {
      request.get('/departments')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.get('/departments')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('Forbidden, You do not have sufficient Admin rights');
        done();
      });
    });
  });
  describe('Edit Departments', () => {
    it('should check if department exists', (done) => {
      request.put('/departments/4')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.department3)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Department not found');
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.put('/departments/3')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.department3)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('Forbidden, You do not have sufficient Admin rights');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.put('/departments/water')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.department3')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should check that department is successfully edited', (done) => {
      request.put('/departments/3')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.department3)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Update Successful');
        done();
      });
    });
  });
  describe('Delete Departments', () => {
    it('should check if department exists', (done) => {
      request.delete('/departments/4')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.department3)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Department not found');
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.delete('/departments/3')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.department3)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('Forbidden, You do not have sufficient Admin rights');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.delete('/departments/water')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should check that department is successfully deleted', (done) => {
      request.delete('/departments/3')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Department deleted successfully.');
        done();
      });
    });
  });
});
