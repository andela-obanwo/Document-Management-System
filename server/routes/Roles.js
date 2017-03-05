import express from 'express';
import Authentication from '../middleware/Authentication';
import RolesController from '../controllers/Roles';

const router = express.Router();

router.route('/')
.get(Authentication.verifyToken, Authentication.verifySuperAdmin,
  RolesController.fetchAll)
.post(Authentication.verifyToken, Authentication.verifySuperAdmin,
  RolesController.create);

router.route('/:id')
.put(Authentication.verifyToken, Authentication.verifySuperAdmin,
  RolesController.edit)
.delete(Authentication.verifyToken, Authentication.verifySuperAdmin,
  RolesController.destroy);

export default router;
