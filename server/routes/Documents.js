import express from 'express';
import Authentication from '../middleware/Authentication';
import DocumentsController from '../controllers/Documents';

const router = express.Router();

router.route('/')
.get(Authentication.verifyToken, Authentication.validator,
  DocumentsController.fetchAll)
.post(Authentication.verifyToken, DocumentsController.create);

router.route('/:id')
.get(Authentication.verifyToken, Authentication.validator,
  DocumentsController.fetchOne)
.put(Authentication.verifyToken, Authentication.validator,
  DocumentsController.edit)
.delete(Authentication.verifyToken, Authentication.validator,
  DocumentsController.destroy);

router.get('/search/:searchQuery', Authentication.verifyToken,
  DocumentsController.searchDocuments);

export default router;
