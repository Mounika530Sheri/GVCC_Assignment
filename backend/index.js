require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const { search = '', category = '', page = 1, limit = 8 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    let where = [];
    let params = [];
    if (search) { where.push("(name LIKE ? OR short_desc LIKE ?)"); params.push(`%${search}%`, `%${search}%`); }
    if (category) { where.push("category = ?"); params.push(category); }
    const whereSql = where.length ? 'WHERE ' + where.join(' AND ') : '';
    const totalRow = await db.get(`SELECT COUNT(*) as cnt FROM products ${whereSql}`, params);
    const rows = await db.all(`SELECT * FROM products ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`, params.concat([Number(limit), offset]));
    res.json({ products: rows, total: totalRow.cnt, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    const row = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/enquiries
app.post('/api/enquiries', async (req, res) => {
  try {
    const { product_id, name, email, phone, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required' });
    const stmt = await db.run(
      `INSERT INTO enquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)`,
      [product_id || null, name, email, phone || null, message]
    );
    const inserted = await db.get('SELECT * FROM enquiries WHERE id = ?', [stmt.lastID]);
    res.status(201).json({ enquiry: inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/enquiries
app.get('/api/enquiries', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM enquiries ORDER BY created_at DESC');
    res.json({ enquiries: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));