const { getDb } = require('../db');

async function createRecord({ amount, type, category, date, notes, createdBy }) {
  const db = await getDb();
  const result = await db.run(
    'INSERT INTO records (amount, type, category, date, notes, createdBy) VALUES (?, ?, ?, ?, ?, ?)',
    [amount, type, category, date, notes, createdBy]
  );
  return await getRecordById(result.lastID);
}

async function getRecordById(id) {
  const db = await getDb();
  return await db.get('SELECT * FROM records WHERE id = ? AND isDeleted = 0', [id]);
}

async function getRecords({ limit = 10, offset = 0, date, category, type } = {}) {
  const db = await getDb();
  
  let query = 'SELECT * FROM records WHERE isDeleted = 0';
  const params = [];

  if (date) {
    query += ' AND date = ?';
    params.push(date);
  }
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (type) {
    query += ' AND type = ?';
    params.push(type);
  }

  query += ' ORDER BY date DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  return await db.all(query, params);
}

async function updateRecord(id, { amount, type, category, date, notes }) {
  const db = await getDb();
  
  const updates = [];
  const params = [];
  
  if (amount !== undefined) { updates.push('amount = ?'); params.push(amount); }
  if (type !== undefined) { updates.push('type = ?'); params.push(type); }
  if (category !== undefined) { updates.push('category = ?'); params.push(category); }
  if (date !== undefined) { updates.push('date = ?'); params.push(date); }
  if (notes !== undefined) { updates.push('notes = ?'); params.push(notes); }
  
  if (updates.length > 0) {
    params.push(id);
    await db.run(`UPDATE records SET ${updates.join(', ')} WHERE id = ? AND isDeleted = 0`, params);
  }
  
  return await getRecordById(id);
}

async function softDeleteRecord(id) {
  const db = await getDb();
  await db.run('UPDATE records SET isDeleted = 1 WHERE id = ?', [id]);
}

module.exports = {
  createRecord,
  getRecordById,
  getRecords,
  updateRecord,
  softDeleteRecord
};
