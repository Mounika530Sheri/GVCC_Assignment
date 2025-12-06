const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data.sqlite');

let dbPromise = open({
  filename: DB_PATH,
  driver: sqlite3.Database
});

module.exports = {
  get: async (sql, params=[]) => {
    const db = await dbPromise;
    return db.get(sql, params);
  },
  all: async (sql, params=[]) => {
    const db = await dbPromise;
    return db.all(sql, params);
  },
  run: async (sql, params=[]) => {
    const db = await dbPromise;
    return db.run(sql, params);
  }
};