import express from "express";
import pkg from "pg"; 
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg; 

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/grades', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM grades');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching grades:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
app.get('/', (req, res)=>res.send("hey sam"))
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
