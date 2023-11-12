const { productService } = require("../../services/index.service.js");
module.exports = async (req, res) => {
  try {
    const product = await productService.getById(req.params.pid);
    if (!product)
      return res.errorResourceNotFound("Product don´t exist")
    res.sendSuccess(product)
  } catch (error) {
    return res.sendServerError(error.message);
  }
};
