const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.verifyToken, authMiddleware.allowRoles('admin'), userController.getAllUsers);
router.get('/:id', authMiddleware.verifyToken, userController.getUserById);
router.put('/:id', authMiddleware.verifyToken, userController.updateUserProfile);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.allowRoles('admin'), userController.deleteUser);

module.exports = router;
