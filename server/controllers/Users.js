const jwt = require('jsonwebtoken');
const db = require('../models');

const secret = process.env.SECRET_TOKEN || 'gibberish is the way to go';


const UsersController = {
  /**
   * Get all users
   * Route: GET: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  fetchAll(req, res) {
    if (req.adminType === 'superAdmin') {
      db.Users.findAll({
        attributes: [
          'id',
          'username',
          'firstname',
          'lastname',
          'email',
          'roleId',
          'departmentId',
          'createdAt',
          'updatedAt'
        ]
      }).then((users) => {
        res.send(users);
      });
    } else if (req.adminType === 'departmentAdmin') {
      db.Users.findAll({
        attributes: [
          'id',
          'username',
          'firstname',
          'lastname',
          'email',
          'roleId',
          'departmentId',
          'createdAt',
          'updatedAt'
        ],
        where: { departmentId: req.decoded.departmentId }
      }).then(users => res.send(users));
    }
  },

  /**
   * Create a user
   * Route: POST: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  create(req, res) {
    db.Users.findOne({ where: { email: req.body.email } })
    .then((userExists) => {
      if (userExists) {
        return res.status(409)
        .send({ message: `User with email: ${req.body.email} already exists` });
      }
      //Restrict from creating an Admin user
      if (parseInt(req.body.roleId, 10) === 1 || parseInt(req.body.roleId, 10) === 2 ){
        return res.status(401).send({
          message: 'You are not allowed to create an Admin user'
        });
      }
      db.Users.create(req.body)
      .then((user) => {
        user = user.dataValues;
        const token = jwt.sign(user, secret, { expiresIn: '120m' });

        res.status(201).send({ token, expiresIn: '120m' });
      })
        .catch((err) => {
          res.status(400).send(err);
        });
    });
  },

  /**
   * Get a particular user
   * Route: GET: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  fetchOne(req, res) {
    db.Users.findById(req.params.id)
    .then((user) => {
      user = user.dataValues;
      if (!user) {
        return res.status(404)
          .send({ message: `User with id: '${req.params.id}', not found` });
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
  },

  /**
   * Update a particular user
   * Route: PUT: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  edit(req, res) {
    db.Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404)
        .send({ message: `User with id: ${req.params.id} not found` });
      }

      user.update(req.body)
        .then((updatedUser) => {
          res.send(updatedUser);
        });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
  },

  /**
   * Delete a particular user
   * Route: DELETE: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    db.Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404)
        .send({ message: `User with id: ${req.params.id} not found` });
      }

      user.destroy()
      .then(() => res.send({ message: 'User deleted successfully.' }));
    });
  },

  /**
   * Login user
   * Route: POST: /users/login
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  login(req, res) {
    db.Users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      // user = user.dataValues;
      if (user && user.validPassword(req.body.password)) {
        const token = jwt.sign(user.dataValues, secret, { expiresIn: '120m' });
        res.send({ token, expiresIn: '120m' });
      } else {
        res.status(401)
        .send({ message: 'Failed to authenticate.' });
      }
    });
  },

  logout(req, res) {
    res.send({ message: 'Logout successful.' });
  }
};

module.exports = UsersController;
