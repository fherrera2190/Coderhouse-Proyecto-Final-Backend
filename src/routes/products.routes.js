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

    this.post("/", ["PUBLIC"], addProduct);

    this.put("/:pid", ["PUBLIC"], updateProduct);

    this.delete("/:pid", ["PUBLIC"], deleteProduct);
  }
}

module.exports = new ProductsRouter();
