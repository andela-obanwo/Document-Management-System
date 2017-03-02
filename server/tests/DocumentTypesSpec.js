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
describe('Document Type Tests', () => {
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

  describe('Create Document Type', () => {
    it('should check Document Type is successfully created', (done) => {
      request.post('/documenttypes')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.documentType1)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message)
        .to.equal(`DocumentType ${testData
          .documentType1.name} successfully created`);
        done();
      });
    });
    it('should check Document Type already exists', (done) => {
      request.post('/documenttypes')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.documentType1)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message)
        .to.equal(`'${testData.documentType1.name}' already exists`);
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.post('/documenttypes')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.documentType1)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
    it('should check if errors are handled', (done) => {
      request.post('/documenttypes')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.d3')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Fetch Document Type', () => {
    it('should check Document Type is successfully fetched', (done) => {
      request.get('/documenttypes')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.get('/documenttypes')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
  });
  describe('Edit Document Types', () => {
    it('should check if document type exists', (done) => {
      request.put('/documenttypes/2')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.documentType1)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('DocumentType not found');
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.put('/documenttypes/1')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.documentType1)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.put('/documenttypes/water')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.d3')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should check that document type is successfully edited', (done) => {
      request.put('/documenttypes/1')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.documentType2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Update Successful');
        done();
      });
    });
  });
  describe('Delete Document Types', () => {
    it('should check if document type exists', (done) => {
      request.delete('/documenttypes/2')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.documentType1)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('DocumentType not found');
        done();
      });
    });
    it('should check if user is not Super Admin', (done) => {
      request.delete('/documenttypes/1')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.documentType1)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.delete('/documenttypes/water')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should check that document type is successfully deleted', (done) => {
      request.delete('/documenttypes/1')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('DocumentType deleted successfully.');
        done();
      });
    });
  });
});
