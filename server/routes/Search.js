import express from 'express';
import Authentication from '../middleware/Authentication';
import DocumentsController from '../controllers/Documents';

const router = express.Router();

// Search Documents
router.get('/documents', Authentication.verifyToken,
  Authentication.validator, DocumentsController.searchDocuments);

export default router;
