const {
  getCartById,
  addCart,
  addProduct,
  updateCart,
  updateQuantity,
  deleteProduct,
  deleteProducts,
  purchase
} = require("../controllers/carts.controller");

const Router = require("./router");

class CartsRouter extends Router {
  init() {
    this.post("/", ["USER","PREMIUM"], addCart);

    this.get("/:cid", ["USER","PREMIUM"], getCartById);

    this.get("/:cid/purchase", ["USER","PREMIUM"], purchase);

    this.post("/:cid/products/:pid", ["USER","PREMIUM"], addProduct);

    this.put("/:cid", ["USER","PREMIUM"], updateCart);

    this.put("/:cid/products/:pid", ["USER","PREMIUM"], updateQuantity);

    this.delete("/:cid/products/:pid", ["USER","PREMIUM"], deleteProduct);

    this.delete("/:cid", ["USER","PREMIUM"], deleteProducts);
  }
}

module.exports = new CartsRouter();
