import chai from 'chai';
import Request from 'supertest';
import app from '../app';
import testData from './testData';
import db from '../models';

const request = Request.agent(app);
const expect = chai.expect;
const superAdmin = testData.superAdminUser;
const departmentAdmin = testData.departmentAdminUser1;

let superAdminToken, departmentAdminToken;
describe('Role Tests', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
    .then(() => done());
  });
  before((done) => {
    db.Roles.bulkCreate([testData.superAdminRole, testData.departmentAdminRole])
    .then(() => {
      db.Departments.bulkCreate([
        testData.department1,
        testData.department2
      ])
      .then(() => {
        db.Users.bulkCreate([
          superAdmin,
          departmentAdmin
        ], { individualHooks: true })
        .then(() => {
          request.post('/users/login')
          .send(superAdmin)
          .end((err, res) => {
            superAdminToken = res.body.token;
            done();
          });
        });
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

  describe('Create Role', () => {
    it('should check Role is successfully created', (done) => {
      request.post('/roles')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.userRole)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message)
        .to.equal(`Role ${testData
          .userRole.name} successfully created`);
        done();
      });
    });
    it('should check Role already exists', (done) => {
      request.post('/roles')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.userRole)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message)
        .to.equal(`'${testData.userRole.name}' already exists`);
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.post('/roles')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.userRole)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
    it('should check if errors are handled', (done) => {
      request.post('/roles')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.d3')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Fetch Role', () => {
    it('should check role is successfully fetched', (done) => {
      request.get('/roles')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.get('/roles')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
  });
  describe('Edit Roles', () => {
    it('should check if role exists', (done) => {
      request.put('/roles/4')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.userRole)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Role not found');
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.put('/roles/3')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.userRole)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.put('/roles/water')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.d3')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should check that role is successfully edited', (done) => {
      request.put('/roles/3')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.userRole)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Update Successful');
        done();
      });
    });
  });
  describe('Delete Roles', () => {
    it('should check if role exists', (done) => {
      request.delete('/roles/4')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.userRole)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Role not found');
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.delete('/roles/3')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.userRole)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.delete('/roles/water')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should check that role is successfully deleted', (done) => {
      request.delete('/roles/3')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Role deleted successfully.');
        done();
      });
    });
  });
});
