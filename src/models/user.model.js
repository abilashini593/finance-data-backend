const { getDb } = require('../db');

async function createUser(username, passwordHash, role = 'Viewer', status = 'active') {
  const db = await getDb();
  const result = await db.run(
    'INSERT INTO users (username, passwordHash, role, status) VALUES (?, ?, ?, ?)',
    [username, passwordHash, role, status]
  );
  return { id: result.lastID, username, role, status };
}

async function getUserByUsername(username) {
  const db = await getDb();
  return await db.get('SELECT * FROM users WHERE username = ?', [username]);
}

async function getUserById(id) {
  const db = await getDb();
  return await db.get('SELECT id, username, role, status, createdAt FROM users WHERE id = ?', [id]);
}

async function getAllUsers() {
  const db = await getDb();
  return await db.all('SELECT id, username, role, status, createdAt FROM users');
}

async function updateUserRole(id, role) {
  const db = await getDb();
  await db.run('UPDATE users SET role = ? WHERE id = ?', [role, id]);
}

async function updateUserStatus(id, status) {
  const db = await getDb();
  await db.run('UPDATE users SET status = ? WHERE id = ?', [status, id]);
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  updateUserRole,
  updateUserStatus
};
