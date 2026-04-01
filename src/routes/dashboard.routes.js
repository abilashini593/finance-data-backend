const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');

router.use(authenticate);

// Analyst and Admin can view dashboard summary
router.get('/summary', requireRole(['Analyst', 'Admin']), dashboardController.getSummary);

module.exports = router;
