const express = require("express");
const app = express();
const { Pool } = require("pg");
app.use(express.json());

require('dotenv').config()


const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

// Load all the customers from the database
app.get("/customers", async (req, res) => {
  try {
    const selectCustomers = await pool.query("SELECT * FROM customers");
    res.json(selectCustomers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Load all the suppliers from the database
app.get("/suppliers", async (req, res) => {
  try {
    const selectSuppliers = await pool.query("SELECT * FROM suppliers");
    res.json(selectSuppliers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Load all the product names along with their supplier names
app.get("/products", async (req, res) => {
  try {
    const selectProducts = await pool.query(
      "select products.product_name,suppliers.supplier_name from products INNER join suppliers on products.supplier_id=suppliers.id"
    );
    res.json(selectProducts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log("server has started on port 3000");
});
