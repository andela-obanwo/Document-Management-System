import app from '../app';
import chai from 'chai';
import Request from 'supertest';
import testData from './testData';
import db from '../models';

const request = Request.agent(app);
const expect = chai.expect;
// console.log(app);
const superAdmin = testData.superAdminUser;
const departmentAdmin = testData.departmentAdmin;

console.log(superAdmin.email, superAdmin.password);


describe('Access Type Tests', () => {
  before((done) => {
    db.Roles.create(testData.superAdminRole)
    .then((role) => {
      console.log('Role Created')
      done();
    });
    db.Users.create(superAdmin)
    .then((user) => {
      console.log('Admin Created')
      done();
    });
  });

  // after(() => {
  //   db.Roles.destroy({ where: {} });
  // });
  request.post('/accesstype')
  .send(testData.publicAcc)
  .end((err, res) => {
    console.log(res.body);
    console.log(err);
    });
    console.log('abc')
  it('should return a test value', () => {
    expect(2 + 3).to.equal(5);
  });
});
