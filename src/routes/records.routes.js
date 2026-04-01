const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/records.controller');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');

router.use(authenticate);

// Analyst and Admin can view records
router.get('/', requireRole(['Analyst', 'Admin']), recordsController.getRecords);
router.get('/:id', requireRole(['Analyst', 'Admin']), recordsController.getRecord);

// Only Admin can create, update, delete records
router.post('/', requireRole(['Admin']), recordsController.createRecord);
router.put('/:id', requireRole(['Admin']), recordsController.updateRecord);
router.delete('/:id', requireRole(['Admin']), recordsController.deleteRecord);

module.exports = router;
