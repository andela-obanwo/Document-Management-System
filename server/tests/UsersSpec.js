import chai from 'chai';
import Request from 'supertest';
import app from '../app';
import testData from './TestData';
import db from '../models';

const request = Request.agent(app);
const expect = chai.expect;
const superAdmin = testData.superAdminUser;
const departmentAdmin = testData.departmentAdminUser1;
const invalidToken = 'erty7567tuhv46547yu67i';

let userOneToken, superAdminToken, departmentAdminToken;
describe('User Tests', () => {
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

  describe('Create User', () => {
    it('should check User is successfully created', (done) => {
      request.post('/users')
      .send(testData.regularUser1)
      .end((err, res) => {
        userOneToken = res.body.token;
        expect(res.status).to.equal(201);
        expect(res.body.message)
        .to.equal('User successfully created');
        done();
      });
    });
    it('should check User already exists', (done) => {
      request.post('/users')
      .send(testData.regularUser1)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message)
        .to.equal(`User with email: ${testData
          .regularUser1.email} already exists`);
        done();
      });
    });
    it('should check that no one can create department admin user', (done) => {
      request.post('/users')
      .send(testData.departmentAdminUser2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are not allowed to create an Admin user');
        done();
      });
    });
    it('should check that no one can create super admin', (done) => {
      request.post('/users')
      .send(testData.superAdminUser2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are not allowed to create an Admin user');
        done();
      });
    });
    it('should check if errors are handled', (done) => {
      request.post('/users')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.d3')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should check if errors are handled (incompletedata))', (done) => {
      request.post('/users')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.invalidUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Create Users (Admin)', () => {
    it('should check regular user is successfully created', (done) => {
      request.post('/users/createadmin')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.regularUser4)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message)
        .to.equal('User successfully created');
        done();
      });
    });
    it('should check super admin is successfully created', (done) => {
      request.post('/users/createadmin')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.superAdminUser2)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message)
        .to.equal('User successfully created');
        done();
      });
    });
    it('should check department admin is successfully created', (done) => {
      request.post('/users/createadmin')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.departmentAdminUser3)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message)
        .to.equal('User successfully created');
        done();
      });
    });
    it('should check if user already exists', (done) => {
      request.post('/users/createadmin')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.regularUser4)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message)
        .to.equal(`User with email: ${testData
          .regularUser4.email} already exists`);
        done();
      });
    });
    it('should check that deptAdmins are denied access', (done) => {
      request.post('/users/createadmin')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.regularUser5)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
    it('should check that regular users are denied access', (done) => {
      request.post('/users/createadmin')
      .set({ 'x-access-token': userOneToken })
      .send(testData.regularUser5)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('Access forbidden, you do not have Admin rights');
        done();
      });
    });
    it('should check if errors are handled', (done) => {
      request.post('/users/createadmin')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.regularUser4')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Fetch Users', () => {
    it('should check users are successfully fetched (superAdmin)', (done) => {
      request.get('/users')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('All user data returned');
        done();
      });
    });
    it('should check users are successfully fetched (deptAdmin)', (done) => {
      request.get('/users')
      .set({ 'x-access-token': departmentAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Departmental user data returned');
        done();
      });
    });
    it('should check users are successfully fetched (user)', (done) => {
      request.get('/users')
      .set({ 'x-access-token': userOneToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Minimal Departmental user data returned');
        done();
      });
    });
  });
  describe('Fetch Single User', () => {
    it('should check user exists', (done) => {
      request.get('/users/7')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
        done();
      });
    });
    it('should check user is successfully fetched as superadmin', (done) => {
      request.get('/users/2')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should check a user can access his/her account', (done) => {
      request.get('/users/3')
      .set({ 'x-access-token': userOneToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should check a user can only access his/her account', (done) => {
      request.get('/users/4')
      .set({ 'x-access-token': userOneToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are unauthorized to access this route');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.get('/users/water')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.d3')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('Edit Users', () => {
    it('should check if user exists', (done) => {
      request.put('/users/7')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.superAdminUser2)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
        done();
      });
    });
    it('should check if user cannot edit other accounts', (done) => {
      request.put('/users/4')
      .set({ 'x-access-token': userOneToken })
      .send(testData.departmentAdminUser2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are not allowed to edit this user');
        done();
      });
    });
    it('should check that user can edit his/her own account', (done) => {
      request.put('/users/3')
      .set({ 'x-access-token': userOneToken })
      .send(testData.regularUser1edit)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('User updated successfully');
        done();
      });
    });
    it('should check that user cannot assign admin permissions', (done) => {
      request.put('/users/3')
      .set({ 'x-access-token': userOneToken })
      .send(testData.regularUser1Admin)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You cannot assign yourself Admin rights');
        done();
      });
    });
    it('should check for error handling from request', (done) => {
      request.put('/users/water')
      .set({ 'x-access-token': superAdminToken })
      .send('testData.d3')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should check that user is successfully edited', (done) => {
      request.put('/users/4')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.regularUser4Edit)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('User updated successfully');
        done();
      });
    });
  });
  describe('Delete Users', () => {
    it('should check if user exists', (done) => {
      request.delete('/users/7')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.departmentAdminUser2)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User with id: 7 not found');
        done();
      });
    });
    it('should check non-super admins cannot delete users', (done) => {
      request.delete('/users/3')
      .set({ 'x-access-token': departmentAdminToken })
      .send(testData.departmentAdminUser2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You are not allowed to delete this user');
        done();
      });
    });
    it('should check super admins cannot delete their accounts', (done) => {
      request.delete('/users/1')
      .set({ 'x-access-token': superAdminToken })
      .send(testData.departmentAdminUser2)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message)
        .to.equal('You cannot delete your own account');
        done();
      });
    });
    it('should check for error handling', (done) => {
      request.delete('/users/water')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should check that user is successfully deleted', (done) => {
      request.delete('/users/3')
      .set({ 'x-access-token': superAdminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('User deleted successfully.');
        done();
      });
    });
  });
  describe('Authentication Tests', () => {
    it('should check for invalid login', (done) => {
      request.post('/users/login')
      .send(testData.invalidUser)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message)
        .to.equal('Failed to authenticate.');
        done();
      });
    });
    it('should check for valid token', (done) => {
      request.get('/users')
      .set({ 'x-access-token': invalidToken })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message)
        .to.equal('Authentication failed: Invalid token supplied!');
        done();
      });
    });
    it('should check that a token is supplied', (done) => {
      request.get('/users')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message)
        .to.equal('Authentication required to access this route!');
        done();
      });
    });
    it('should check for successful logout', (done) => {
      request.post('/users/logout')
      .send(testData.invalidUser)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('Logout successful.');
        done();
      });
    });
  });
});
