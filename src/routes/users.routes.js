const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');

// All user management routes require authentication and Admin role
router.use(authenticate);
router.use(requireRole(['Admin']));

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
router.put('/:id/role', usersController.updateUserRole);
router.put('/:id/status', usersController.updateUserStatus);

module.exports = router;
