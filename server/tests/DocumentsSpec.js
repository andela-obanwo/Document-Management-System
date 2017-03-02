import chai from 'chai';
import Request from 'supertest';
import app from '../app';
import testData from './TestData';
import db from '../models';

const request = Request.agent(app);
const expect = chai.expect;
const superAdmin = testData.superAdminUser;
const departmentAdmin = testData.departmentAdminUser1;
const userOne = testData.regularUser1;
const userTwo = testData.regularUser2;


let superAdminToken, departmentAdminToken, userOneToken, userTwoToken;
describe('Document Tests', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
    .then(() => done());
  });
  before((done) => {
    db.Roles.bulkCreate([
      testData.superAdminRole,
      testData.departmentAdminRole,
      testData.userRole
    ])
    .then(() => db.Departments.bulkCreate([
      testData.department1,
      testData.department2,
      testData.department3
    ]))
    .then(() => db.AccessTypes.bulkCreate([
      testData.publicAccessType,
      testData.privateAccessType,
      testData.roleAccessType
    ]))
    .then(() => db.DocumentTypes.bulkCreate([
      testData.documentType1,
      testData.documentType2,
      testData.documentType3
    ]))
    .then(() => db.Users.bulkCreate([
      superAdmin,
      departmentAdmin,
      userOne,
      userTwo
    ], { individualHooks: true }))
    .then(() => db.Documents.bulkCreate([
      testData.publicDocument1,
      testData.publicDocument2,
      testData.publicDocument3,
      testData.publicDocument4,
      testData.privateDocument1,
      testData.privateDocument2,
      testData.privateDocument3,
      testData.roleDocument1,
      testData.roleDocument2,
      testData.roleDocument3
    ]))
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
  before((done) => {
    request.post('/users/login')
    .send(userOne)
    .end((err, res) => {
      userOneToken = res.body.token;
      done();
    });
  });
  before((done) => {
    request.post('/users/login')
    .send(userTwo)
    .end((err, res) => {
      userTwoToken = res.body.token;
      done();
    });
  });
  describe('Create Documents', () => {
    it('should verify that user can create document', (done) => {
      request.post('/documents')
      .set({ 'x-access-token': userOneToken })
      .send(testData.privateDocument4)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Document Created Successfully');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.post('/documents')
      .set({ 'x-access-token': userOneToken })
      .send('testData.privateDocument4')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Fetch Documents', () => {
    it('should verify that users get relevant documents', (done) => {
      request.get('/documents')
      .set({ 'x-access-token': userOneToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Public Documents for your department returned');
        done();
      });
    });
    it('should verify that super admins get relevant documents', (done) => {
      request.get('/documents')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('All documents returned Successfully');
        done();
      });
    });
    it('should verify that dept. admins get relevant documents', (done) => {
      request.get('/documents')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('All Department Documents returned successfully');
        done();
      });
    });
  });
  describe('Fetch Single Document', () => {
    it('should verify that document exists (superAdmin)', (done) => {
      request.get('/documents/20')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message)
        .to.equal('Document with id: \'20\', not found');
        done();
      });
    });
    it('should verify that super admins retrieve document', (done) => {
      request.get('/documents/4')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Document fetched successfully');
        done();
      });
    });
    it('should check for error handling (superAdmin)', (done) => {
      request.get('/documents/water')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should verify that deptAdmins access only department docs.', (done) => {
      request.get('/documents/4')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message)
        .to.equal('Document with id: \'4\', is not available');
        done();
      });
    });
    it('should verify that deptAdmins can get department document', (done) => {
      request.get('/documents/3')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Data fetched successfully');
        done();
      });
    });
    it('should check for error handling (deptAdmin)', (done) => {
      request.get('/documents/water')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should verify that user can get his own documents', (done) => {
      request.get('/documents/9')
      .set({ 'x-access-token': userOneToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Data fetched successfully');
        done();
      });
    });
    it('should verify that user can access others public docs', (done) => {
      request.get('/documents/4')
      .set({ 'x-access-token': userOneToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Data fetched successfully');
        done();
      });
    });
    it('should verify that document exists (user)', (done) => {
      request.get('/documents/20')
      .set({ 'x-access-token': userOneToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message)
        .to.equal('Document with id: \'20\', not found');
        done();
      });
    });
    it('should verify that user cannot access others private docs', (done) => {
      request.get('/documents/6')
      .set({ 'x-access-token': userOneToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are not authorized to view this content');
        done();
      });
    });
    it('should check for error handling (user)', (done) => {
      request.get('/documents/water')
      .set({ 'x-access-token': userOneToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Edit Document', () => {
    it('should verify that document exists', (done) => {
      request.put('/documents/20')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message)
        .to.equal('Document with id: 20 not found');
        done();
      });
    });
    it('should verify that super admins can edit document', (done) => {
      request.put('/documents/4')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Document Updated Successfully');
        done();
      });
    });
    it('should verify that users can edit own documents.', (done) => {
      request.put('/documents/9')
      .set({ 'x-access-token': userOneToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Document Updated Successfully');
        done();
      });
    });
    it('should verify that deptAdmin can edit department document', (done) => {
      request.put('/documents/3')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Document Updated Successfully');
        done();
      });
    });
    it(`should verify deptAdmin can only
       edit their department's documents`, (done) => {
      request.put('/documents/6')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('Insufficient Privileges to edit');
        done();
      });
    });
    it('should verify user cannot edit other user\'s documents', (done) => {
      request.put('/documents/6')
      .set({ 'x-access-token': userOneToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('Insufficient Privileges to edit');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.put('/documents/water')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Delete Document', () => {
    it('should verify that document exists', (done) => {
      request.delete('/documents/20')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message)
        .to.equal('Document with id: 20 not found');
        done();
      });
    });
    it('should verify that super admins can delete document', (done) => {
      request.delete('/documents/4')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Document deleted successfully');
        done();
      });
    });
    it('should verify that users can delete own documents.', (done) => {
      request.delete('/documents/11')
      .set({ 'x-access-token': userOneToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Document deleted successfully');
        done();
      });
    });
    it(`should verify that deptAdmin
      can delete department document`, (done) => {
      request.delete('/documents/10')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Document deleted successfully');
        done();
      });
    });
    it(`should verify deptAdmin can only
       delete their department's documents`, (done) => {
      request.delete('/documents/6')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('Insufficient Privileges to delete');
        done();
      });
    });
    it('should verify user cannot delete other user\'s documents', (done) => {
      request.delete('/documents/6')
      .set({ 'x-access-token': userOneToken })
      .send(testData.privateDocument2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('Insufficient Privileges to delete');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.delete('/documents/water')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Search Document', () => {
    it('should find a document match for search query', (done) => {
      request.get('/search/documents?query=kings')
      .set({ 'x-access-token': userTwoToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should find a document match for search query', (done) => {
      request.get('/search/documents?query=kings')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should find a document match for search query', (done) => {
      request.get('/search/documents?query=a')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should find no document matches for search query', (done) => {
      request.get('/search/documents?query=helloss')
      .set({ 'x-access-token': userTwoToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('No Documents matching search found');
        done();
      });
    });
  });
  describe('Fetch Users Documents', () => {
    it('should find a document match for search query', (done) => {
      request.get('/users/3/documents')
      .set({ 'x-access-token': userTwoToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should handle error scenarios', (done) => {
      request.get('/users/search/documents')
      .set({ 'x-access-token': userTwoToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
});
