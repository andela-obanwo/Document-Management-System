import db from '../models';
import SeedData from './SeedData';


db.Roles.bulkCreate([
  SeedData.superAdminRole, SeedData.departmentAdminRole,
  SeedData.userRole
])
.then(() => db.Departments.bulkCreate([
  SeedData.department1, SeedData.department2, SeedData.department3
]))
.then(() => db.AccessTypes.bulkCreate([
  SeedData.publicAccessType, SeedData.privateAccessType,
  SeedData.roleAccessType
]))
.then(() => db.DocumentTypes.bulkCreate([
  SeedData.documentType1, SeedData.documentType2, SeedData.documentType3
]))
.then(() => db.Users.bulkCreate([
  SeedData.superAdminUser, SeedData.departmentAdminUser1,
  SeedData.departmentAdminUser2, SeedData.departmentAdminUser3,
  SeedData.regularUser1, SeedData.regularUser2
], { individualHooks: true }))
.then(() => db.Documents.bulkCreate([
  SeedData.privateDocument1, SeedData.privateDocument2,
  SeedData.privateDocument3, SeedData.privateDocument4,
  SeedData.publicDocument1, SeedData.publicDocument2,
  SeedData.publicDocument3
]));
