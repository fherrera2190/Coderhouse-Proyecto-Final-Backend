const Router = require("./router");
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/products.controller");

class ProductsRouter extends Router {
  init() {
    this.get("/", ["PUBLIC"], getProducts);

    this.get("/:pid", ["PUBLIC"], getProductById);

    this.post("/", ["ADMIN"], addProduct);

    this.put("/:pid", ["ADMIN"], updateProduct);

    this.delete("/:pid", ["ADMIN"], deleteProduct);
  }
}

module.exports = new ProductsRouter();
