const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port =  5000;

app.use(cors());
app.use(express.json());

const db = new Pool({
  host: process.env.DB_HOST || 'dpg-ctd4lgpu0jms73f2e3q0-a.singapore-postgres.render.com',
  user: process.env.DB_USER || 'postgresdb_2vxg_user',
  password: process.env.DB_PASSWORD || 'xtWcwoYlT2h4FZQ5CZCyYFsaccocBvnW',  
  database: process.env.DB_NAME || 'postgresdb_2vxg',
  port: process.env.DB_PORT || 5432,
});

db.on('error', (err) => {
  console.error('Database error:', err);
  process.exit(-1);
});


app.get('/api/test', (req, res) => {
  console.log("Hello World!");
  
});

app.get('/api/search', async (req, res, next) => {
  const query = req.query.query;
  if (!query || query.length > 50) {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  const sql = 'SELECT * FROM companiesdb WHERE name LIKE $1';
  try {
    const results = await db.query(sql, [`%${query}%`]);
    res.json(results.rows);
  } catch (err) {
    next(err); // ส่งไปที่ Error Middleware
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   res.status(500).json({ error: err.message || 'Internal Server Error' });
// });

