import db from '../models';

const RolesController = {
  /**
   * Get all Roles
   * Route: GET: /roles
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  fetchAll(req, res) {
    db.Roles.findAll({
      attributes: [
        'id',
        'name',
        'createdAt',
        'updatedAt'
      ]
    }).then((roles) => {
      res.status(200).send(roles);
    });
  },

  /**
   * Create a role
   * Route: POST: /roles
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  create(req, res) {
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
  },

  /**
   * Update a particular role
   * Route: PUT: /roles/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  edit(req, res) {
    db.Roles.findById(req.params.id)
    .then((role) => {
      if (!role) {
        return res.status(404)
        .send({ message: 'Role not found' });
      }

      role.update(req.body)
        .then((updatedRole) => {
          res.status(200)
          .send({ message: 'Update Successful', updatedRole });
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  /**
   * Delete a particular role
   * Route: DELETE: /roles/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  destroy(req, res) {
    db.Roles.findById(req.params.id)
    .then((role) => {
      if (!role) {
        return res.status(404)
        .send({ message: 'Role not found' });
      }

      role.destroy()
      .then(() => res.status(200)
      .send({ message: 'Role deleted successfully.' }));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  }
};

export default RolesController;
