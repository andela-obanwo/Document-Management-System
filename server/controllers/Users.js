import jwt from 'jsonwebtoken';
import db from '../models';
import Paginator from '../helpers/Pagination';

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
   * @returns {Response} response object
   */
  fetchAll(req, res) {
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 10;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.attributes = userAttributes;
    if (req.adminType === 'superAdmin') {
      return db.Users.findAndCountAll(query)
      .then((users) => {
        const metaData = {
          count: users.count,
          limit: query.limit,
          offset: query.offset
        };
        delete users.count;
        const pageData = Paginator.paginate(metaData);
        res.status(200).send({
          data: users,
          pageData,
          message: 'All user data returned'
        });
      });
    } else if (req.adminType === 'departmentAdmin') {
      query.where = { departmentId: req.decoded.departmentId };
      return db.Users.findAndCountAll(query)
      .then((users) => {
        const metaData = {
          count: users.count,
          limit: query.limit,
          offset: query.offset
        };
        delete users.count;
        const pageData = Paginator.paginate(metaData);
        res.status(200).send({
          data: users,
          pageData,
          message: 'Departmental user data returned'
        });
      });
    }
    query.where = { departmentId: req.decoded.departmentId };
    query.attributes = [
      'id',
      'firstname',
      'lastname'
    ];
    return db.Users.findAndCountAll(query)
    .then((users) => {
      const metaData = {
        count: users.count,
        limit: query.limit,
        offset: query.offset
      };
      delete users.count;
      const pageData = Paginator.paginate(metaData);
      res.status(200).send({
        data: users,
        pageData,
        message: 'Minimal Departmental user data returned'
      });
    });
  },

  /**
   * Create a user
   * Route: POST: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  create(req, res) {
    db.Users.findOne({ where: { email: req.body.email } })
    .then((userExists) => {
      if (userExists) {
        return res.status(409)
        .send({ message: `User with email: ${req.body.email} already exists` });
      }
      // Restrict non super Admin from creating an Admin user
      if (req.body.roleId) {
        return res.status(403).send({
          message: 'You are not allowed to specify a role'
        });
      }
      db.Users.create(req.body)
      .then((user) => {
        const token = createToken(user);

        res.status(201).send({
          data: {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            roleId: user.roleId,
            departmentId: user.departmentId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          },
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
   * @returns {Response} response object
   */
  createAdmin(req, res) {
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
          data: {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            roleId: user.roleId,
            departmentId: user.departmentId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          },
          message: 'User successfully created'
        });
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
   * @returns {Response} response object
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
   * @returns {Response} response object
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
        && req.body.roleId && parseInt(req.body.roleId, 10) !== user.roleId) {
        return res.status(403)
        .send({ message: 'You cannot edit your role' });
      }
      user.update(req.body)
        .then((updatedUser) => {
          res.status(200).send({
            data: {
              id: updatedUser.id,
              username: updatedUser.username,
              firstname: updatedUser.firstname,
              lastname: updatedUser.lastname,
              email: updatedUser.email,
              roleId: updatedUser.roleId,
              departmentId: updatedUser.departmentId,
              createdAt: updatedUser.createdAt,
              updatedAt: updatedUser.updatedAt
            },
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
   * @returns {Response} response object
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
   * @returns {Response} response object
   */
  login(req, res) {
    db.Users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user && user.validPassword(req.body.password)) {
        user = user.dataValues;
        const token = createToken(user);
        res.send({
          data: {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            roleId: user.roleId,
            departmentId: user.departmentId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          },
          token,
          expiresIn: '120m' });
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
