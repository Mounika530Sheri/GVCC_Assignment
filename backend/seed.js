const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data.sqlite');
const sql = fs.readFileSync(path.join(__dirname, 'schema.sql')).toString();

const db = new sqlite3.Database(DB_PATH);
db.exec(sql, function(err) {
  if (err) {
    console.error('Seed error:', err);
  } else {
    console.log('Database seeded at', DB_PATH);
  }
  db.close();
});