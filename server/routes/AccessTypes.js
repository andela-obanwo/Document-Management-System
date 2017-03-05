import express from 'express';
import Authentication from '../middleware/Authentication';
import AccessTypesController from '../controllers/AccessTypes';

const router = express.Router();

router.route('/')
.get(Authentication.verifyToken, Authentication.verifySuperAdmin,
  AccessTypesController.fetchAll)
.post(Authentication.verifyToken, Authentication.verifySuperAdmin,
  AccessTypesController.create);

router.route('/:id')
.put(Authentication.verifyToken, Authentication.verifySuperAdmin,
  AccessTypesController.edit)
.delete(Authentication.verifyToken, Authentication.verifySuperAdmin,
  AccessTypesController.destroy);

export default router;
