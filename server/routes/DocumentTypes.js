import express from 'express';
import Authentication from '../middleware/Authentication';
import DocumentTypesController from '../controllers/DocumentTypes';

const router = express.Router();

router.route('/')
.get(Authentication.verifyToken,
  Authentication.verifySuperAdmin, DocumentTypesController.fetchAll)
.post(Authentication.verifyToken, Authentication.checkId,
  Authentication.verifySuperAdmin, DocumentTypesController.create);

router.route('/:id')
.put(Authentication.verifyToken, Authentication.checkId,
  Authentication.verifySuperAdmin, DocumentTypesController.edit)
.delete(Authentication.verifyToken,
  Authentication.verifySuperAdmin, DocumentTypesController.destroy);

export default router;
