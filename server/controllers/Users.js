import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET_TOKEN || 'gibberish is the way to go';
const userAttributes = [
  'id',
  'username',
  'firstname',
  'lastname',
  'email',
  'roleId',
  'departmentId',
  'createdAt',
  'updatedAt'
];
const createToken = user => jwt.sign({
  id: user.id,
  username: user.username,
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  departmentId: user.departmentId
}, secret, { expiresIn: '120m' });

const notOwner = req => req.adminType !== 'superAdmin'
&& parseInt(req.params.id, 10) !== parseInt(req.decoded.id, 10);

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
      return db.Users.findAll({
        attributes: userAttributes
      }).then(users => res.status(200).send({
        data: users,
        message: 'All user data returned'
      }));
    } else if (req.adminType === 'departmentAdmin') {
      return db.Users.findAll({
        attributes: userAttributes,
        where: { departmentId: req.decoded.departmentId }
      }).then(users => res.status(200).send({
        data: users,
        message: 'Departmental user data returned'
      }));
    }
    return db.Users.findAll({
      attributes: [
        'id',
        'firstname',
        'lastname'
      ],
      where: { departmentId: req.decoded.departmentId }
    }).then(users => res.status(200).send({
      data: users,
      message: 'Minimal Departmental user data returned'
    }));
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
      // Restrict non super Admin from creating an Admin user
      if (parseInt(req.body.roleId, 10) === 2
      || parseInt(req.body.roleId, 10) === 1) {
        return res.status(403).send({
          message: 'You are not allowed to create an Admin user'
        });
      }
      db.Users.create(req.body)
      .then((user) => {
        const token = createToken(user);

        res.status(201).send({
          message: 'User successfully created',
          token,
          expiresIn: '120m' });
      })
      .catch(err => res.status(400).send(err));
    });
  },
  /**
   * Create a user (admin access only)
   * Route: POST: /users/createadmin
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  createAdmin(req, res) {
    if (req.adminType === 'superAdmin') {
      db.Users.findOne({ where: { email: req.body.email } })
      .then((userExists) => {
        if (userExists) {
          return res.status(409)
          .send({
            message: `User with email: ${req.body.email} already exists` });
        }
        db.Users.create(req.body)
        .then((user) => {
          res.status(201).send({
            user,
            message: 'User successfully created'
          });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
      });
    } else {
      return res.status(403)
      .send({ message: 'You are unauthorized to access this route' });
    }
  },

  /**
   * Get a particular user
   * Route: GET: /users/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  fetchOne(req, res) {
    if (notOwner(req)) {
      return res.status(403)
      .send({ message: 'You are unauthorized to access this route' });
    }
    db.Users.findById(parseInt(req.params.id, 10))
    .then((user) => {
      if (!user) {
        return res.status(404)
          .send({ message: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
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
        .send({ message: 'User not found' });
      } else if (notOwner(req)) {
        return res.status(403)
        .send({ message: 'You are not allowed to edit this user' });
      } else if (req.adminType !== 'superAdmin'
        && (parseInt(req.body.roleId, 10) === 1
        || parseInt(req.body.roleId, 10) === 2)) {
        return res.status(403)
        .send({ message: 'You cannot assign yourself Admin rights' });
      }
      user.update(req.body)
        .then((updatedUser) => {
          res.status(200).send({
            data: updatedUser,
            message: 'User updated successfully'
          });
        });
    })
    .catch((err) => {
      res.status(400).send(err);
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
    if (req.adminType === 'superAdmin') {
      db.Users.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
          .send({ message: `User with id: ${req.params.id} not found` });
        } else if (req.decoded.id === user.id) {
          return res.status(403)
          .send({ message: 'You cannot delete your own account' });
        }

        user.destroy()
        .then(() => res.status(200)
        .send({ message: 'User deleted successfully.' }));
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    } else {
      return res.status(403)
    .send({ message: 'You are not allowed to delete this user' });
    }
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
      if (user && user.validPassword(req.body.password)) {
        user = user.dataValues;
        const token = createToken(user);
        res.send({ token, expiresIn: '120m' });
      } else {
        res.status(401)
        .send({ message: 'Failed to authenticate.' });
      }
    });
  },

  logout(req, res) {
    res.status(200).send({ message: 'Logout successful.' });
  }
};

export default UsersController;
