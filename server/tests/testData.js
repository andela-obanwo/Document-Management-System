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
  regularUser1: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3,
    departmentId: 2
  },
  regularUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3,
    departmentId: 3
  },
  regularUser3: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3,
    departmentId: 2
  },
  regularUser4: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
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
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 3,
    departmentId: 4
  },
  publicDocument1: {
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
  publicDocument4: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
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
    title: faker.company.catchPhrase(),
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
  roleDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 3,
    docTypeId: 3,
    userId: 4,
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
