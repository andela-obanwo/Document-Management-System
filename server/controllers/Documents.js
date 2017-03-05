import db from '../models';

const DocumentsController = {
  /**
   * Get all Documents
   * Route: GET: /documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  fetchAll(req, res) {
    if (req.adminType === 'superAdmin') {
      return db.Documents.findAll({
      }).then((documents) => {
        res.status(200).send({
          data: documents,
          message: 'All documents returned Successfully'
        });
      });
    } else if (req.adminType === 'departmentAdmin') {
      return db.Documents.findAll({
        include: [{
          model: db.Users,
          where: { departmentId: req.decoded.departmentId }
        }]
      })
      .then((documents) => {
        res.status(200).send({
          data: documents,
          message: 'All Department Documents returned successfully'
        });
      });
    }
    return db.Documents.findAll({
      include: [{
        model: db.AccessTypes,
        where: { name: 'public' }
      },
      {
        model: db.Users,
        where: { departmentId: req.decoded.departmentId }
      }]
    })
    .then(documents =>
      db.Documents.findAll({
        where: {
          userId: req.decoded.id
        }
      })
      .then((personalDocs) => {
        res.status(200).send({
          data: { public: documents, personal: personalDocs },
          message: 'Public Documents for your department returned'
        });
      }));
  },

  /**
   * Create a document
   * Route: POST: /documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  create(req, res) {
    req.body.userId = req.decoded.id;
    db.Documents.create(req.body)
    .then((document) => {
      res.status(201).send({
        data: document,
        message: 'Document Created Successfully'
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  /**
   * Get a particular document
   * Route: GET: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  fetchOne(req, res) {
    if (req.adminType === 'superAdmin') {
      db.Documents.findById(parseInt(req.params.id, 10))
      .then((document) => {
        if (!document) {
          return res.status(404)
          .send({ message: `Document with id: '${req.params.id}', not found` });
        }
        res.status(200).send({
          data: document,
          message: 'Document fetched successfully'
        });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    } else if (req.adminType === 'departmentAdmin') {
      db.Documents.find({
        include: [{
          model: db.Users,
          where: { departmentId: req.decoded.departmentId }
        }],
        where: { id: req.params.id }
      })
      .then((document) => {
        if (!document) {
          return res.status(404)
          .send({
            message: `Document with id: '${req.params.id}', is not available`
          });
        }
        res.status(200).send({
          data: document,
          message: 'Data fetched successfully'
        });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
    } else {
      db.Documents.findById(parseInt(req.params.id, 10))
      .then((document) => {
        if (!document) {
          return res.status(404)
          .send({ message: `Document with id: '${req.params.id}', not found` });
        } else if (document.userId === req.decoded.id) {
          return res.status(200).send({
            data: document,
            message: 'Data fetched successfully'
          });
        } else if (document.accessTypeId !== 2) {
          return res.status(200).send({
            data: document,
            message: 'Data fetched successfully'
          });
        }
        res.status(403)
        .send({ message: 'You are not authorized to view this content' });
      })
      .catch(err => res.status(400).send(err));
    }
  },

  /**
   * Update a particular document
   * Route: PUT: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  edit(req, res) {
    const documentUpdater = (res, updatedDocument) => res.status(200).send({
      data: updatedDocument,
      message: 'Document Updated Successfully'
    });
    db.Documents.findById(req.params.id)
    .then((document) => {
      if (!document) {
        return res.status(404)
        .send({ message: `Document with id: ${req.params.id} not found` });
      } else if (document.userId === req.decoded.id
        || req.adminType === 'superAdmin') {
        document.update(req.body)
        .then(updatedDocument => documentUpdater(res, updatedDocument));
      } else if (req.adminType === 'departmentAdmin') {
        db.Users.find({
          where: { id: document.userId }
        })
        .then((user) => {
          if (user.departmentId === req.decoded.departmentId) {
            document.update(req.body)
              .then(updatedDocument => documentUpdater(res, updatedDocument));
          } else {
            return res.status(403)
            .send({ message: 'Insufficient Privileges to edit' });
          }
        });
      } else {
        return res.status(403)
        .send({ message: 'Insufficient Privileges to edit' });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  /**
   * Delete a particular document
   * Route: DELETE: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    const documentDestroy = document => document.destroy()
    .then(() => res.status(200)
    .send({ message: 'Document deleted successfully' }));

    const noDeletePrivileges = () => res.status(403)
    .send({ message: 'Insufficient Privileges to delete' });

    db.Documents.findById(parseInt(req.params.id, 10))
    .then((document) => {
      if (!document) {
        return res.status(404)
        .send({ message: `Document with id: ${req.params.id} not found` });
      } else if (document.userId === req.decoded.id
        || req.adminType === 'superAdmin') {
        documentDestroy(document);
      } else if (req.adminType === 'departmentAdmin') {
        db.Users.find({
          where: { id: document.userId }
        })
        .then((user) => {
          if (user.departmentId === req.decoded.departmentId) {
            documentDestroy(document);
          } else {
            return noDeletePrivileges();
          }
        });
      } else {
        return noDeletePrivileges();
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },

  fetchUserDocuments(req, res) {
    db.Documents.findAll({
      where: {
        userId: req.params.id
      }
    })
    .then(documents => res.status(200).send(documents))
    .catch(err => res.status(400).send(err));
  },
  searchDocuments(req, res) {
    const searchQuery = req.query.query;
    let dbQuery;
    let personal = {};
    const whereCondition = {
      $or: [
        {
          title: {
            $iLike: `%${searchQuery}%`
          }
        },
        {
          content: {
            $iLike: `%${searchQuery}%`
          }
        }
      ]
    };
    if (req.adminType === 'superAdmin') {
      dbQuery = {
        where: whereCondition
      };
    } else if (req.adminType === 'departmentAdmin') {
      dbQuery = {
        where: whereCondition,
        include: [{
          model: db.Users,
          where: { departmentId: req.decoded.departmentId }
        }]
      };
    }
    db.Documents.findAll({ where: { userId: req.decoded.id } })
    .then((docs) => {
      personal = docs;
    });
    dbQuery = {
      where: whereCondition,
      include: [{
        model: db.AccessTypes,
        where: { name: { $ne: 'private' } },
      },
      {
        model: db.Users,
        where: { departmentId: req.decoded.departmentId }
      }]
    };
    db.Documents.findAll(dbQuery)
    .then((documents) => {
      if (!documents.length) {
        return res.status(200)
        .send({ message: 'No Documents matching search found' });
      } else if (req.adminType === 'user') {
        return res.status(200).send({ main: documents, own: personal });
      }
      return res.status(200).send(documents);
    });
  }
};

export default DocumentsController;
