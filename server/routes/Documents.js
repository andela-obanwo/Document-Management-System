import express from 'express';
import Authentication from '../middleware/Authentication';
import DocumentsController from '../controllers/Documents';

const router = express.Router();

router.route('/')
.get(Authentication.verifyToken, Authentication.documentValidator,
  DocumentsController.fetchAll)
.post(Authentication.verifyToken, DocumentsController.create);

router.route('/:id')
.get(Authentication.verifyToken, Authentication.documentValidator,
  DocumentsController.fetchOne)
.put(Authentication.verifyToken, Authentication.documentValidator,
  DocumentsController.edit)
.delete(Authentication.verifyToken, Authentication.documentValidator,
  DocumentsController.destroy);

router.get('/search/:searchQuery', Authentication.verifyToken,
  DocumentsController.searchDocuments);

export default router;
