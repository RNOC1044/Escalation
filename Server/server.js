const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

db.on('error', (err) => {
  console.error('Database error:', err);
  process.exit(-1);
});

app.get('/api/search', async (req, res, next) => {
  const query = req.query.query;
  if (!query || query.length > 50) {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  const sql = 'SELECT * FROM datafrom WHERE ID::text LIKE $1';
  try {
    const results = await db.query(sql, [`%${query}%`]);
    res.json(results.rows);
  } catch (err) {
    next(err); // ส่งไปที่ Error Middleware
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
