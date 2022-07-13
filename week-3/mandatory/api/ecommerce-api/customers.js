const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
// Load all the customers from the database
const loadAllCustomers = async (req, res) => {
  try {
    const selectCustomers = await pool.query("SELECT * FROM customers");
    res.json(selectCustomers.rows);
  } catch (err) {
    console.error(err.message);
  }
};

//Add a new GET endpoint /customers/:customerId to load a single customer by ID.
const loadCustomerByID = function (req, res) {
  const customerId = req.params.customerId;

  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) =>
      result.rows.length > 0
        ? res.json(result.rows)
        : res.status(400).send("ID does not exist")
    )
    .catch((e) => console.error(e));
};

//Add a new POST endpoint /customers to create a new customer.
const createNewCustomer = function (req, res) {
  const name = req.body.name;
  const country = req.body.country;
  const address = req.body.address;
  const city = req.body.city;

  const query =
    "Insert into customers(name,address,country,city) VALUES($1,$2,$3,$4)";
  pool
    .query(query, [name, address, country, city])
    .then(() => res.send("Customer Created"))
    .catch((e) => console.error(e));
};

// Add a new GET endpoint /customers/:customerId/orders to load all the orders along the items in the orders of a specific customer.
// Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities.
const loadAllCustomerOrders = (req, res) => {
  let customerId = req.params.customerId;

  const getCustomerOrders =
    "select o.order_reference, o.order_date, p.product_name, p.unit_price, s.supplier_name, oi.quantity " +
    "from orders o join order_items oi on o.id = oi.order_id " +
    "join products p on p.id = oi.product_id " +
    "join suppliers s on p.supplier_id = s.id " +
    "where o.customer_id = $1";
  pool
    .query(getCustomerOrders, [customerId])
    .then((result) => res.json(result.rows))
    .catch((error) => console.error("Something is wrong " + error));
};

// Add a new POST endpoint /customers/:customerId/orders to create a new order (including an order date, and an order reference) for a customer.
//Check that the customerId corresponds to an existing customer or return an error.
const createNewOrderForCustomer = (req, res) => {
  let customerId = req.params.customerId;
  let orderDate = req.body.order_date;
  let orderRef = req.body.order_reference;
  console.log("Id " + customerId);

  const checkCustomer = "select * from customers where id = $1";
  const insertOrder =
    "insert into orders(order_date, order_reference, customer_id) values($1, $2, $3)";

  pool
    .query(checkCustomer, [customerId])
    .then((result) => {
      if (result.rows.length > 0) {
        pool
          .query(insertOrder, [orderDate, orderRef, customerId])
          .then(() => res.send("Order created"))
          .catch((error) =>
            console.error("Something is wrong when adding new order" + error)
          );
      } else {
        res.status(400).send("Customer id " + customerId + " does not exist");
      }
    })
    .catch((error) => console.error("Something is wrong " + error));
};

//Add a new PUT endpoint `/customers/:customerId` to update an existing customer (name, address, city and country).
const updateCustomer = function (req, res) {
  const customerId = req.params.customerId;
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const country = req.body.country;

  const queryResult =
    "UPDATE customers SET  name=$1, address=$2, city=$3, country=$4 WHERE id=$5";
  pool
    .query(queryResult, [name, address, city, country, customerId])
    .then(() => res.send(`Customer ${customerId} updated!`))
    .catch((e) => console.error(e));
};

// Add a new DELETE endpoint `/customers/:customerId`
//to delete an existing customer only if this customer doesn't have orders.
const deleteCustomer = (req, res) => {
  const customerId = req.params.customerId;
  const checkOrdersOfTheCustomer =
    "select * from orders where orders.customer_id = $1";
  const deleteClient = "DELETE from customers where id = $1";

  pool
    .query(checkOrdersOfTheCustomer, [customerId])
    .then((result) => {
      if (result.rows.length > 0) {
        res
          .status(400)
          .send(
            " You can not delete the Customer " +
              customerId +
              " because it has orders"
          );
      } else {
        pool
          .query(deleteClient, [customerId])
          .then(() => res.send(`Customer ${customerId} deleted!`))
          .catch((e) => console.error(e));
      }
    })
    .catch((error) => console.error("Something is wrong " + error));
};

module.exports = {
  loadAllCustomers,
  loadCustomerByID,
  createNewCustomer,
  loadAllCustomerOrders,
  createNewOrderForCustomer,
  updateCustomer,
  deleteCustomer,
};
