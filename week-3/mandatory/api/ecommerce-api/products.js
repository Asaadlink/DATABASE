const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

//Load all the product names along with their supplier names
const loadAllProdNamesAndSupplierNames = async (req, res) => {
  try {
    const selectProducts = await pool.query(
      "select products.product_name,suppliers.supplier_name from products INNER join suppliers on products.supplier_id=suppliers.id"
    );
    res.json(selectProducts.rows);
  } catch (err) {
    console.error(err.message);
  }
};

//Update the previous GET endpoint /products to filter the list of products by name using a query parameter, for example /products?name=Cup. This endpoint should still work even if you don't use the name query parameter!
const filterProductsByName = async (req, res) => {
  try {
    const newName = req.query.name;
    const result = newName
      ? await pool.query(
          `SELECT * FROM products 
            INNER JOIN suppliers  ON products.supplier_id = suppliers.id 
            WHERE products.product_name LIKE '%${newName}%'`
        )
      : await pool.query(
          `SELECT * FROM products  
            INNER JOIN suppliers  ON products.supplier_id = suppliers.id`
        );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//- Add a new POST endpoint `/products` to create a new product (with a product name, a price and a supplier id).
//Check that the price is a positive integer and that the supplier ID exists in the database, otherwise return an error.

const createNewProduct = function (req, res) {
  const productName = req.body.product_name;
  const unitPrice = req.body.unit_price;
  const supplierId = req.body.supplier_id;

  pool
    .query("select * from suppliers where id=$1", [supplierId])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(400).send("Supplier does not exists!");
      } else if (
        !Number.isInteger(JSON.parse(unitPrice)) ||
        JSON.parse(unitPrice) <= 0
      ) {
        return res
          .status(400)
          .send("The unit price should be a positive integer.");
      } else {
        const query =
          "Insert into products(product_name,unit_price,supplier_id) VALUES($1, $2, $3) ";
        pool
          .query(query, [productName, unitPrice, supplierId])
          .then(() => res.send("New Product Created"))
          .catch((e) => console.error(e));
      }
    });
};

module.exports = {
  loadAllProdNamesAndSupplierNames,
  filterProductsByName,
  createNewProduct,
};
