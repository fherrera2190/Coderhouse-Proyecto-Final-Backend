const productsModels = require("../../dao/mongo/models/products.models");

module.exports = async (req, res) => {
  try {
    await productsModels.create(req.body);
    const productos = await productsModels.find().lean();
    req.io.emit("actualizarProductos", productos);
    return res.sendSuccess(productos);
  } catch (error) {
    return res.sendServerError(error.message);
  }
};
