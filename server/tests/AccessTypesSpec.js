import chai from 'chai';
import Request from 'supertest';
import app from '../app';
import testData from './testData';
import db from '../models';

const request = Request.agent(app);
const expect = chai.expect;
// console.log(app);
const superAdmin = testData.superAdminUser;
const departmentAdmin = testData.departmentAdminUser1;

console.log(superAdmin.email, superAdmin.password);

let superAdminToken, departmentAdminToken, userOneToken, userTwoToken;
describe('Access Type Tests', () => {
  before((done) => {
    db.Roles.bulkCreate([testData.superAdminRole, testData.departmentAdminRole])
    .then(() => {
      console.log('Roles Created');
      db.Departments.bulkCreate([
        testData.department1,
        testData.department2,
        testData.department3
      ])
      .then(() => {
        console.log('Departments Created');
        console.log(superAdmin, departmentAdmin);
        db.Users.bulkCreate([
          superAdmin,
          departmentAdmin
        ], { individualHooks: true })
        .then(() => {
          console.log('Administrators Created');
          request.post('/users/login')
          .send(superAdmin)
          .end((err, res) => {
            console.log('+++++++++++++++=======', res.body.token)
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
      console.log(err, departmentAdmin);
      console.log('from beforeerererer', err, res.body);
      departmentAdminToken = res.body.token;
      done();
    });
  });

  after((done) => {
    db.Users.destroy({ where: {} })
    .then(() => {
      db.Departments.destroy({ where: {} })
      .then(() => {
        db.Roles.destroy({ where: {} })
        .then(() => {
          db.AccessTypes.destroy({ where: {} });
          done();
        })
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
        expect(res.status).to.equal(401);
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
});
