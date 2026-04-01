const RecordModel = require('../models/record.model');

async function createRecord(req, res, next) {
  try {
    const { amount, type, category, date, notes } = req.body;
    
    // Authorization is handled by middleware (Admin only)
    if (!amount || !type || !category || !date) {
      return res.status(400).json({ error: 'amount, type, category, and date are required' });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'type must be income or expense' });
    }

    const newRecord = await RecordModel.createRecord({ 
      amount, type, category, date, notes, createdBy: req.user.id 
    });

    res.status(201).json({ message: 'Record created successfully', record: newRecord });
  } catch (error) {
    next(error);
  }
}

async function getRecords(req, res, next) {
  try {
    const { page = 1, limit = 10, date, category, type } = req.query;
    const limitNum = parseInt(limit, 10);
    const offset = (parseInt(page, 10) - 1) * limitNum;

    const records = await RecordModel.getRecords({
      limit: limitNum, offset, date, category, type
    });

    res.json({ page: parseInt(page, 10), limit: limitNum, records });
  } catch (error) {
    next(error);
  }
}

async function getRecord(req, res, next) {
  try {
    const { id } = req.params;
    const record = await RecordModel.getRecordById(id);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ record });
  } catch (error) {
    next(error);
  }
}

async function updateRecord(req, res, next) {
  try {
    const { id } = req.params;
    const { amount, type, category, date, notes } = req.body;

    const record = await RecordModel.getRecordById(id);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const updatedRecord = await RecordModel.updateRecord(id, { amount, type, category, date, notes });

    res.json({ message: 'Record updated successfully', record: updatedRecord });
  } catch (error) {
    next(error);
  }
}

async function deleteRecord(req, res, next) {
  try {
    const { id } = req.params;
    
    const record = await RecordModel.getRecordById(id);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await RecordModel.softDeleteRecord(id);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createRecord,
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord
};
