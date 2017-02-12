const db = require('../models');

const RolesController = {
  /**
   * Get all Roles
   * Route: GET: /roles
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  fetchAll(req, res) {
    if (req.adminType === 'superAdmin') {
      db.Roles.findAll({
        attributes: [
          'id',
          'name',
          'createdAt',
          'updatedAt'
        ]
      }).then((roles) => {
        res.send(roles);
      });
    } else {
      return res.send({ message: 'You are unauthorized to access this route' });
    }
  },

  /**
   * Create a role
   * Route: POST: /roles
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  create(req, res) {
    if (req.adminType === 'superAdmin') {
      db.Roles.findOne({ where: { name: req.body.name } })
      .then((roleExists) => {
        if (roleExists) {
          return res.status(409)
          .send({ message: `'${req.body.name}' already exists` });
        }

        db.Roles.create(req.body)
        .then((role) => {
          res.status(201).send({
            message: `Role ${req.body.name} successfully created`, role
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
   * Update a particular role
   * Route: PUT: /roles/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  edit(req, res) {
    if (req.adminType === 'superAdmin') {
      db.Roles.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
          .send({ message: `Role ${req.body.name} not found` });
        }

        role.update(req.body)
          .then((updatedRole) => {
            res.send({ message: 'Update Successful', updatedRole });
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
   * Delete a particular role
   * Route: DELETE: /roles/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    if (req.adminType === 'superAdmin') {
      db.Roles.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
          .send({ message: `Role ${req.body.name} not found` });
        }

        role.destroy()
        .then(() => res.send({ message: 'Role deleted successfully.' }));
      });
    } else {
      return res.send({ message: 'You are unauthorized to access this route' });
    }
  }
};

export default RolesController;
