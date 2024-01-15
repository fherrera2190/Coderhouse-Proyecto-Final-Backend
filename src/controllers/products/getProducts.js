const { productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {

    const products = await productService.get();
    return res.sendSuccess({
      products: products.docs,
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
