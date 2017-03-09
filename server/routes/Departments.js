import express from 'express';
import Authentication from '../middleware/Authentication';
import DepartmentsController from '../controllers/Departments';

const router = express.Router();

router.route('/')
.get(Authentication.verifyToken,
  Authentication.verifySuperAdmin, DepartmentsController.fetchAll)
.post(Authentication.verifyToken, Authentication.checkId,
  Authentication.verifySuperAdmin, DepartmentsController.create);

router.route('/:id')
.put(Authentication.verifyToken, Authentication.checkId,
  Authentication.verifySuperAdmin, DepartmentsController.edit)
.delete(Authentication.verifyToken,
  Authentication.verifySuperAdmin, DepartmentsController.destroy);

export default router;
