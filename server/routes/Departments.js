import Authentication from '../middleware/Authentication';
import DepartmentsController from '../controllers/Departments';

const router = require('express').Router();

router.route('/')
.get(Authentication.verifyToken, Authentication.verifyAdmin, DepartmentsController.fetchAll)
.post(Authentication.verifyToken, Authentication.verifyAdmin, DepartmentsController.create);

router.route('/:id')
.put(Authentication.verifyToken, Authentication.verifyAdmin, DepartmentsController.edit)
.delete(Authentication.verifyToken, Authentication.verifyAdmin, DepartmentsController.destroy);

module.exports = router;
