import db from '../models';
import Paginator from '../helpers/Pagination';

const DocumentTypesController = {
  /**
   * Get all DocumentTypes
   * Route: GET: /documenttypes
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
    db.DocumentTypes.findAndCountAll(query)
    .then((documenttypes) => {
      const metaData = {
        count: documenttypes.count,
        limit: query.limit,
        offset: query.offset
      };
      delete documenttypes.count;
      const pageData = Paginator.paginate(metaData);
      res.status(200).send({ documenttypes, pageData });
    });
  },

  /**
   * Create a document type
   * Route: POST: /documenttypes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  create(req, res) {
    db.DocumentTypes.findOne({ where: { name: req.body.name } })
    .then((documentTypeExists) => {
      if (documentTypeExists) {
        return res.status(409)
        .send({ message: `'${req.body.name}' already exists` });
      }

      db.DocumentTypes.create(req.body)
      .then((documentType) => {
        res.status(201).send({
          message: `DocumentType ${req.body.name} successfully created`,
          documentType
        });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    });
  },

  /**
   * Update a particular document Type
   * Route: PUT: /documenttypes/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  edit(req, res) {
    db.DocumentTypes.findById(req.params.id)
    .then((documentType) => {
      if (!documentType) {
        return res.status(404)
        .send({ message: 'DocumentType not found' });
      }

      documentType.update(req.body)
        .then((updatedDocumentType) => {
          res.status(200)
          .send({ message: 'Update Successful', updatedDocumentType });
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  /**
   * Delete a particular document type
   * Route: DELETE: /documenttypes/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response} response object
   */
  destroy(req, res) {
    db.DocumentTypes.findById(req.params.id)
    .then((documentType) => {
      if (!documentType) {
        return res.status(404)
        .send({ message: 'DocumentType not found' });
      }

      documentType.destroy()
      .then(() => res.status(200)
      .send({ message: 'DocumentType deleted successfully.' }));
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  }
};

export default DocumentTypesController;
