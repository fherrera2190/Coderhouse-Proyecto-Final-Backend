const productsModels = require("../../dao/mongo/models/product.model");
module.exports = async (req, res) => {
  try {
    let products = await productsModels.find().lean();
    products = products.filter(
      (product) => product.owner === req.user.user.email
    );
    res.sendSuccess(products);
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
