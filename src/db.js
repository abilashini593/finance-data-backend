const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

let db;

async function getDb() {
  if (db) return db;
  
  const dbPath = process.env.DB_PATH || path.join(__dirname, '..', 'finance.sqlite');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  
  return db;
}

async function initDb() {
  const database = await getDb();
  
  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'Viewer',
      status TEXT NOT NULL DEFAULT 'active',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  await database.exec(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      notes TEXT,
      createdBy INTEGER NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      isDeleted INTEGER DEFAULT 0,
      FOREIGN KEY(createdBy) REFERENCES users(id)
    );
  `);
}

module.exports = {
  getDb,
  initDb
};
