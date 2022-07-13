const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Load all the suppliers from the database
const loadAllSuppliers = async (req, res) => {
  try {
    const selectSuppliers = await pool.query("SELECT * FROM suppliers");
    res.json(selectSuppliers.rows);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {loadAllSuppliers }
