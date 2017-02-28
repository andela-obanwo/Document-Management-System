import users from './Users';
import roles from './Roles';
import documentTypes from './DocumentTypes';
import accessTypes from './AccessTypes';
import departments from './Departments';
import documents from './Documents';

export default (app) => {
  // Index route
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Document Management API, Welcome' });
  });

  app.use('/roles', roles);
  app.use('/users', users);
  app.use('/accesstypes', accessTypes);
  app.use('/documenttypes', documentTypes);
  app.use('/departments', departments);
  app.use('/documents', documents);
};
