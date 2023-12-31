const productsController = {
  getProducts: require("./products/getProducts"),
  getProductById: require("./products/getProductById"),
  getPorudctsByUid: require("./products/getProductsByUserId"),
  addProduct: require("./products/addProduct"),
  updateProduct: require("./products/updateProduct"),
  deleteProduct: require("./products/deleteProduct"),
};

module.exports = productsController;
