const faker = require('faker');

const data = {
  superAdminRole: {
    name: 'superAdmin'
  },
  departmentAdminRole: {
    name: 'departmentAdmin'
  },
  userRole: {
    name: 'user'
  },
  superAdminUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1,
    departmentId: 1
  },
  departmentAdminUser1: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
    departmentId: 2
  },
  departmentAdminUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
    departmentId: 3
  },
  departmentAdminUser3: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
    departmentId: 3
  },
  regularUser1: {
    username: 'simisoladavid',
    firstname: 'simisola',
    lastname: 'david',
    email: 'simisola@david.com',
    password: 'simidavids',
    departmentId: 2
  },
  regularUser1edit: {
    username: 'simisoladavid',
    firstname: 'simisola',
    lastname: 'david',
    email: 'simisola@david.com',
    password: 'simidavidsmodified',
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
  regularUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
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
    departmentId: 2
  },
  regularUser4Edit: {
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email@email.com',
    password: 'passwordModified',
    departmentId: 2
  },
  regularUser5: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    departmentId: 3
  },
  invalidUser: {
    username: null,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'a@a.com',
    password: faker.internet.password(),
    departmentId: 4
  },
  noIdUser: {
    id: 5,
    username: null,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'a@a.com',
    password: faker.internet.password(),
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
    name: 'public'
  },
  privateAccessType: {
    name: 'private'
  },
  roleAccessType: {
    name: 'role'
  },
  department1: {
    name: 'technology'
  },
  department2: {
    name: 'sales',
  },
  department3: {
    name: 'marketing'
  },
  documentType1: {
    name: 'manual'
  },
  documentType2: {
    name: 'invoice'
  },
  documentType3: {
    name: 'report'
  },
};
export default data;
