const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Load all orders from the database
const loadAllOrders = async (req, res) => {
  try {
    const selectOrders = await pool.query("SELECT * FROM orders");
    res.json(selectOrders.rows);
  } catch (err) {
    console.error(err.message);
  }
};

//Add a new DELETE endpoint `/orders/:orderId` to delete an existing order along all the associated order items.
const deleteOrder = (req, res) => {
  const orderId = req.params.orderId;
  const deleteOrderItem = "DELETE from order_items  where order_id = $1";
  const deleteOrder = "DELETE from orders where id = $1";

  pool
    .query(deleteOrderItem, [orderId])
    .then(() => {
      pool
        .query(deleteOrder, [orderId])
        .then(() =>
          res.send(`Order ${orderId} and Order Items have been deleted`)
        )
        .catch((error) => res.error(error.message));
    })
    .catch((error) => res.error(error.message));
};

module.exports = {
  loadAllOrders,
  deleteOrder,
};
