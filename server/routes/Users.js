import Authentication from '../middleware/Authentication';

const router = require('express').Router();

const UsersController = require('../controllers/Users');
// const DocumentsController = require('../../app/controllers/documents');

router.route('/')
.get(Authentication.verifyToken, Authentication.verifyAdmin, UsersController.fetchAll)
.post(UsersController.create);

router.route('/:id')
.get(Authentication.verifyToken, UsersController.fetchOne)
.put(Authentication.verifyToken, UsersController.edit)
.delete(Authentication.verifyToken, UsersController.destroy);

// router.get('/:id/documents', Authentication.verifyToken, DocumentsController.userDocuments);

router.post('/login', UsersController.login);
router.post('/logout', UsersController.logout);

module.exports = router;
