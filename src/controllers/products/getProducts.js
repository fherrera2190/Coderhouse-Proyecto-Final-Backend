const productService = require("../../services/products.service");

module.exports = async (req, res) => {
  try {
    console.log(req.params);
    const products = await productService.getProducts();
    return res.sendSuccess(products);
  } catch (error) {
    return res.statsendServerError(error.message);
  }
};
