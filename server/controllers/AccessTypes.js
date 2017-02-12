const db = require('../models');

const AccessTypesController = {
  /**
   * Get all AccessTypes
   * Route: GET: /accesstypes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  fetchAll(req, res) {
    if (req.adminType === 'superAdmin') {
      db.AccessTypes.findAll({
        attributes: [
          'id',
          'name',
          'createdAt',
          'updatedAt'
        ]
      }).then((accessTypes) => {
        res.send(accessTypes);
      });
    } else {
      return res.send({ message: 'You are unauthorized to access this route' });
    }
  },

  /**
   * Create an Access Type
   * Route: POST: /accesstypes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  create(req, res) {
    if (req.adminType === 'superAdmin') {
      db.AccessTypes.findOne({ where: { name: req.body.name } })
      .then((accessTypeExists) => {
        if (accessTypeExists) {
          return res.status(409)
          .send({ message: `'${req.body.name}' already exists` });
        }

        db.AccessTypes.create(req.body)
        .then((accessType) => {
          res.status(201).send({
            message: `AccessType ${req.body.name} successfully created`, accessType
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
   * Update a particular Access Type
   * Route: PUT: /accesstypes/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  edit(req, res) {
    if (req.adminType === 'superAdmin') {
      db.AccessTypes.findById(req.params.id)
      .then((accessType) => {
        if (!accessType) {
          return res.status(404)
          .send({ message: `AccessType ${req.body.name} not found` });
        }

        accessType.update(req.body)
          .then((updatedAccessType) => {
            res.send({ message: 'Update Successful', updatedAccessType });
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
   * Delete a particular Access Type
   * Route: DELETE: /accesstypes/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    if (req.adminType === 'superAdmin') {
      db.AccessTypes.findById(req.params.id)
      .then((accessType) => {
        if (!accessType) {
          return res.status(404)
          .send({ message: `AccessType ${req.body.name} not found` });
        }

        accessType.destroy()
        .then(() => res.send({ message: 'AccessType deleted successfully.' }));
      });
    } else {
      return res.send({ message: 'You are unauthorized to access this route' });
    }
  }
};

export default AccessTypesController;