import express from 'express';
import Authentication from '../middleware/Authentication';
import AccessTypesController from '../controllers/AccessTypes';

const router = express.Router();

router.route('/')
.get(Authentication.verifyToken, Authentication.verifyAdmin,
  AccessTypesController.fetchAll)
.post(Authentication.verifyToken, Authentication.verifyAdmin,
  AccessTypesController.create);

router.route('/:id')
.put(Authentication.verifyToken, Authentication.verifyAdmin,
  AccessTypesController.edit)
.delete(Authentication.verifyToken, Authentication.verifyAdmin,
  AccessTypesController.destroy);

export default router;
