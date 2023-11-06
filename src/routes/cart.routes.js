const {
  getCartById,
  addCart,
  addProduct,
  updateCart,
  updateQuantity,
  deleteProduct,
  deleteProducts
} = require("../controllers/carts.controller");

const Router = require("./router");

class CartsRouter extends Router {
  init() {
    this.get("/:cid", ["USER"], getCartById);

    this.post("/", ["USER"], addCart);

    this.post("/:cid/products/:pid", ["USER"], addProduct);

    this.put("/:cid", ["USER"], updateCart);

    this.put("/:cid/products/:pid", ["USER"], updateQuantity);

    this.delete("/:cid/products/:pid", ["USER"], deleteProduct);

    this.delete("/:cid", ["USER"], deleteProducts);
  }
}

module.exports = new CartsRouter();
