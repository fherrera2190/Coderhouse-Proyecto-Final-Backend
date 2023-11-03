const {
  getCartById,
  addCart,
  addProduct
} = require("../controllers/carts.controller");
const Router = require("./router");

class CartsRouter extends Router {
  init() {
    this.get("/:cid", ["USER"], getCartById);

    this.post("/", ["USER"], addCart);

    this.post("/:cid/products/:pid", ["USER"], addProduct);

    
  }
}
