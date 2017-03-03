const faker = require('faker');

const data = {
  superAdminRole: {
    id: 1,
    name: 'superAdmin'
  },
  departmentAdminRole: {
    id: 2,
    name: 'departmentAdmin'
  },
  userRole: {
    id: 3,
    name: 'user'
  },
  superAdminUser: {
    username: 'superadmin',
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'oreban4u@yahoo.co.uk',
    password: 'superadmin',
    roleId: 1,
    departmentId: 1
  },
  departmentAdminUser1: {
    username: 'departmentadmin1',
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'departmentadmin1@admin.com',
    password: 'departmentadmin1',
    roleId: 2,
    departmentId: 2
  },
  departmentAdminUser2: {
    username: 'departmentadmin2',
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'departmentadmin2@admin.com',
    password: 'departmentadmin2',
    roleId: 2,
    departmentId: 3
  },
  departmentAdminUser3: {
    username: 'departmentadmin3',
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'departmentadmin3@admin.com',
    password: 'departmentadmin3',
    roleId: 2,
    departmentId: 3
  },
  regularUser1: {
    username: 'simisoladavid',
    firstname: 'simisola',
    lastname: 'david',
    email: 'regularuser1@admin.com',
    password: 'regularuser1',
    roleId: 3,
    departmentId: 2
  },
  regularUser2: {
    username: 'simisola',
    firstname: 'simi',
    lastname: 'sola',
    email: 'regularuser2@admin.com',
    password: 'regularuser2',
    roleId: 3,
    departmentId: 2
  },
  regularUser1Admin: {
    username: 'simisoladavid',
    firstname: 'simisola',
    lastname: 'david',
    email: 'simisola@david.com',
    password: 'simidavidsmodified',
    roleId: 1,
    departmentId: 2
  },
  regularUser3: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3,
    departmentId: 3
  },
  superAdminUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1,
    departmentId: 2
  },
  regularUser4: {
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email@email.com',
    password: 'password',
    roleId: 3,
    departmentId: 2
  },
  regularUser4Edit: {
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email@email.com',
    password: 'passwordModified',
    roleId: 3,
    departmentId: 2
  },
  regularUser5: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3,
    departmentId: 3
  },
  invalidUser: {
    username: null,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'a@a.com',
    password: faker.internet.password(),
    roleId: 3,
    departmentId: 4
  },
  publicDocument4: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessTypeId: 1,
    docTypeId: 2,
    userId: 3,
  },
  publicDocument2: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessTypeId: 1,
    docTypeId: 2,
    userId: 3,
  },
  publicDocument3: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessTypeId: 1,
    docTypeId: 2,
    userId: 3,
  },
  publicDocument1: {
    title: 'we give you praise forever',
    content: 'king of kings',
    accessTypeId: 1,
    docTypeId: 2,
    userId: 4,
  },
  privateDocument1: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessTypeId: 2,
    docTypeId: 2,
    userId: 3,
  },
  privateDocument2: {
    title: 'we worship forever',
    content: faker.lorem.paragraph(),
    accessTypeId: 2,
    docTypeId: 3,
    userId: 4,
  },
  privateDocument3: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessTypeId: 2,
    docTypeId: 2,
    userId: 4,
  },
  privateDocument4: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessTypeId: 2,
    docTypeId: 2,
    userId: 4,
  },
  roleDocument1: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 3,
    docTypeId: 3,
    userId: 2,
  },
  roleDocument2: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 3,
    docTypeId: 1,
    userId: 3,
  },
  roleDocument3: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 3,
    docTypeId: 3,
    userId: 3,
  },
  publicAccessType: {
    id: 1,
    name: 'public'
  },
  privateAccessType: {
    id: 2,
    name: 'private'
  },
  roleAccessType: {
    id: 3,
    name: 'role'
  },
  department1: {
    id: 1,
    name: 'technology'
  },
  department2: {
    id: 2,
    name: 'sales',
  },
  department3: {
    id: 3,
    name: 'marketing'
  },
  documentType1: {
    id: 1,
    name: 'manual'
  },
  documentType2: {
    id: 2,
    name: 'invoice'
  },
  documentType3: {
    id: 3,
    name: 'report'
  },
};
export default data;
