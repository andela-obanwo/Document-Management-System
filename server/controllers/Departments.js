const db = require('../models');

const DepartmentsController = {
  /**
   * Get all Departments
   * Route: GET: /departments
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  fetchAll(req, res) {
    if (req.adminType === 'superAdmin') {
      db.Departments.findAll({
        attributes: [
          'id',
          'name',
          'createdAt',
          'updatedAt'
        ]
      }).then((departments) => {
        res.send(departments);
      });
    } else {
      return res.send({ message: 'You are unauthorized to access this route' });
    }
  },

  /**
   * Create a department
   * Route: POST: /departments
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  create(req, res) {
    if (req.adminType === 'superAdmin') {
      db.Departments.findOne({ where: { name: req.body.name } })
      .then((departmentExists) => {
        if (departmentExists) {
          return res.status(409)
          .send({ message: `'${req.body.name}' already exists` });
        }

        db.Departments.create(req.body)
        .then((department) => {
          res.status(201).send({
            message: `Department ${req.body.name} successfully created`, department
          });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
      });
    } else {
      return res.send({ message: 'You are unauthorized to access this route' });
    }
  },

  /**
   * Update a particular department
   * Route: PUT: /departments/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  edit(req, res) {
    if (req.adminType === 'superAdmin') {
      db.Departments.findById(req.params.id)
      .then((department) => {
        if (!department) {
          return res.status(404)
          .send({ message: `Department ${req.body.name} not found` });
        }

        department.update(req.body)
          .then((updatedDepartment) => {
            res.send({ message: 'Update Successful', updatedDepartment });
          });
      })
      .catch((err) => {
        res.status(404).send(err);
      });
    } else {
      return res.send({ message: 'You are unauthorized to access this route' });
    }
  },

  /**
   * Delete a particular department
   * Route: DELETE: /departments/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    if (req.adminType === 'superAdmin') {
      db.Departments.findById(req.params.id)
      .then((department) => {
        if (!department) {
          return res.status(404)
          .send({ message: `Department ${req.body.name} not found` });
        }

        department.destroy()
        .then(() => res.send({ message: 'Department deleted successfully.' }));
      });
    } else {
      return res.send({ message: 'You are unauthorized to access this route' });
    }
  }
};

export default DepartmentsController;
