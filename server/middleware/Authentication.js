import jwt from 'jsonwebtoken';
import db from '../models';

/**
 * Secret token for jsonwebtoken
 */
const secret = process.env.SECRET_TOKEN || 'gibberish is the way to go';

const Authentication = {

  /**
   * verifyToken - Verifies if a token supplied or not is valid
   *
   * @param  {Object} req  Request Object
   * @param  {Object} res  Response Object
   * @param  {Object} next
   * @returns {Object} Response status
   */
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401)
      .send({ message: 'Authentication required to access this route!' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401)
        .send({ message: 'Authentication failed: Invalid token supplied!' });
      }
      req.decoded = decoded;
      next();
    });
  },

  /**
   * verifySuperAdmin - Verifies that the user role supplied is a superAdmin
   *
   * @param  {Object} req  Request Object
   * @param  {Object} res  Response Object
   * @param  {Object} next
   * @returns {Object} Response Object
   */
  verifySuperAdmin(req, res, next) {
    db.Users.findById(req.decoded.id)
    .then((user) => {
      db.Roles.findById(user.roleId)
        .then((role) => {
          role = role.dataValues;
          if (role.name === 'superAdmin') {
            next();
          } else {
            return res.status(403)
            .send({
              message: 'Forbidden, You do not have sufficient Admin rights' });
          }
        });
    });
  },

  /**
   * validator - Verifies Admin Status/Type
   *
   * @param  {Object} req  Request Object
   * @param  {Object} res  Response Object
   * @param  {Object} next
   * @returns {Object} Response Object
   */
  validator(req, res, next) {
    db.Users.findById(req.decoded.id)
    .then((user) => {
      db.Roles.findById(user.roleId)
        .then((role) => {
          if (role.name === 'departmentAdmin' || role.name === 'superAdmin') {
            req.adminType = role.name;
            next();
          } else {
            req.adminType = 'user';
            next();
          }
        });
    });
  },
  checkId(req, res, next) {
    if (req.body.id) {
      return res.status(403).send({ message: 'You must not pass in "id"' });
    }
    next();
  }
};

export default Authentication;
