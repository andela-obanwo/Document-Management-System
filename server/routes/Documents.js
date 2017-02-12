import Authentication from '../middleware/Authentication';
import DocumentsController from '../controllers/Documents';

const router = require('express').Router();

router.route('/')
.get(Authentication.verifyToken, Authentication.documentValidator, DocumentsController.fetchAll)
// .post(Authentication.verifyToken, Authentication.verifyAdmin, DocumentsController.create);
//
// router.route('/:id')
// .put(Authentication.verifyToken, Authentication.verifyAdmin, DocumentsController.edit)
// .delete(Authentication.verifyToken, Authentication.verifyAdmin, DocumentsController.destroy);

module.exports = router;
