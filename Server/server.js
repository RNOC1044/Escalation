const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port =  5000;

//app.use(cors());
app.use(cors({
  origin: 'https://escalation-1.onrender.com', // URL ของ React frontend ที่โฮสต์บน Render
  methods: ['GET', 'POST'], // จำกัด HTTP methods ตามที่ใช้งานจริง
}));

app.use(express.json());

const db = new Pool({
// host: 'localhost',
//  user: 'postgres',
//  password: '1234',
//  database: 'postgresdb',
//  port: 5432,
//});

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

  // ปรับ SQL ให้กรองข้อมูลตามคำค้นหา
  const sql = `
    SELECT * 
    FROM companiesdb
    WHERE 
      name ILIKE $1 OR
      customer_id::text ILIKE $1 OR
      area ILIKE $1
  `;
  const values = [`%${query}%`]; // ใช้ Wildcard % เพื่อให้ค้นหาข้อมูลที่มีคำค้นหาอยู่ในคำใดคำหนึ่ง

  try {
    const results = await db.query(sql, values);
    res.json(results.rows);
  } catch (err) {
    next(err);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   res.status(500).json({ error: err.message || 'Internal Server Error' });
// });

