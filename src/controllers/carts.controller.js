const cartsController = {
  addCart: require("./carts/addCart"),
  addProduct: require("./carts/addProduct"),
  getCartById: require("./carts/getCartById"),
  purchase: require("./carts/purchase"),
  updateCart: require("./carts/updateCart"),
  updateQuantity: require("./carts/updateQuantity"),
  deleteProduct: require("./carts/deleteProduct"),
  deleteProducts: require("./carts/deleteProducts")
};

module.exports = cartsController;
