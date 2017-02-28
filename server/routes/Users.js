import RouterFile from 'express';
import Authentication from '../middleware/Authentication';
import DocumentsController from '../controllers/Documents';
import UsersController from '../controllers/Users';

const router = RouterFile.Router();

router.route('/')
.get(Authentication.verifyToken, Authentication.validator,
  UsersController.fetchAll)
.post(UsersController.create);

router.route('/:id')
.get(Authentication.verifyToken, Authentication.validator, UsersController.fetchOne)
.put(Authentication.verifyToken, Authentication.validator, UsersController.edit)
.delete(Authentication.verifyToken, Authentication.validator, UsersController.destroy);

router.get('/:id/documents', Authentication.verifyToken,
  DocumentsController.fetchUserDocuments);

router.post('/createadmin', Authentication.verifyToken,
  Authentication.verifyAdmin, UsersController.createAdmin);

router.post('/login', UsersController.login);
router.post('/logout', UsersController.logout);

export default router;
