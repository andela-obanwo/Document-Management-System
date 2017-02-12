const users = require('./Users');
const roles = require('./Roles');
const documentTypes = require('./DocumentTypes');
const accessTypes = require('./AccessTypes');
const departments = require('./Departments');
const documents = require('./Documents');

module.exports = (app) => {
  // Index route
  app.get('/', (req, res) => {
    res.send({ message: 'Document Management API' });
  });

  app.use('/roles', roles);
  app.use('/users', users);
  app.use('/accesstypes', accessTypes);
  app.use('/documenttypes', documentTypes);
  app.use('/departments', departments);
  app.use('/documents', documents);
};
