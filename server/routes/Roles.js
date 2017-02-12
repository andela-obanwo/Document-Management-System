import Authentication from '../middleware/Authentication';
import RolesController from '../controllers/Roles';

const router = require('express').Router();

router.route('/')
.get(Authentication.verifyToken, Authentication.verifyAdmin, RolesController.fetchAll)
.post(Authentication.verifyToken, Authentication.verifyAdmin, RolesController.create);

router.route('/:id')
.put(Authentication.verifyToken, Authentication.verifyAdmin, RolesController.edit)
.delete(Authentication.verifyToken, Authentication.verifyAdmin, RolesController.destroy);

module.exports = router;
