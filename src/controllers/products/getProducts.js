const { productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    console.log(req.params);
    const products = await productService.getProducts();
    return res.sendSuccess(products);
  } catch (error) {
    return res.sendServerError(error.message);
  }
};
