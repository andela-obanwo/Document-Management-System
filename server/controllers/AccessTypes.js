import db from '../models';
import Paginator from '../helpers/Pagination';

const AccessTypesController = {
  /**
   * Get all AccessTypes
   * Route: GET: /accesstypes
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
    db.AccessTypes.findAndCountAll(query)
    .then((accesstypes) => {
      const metaData = {
        count: accesstypes.count,
        limit: query.limit,
        offset: query.offset
      };
      delete accesstypes.count;
      const pageData = Paginator.paginate(metaData);
      res.status(200).send({ accesstypes, pageData });
    });
  },

  /**
   * Create an Access Type
   * Route: POST: /accesstypes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  create(req, res) {
    db.AccessTypes.findOne({ where: { name: req.body.name } })
    .then((accessTypeExists) => {
      if (accessTypeExists) {
        return res.status(409)
        .send({ message: `'${req.body.name}' already exists` });
      }

      db.AccessTypes.create(req.body)
      .then((accessType) => {
        res.status(201).send({
          message: `AccessType ${req.body.name} successfully created`,
          accessType
        });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    });
  },

  /**
   * Update a particular Access Type
   * Route: PUT: /accesstypes/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  edit(req, res) {
    db.AccessTypes.findById(req.params.id)
    .then((accessType) => {
      if (!accessType) {
        return res.status(404)
        .send({ message: 'AccessType not found' });
      }

      accessType.update(req.body)
        .then((updatedAccessType) => {
          res.status(200)
          .send({ message: 'Update Successful', updatedAccessType });
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  /**
   * Delete a particular Access Type
   * Route: DELETE: /accesstypes/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  destroy(req, res) {
    db.AccessTypes.findById(req.params.id)
    .then((accessType) => {
      if (!accessType) {
        return res.status(404)
        .send({ message: 'AccessType not found' });
      }

      accessType.destroy()
      .then(() => res.status(200)
      .send({ message: 'AccessType deleted successfully.' }));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  }
};

export default AccessTypesController;
