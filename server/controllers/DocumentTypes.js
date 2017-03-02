import db from '../models';

const DocumentTypesController = {
  /**
   * Get all DocumentTypes
   * Route: GET: /documenttypes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  fetchAll(req, res) {
    if (req.adminType === 'superAdmin') {
      db.DocumentTypes.findAll({
        attributes: [
          'id',
          'name',
          'createdAt',
          'updatedAt'
        ]
      }).then((documenttypes) => {
        res.send(documenttypes);
      });
    } else {
      return res.status(403)
      .send({ message: 'You are unauthorized to access this route' });
    }
  },

  /**
   * Create a document type
   * Route: POST: /documenttypes
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  create(req, res) {
    if (req.adminType === 'superAdmin') {
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
    } else {
      return res.status(403)
      .send({ message: 'You are unauthorized to access this route' });
    }
  },

  /**
   * Update a particular document Type
   * Route: PUT: /documenttypes/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  edit(req, res) {
    if (req.adminType === 'superAdmin') {
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
    } else {
      return res.status(403)
      .send({ message: 'You are unauthorized to access this route' });
    }
  },

  /**
   * Delete a particular document type
   * Route: DELETE: /documenttypes/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    if (req.adminType === 'superAdmin') {
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
    } else {
      return res.status(403)
      .send({ message: 'You are unauthorized to access this route' });
    }
  }
};

export default DocumentTypesController;
