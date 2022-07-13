const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const {
  loadAllCustomers,
  loadCustomerByID,
  createNewCustomer,
  loadAllCustomerOrders,
  createNewOrderForCustomer,
  updateCustomer,
  deleteCustomer,
} = require("./customers");

const { loadAllSuppliers } = require("./suppliers");

const {
  loadAllProdNamesAndSupplierNames,
  filterProductsByName,
  createNewProduct,
} = require("./products");

const { loadAllOrders, deleteOrder } = require("./orders");

// Load all the customers from the database
app.get("/customers", loadAllCustomers);

// Load all the suppliers from the database
app.get("/suppliers", loadAllSuppliers);

// Load all the product names along with their supplier names
app.get("/products", loadAllProdNamesAndSupplierNames);

//Update the previous GET endpoint /products to filter the list of products by name using a query parameter, for example /products?name=Cup. This endpoint should still work even if you don't use the name query parameter!
app.get("/products", filterProductsByName);

//Add a new GET endpoint /customers/:customerId to load a single customer by ID.
app.get("/customers/:customerId", loadCustomerByID);

//Add a new POST endpoint /customers to create a new customer.
app.post("/customers", createNewCustomer);

//Add a new GET endpoint `/customers/:customerId/orders` to load all the orders along the items in the orders of a specific customer.
//Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities.
app.get("/customers/:customerId/orders", loadAllCustomerOrders);

// Add a new POST endpoint /customers/:customerId/orders to create a new order (including an order date, and an order reference) for a customer.
// Check that the customerId corresponds to an existing customer or return an error.
app.post("/customers/:customerId/orders", createNewOrderForCustomer);

// Add a new POST endpoint `/products` to create a new product (with a product name, a price and a supplier id).
//Check that the price is a positive integer and that the supplier ID exists in the database, otherwise return an error.
app.post("/products", createNewProduct);

// Add a new PUT endpoint `/customers/:customerId` to update an existing customer (name, address, city and country).
app.put("/customers/:customerId", updateCustomer);

// Load all the orders from the database
app.get("/orders", loadAllOrders);

// Add a new DELETE endpoint `/orders/:orderId` to delete an existing order along all the associated order items.
app.delete("/orders/:orderId", deleteOrder);

// Add a new DELETE endpoint `/customers/:customerId` to delete an existing customer only if this customer doesn't have orders.
app.delete("/customers/:customerId", deleteCustomer);

app.listen(3000, () => {
  console.log("server has started on port 3000");
});
