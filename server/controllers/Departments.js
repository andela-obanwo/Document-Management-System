import db from '../models';
import Paginator from '../helpers/Pagination';

const DepartmentsController = {
  /**
   * Get all Departments
   * Route: GET: /departments
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  fetchAll(req, res) {
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 10;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.attributes = [
      'id',
      'name',
      'createdAt',
      'updatedAt'
    ];
    db.Departments.findAndCountAll(query)
    .then((departments) => {
      const metaData = {
        count: departments.count,
        limit: query.limit,
        offset: query.offset
      };
      delete departments.count;
      const pageData = Paginator.paginate(metaData);
      res.status(200).send({ departments, pageData });
    });
  },

  /**
   * Create a department
   * Route: POST: /departments
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  create(req, res) {
    db.Departments.findOne({ where: { name: req.body.name } })
    .then((departmentExists) => {
      if (departmentExists) {
        return res.status(409)
        .send({ message: `'${req.body.name}' already exists` });
      }

      db.Departments.create(req.body)
      .then((department) => {
        res.status(201).send({
          message: `Department ${req.body.name} successfully created`,
          department
        });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    });
  },

  /**
   * Update a particular department
   * Route: PUT: /departments/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  edit(req, res) {
    db.Departments.findById(req.params.id)
    .then((department) => {
      if (!department) {
        return res.status(404)
        .send({ message: 'Department not found' });
      }

      department.update(req.body)
        .then((updatedDepartment) => {
          res.send({ message: 'Update Successful', updatedDepartment });
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  /**
   * Delete a particular department
   * Route: DELETE: /departments/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  destroy(req, res) {
    db.Departments.findById(req.params.id)
    .then((department) => {
      if (!department) {
        return res.status(404)
        .send({ message: 'Department not found' });
      }

      department.destroy()
      .then(() => res.send({ message: 'Department deleted successfully.' }));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  }
};

export default DepartmentsController;
