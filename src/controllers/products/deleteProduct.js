const { mongoose } = require("mongoose");
const productsModels = require("../../dao/mongo/models/product.model");

module.exports = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid.trim()))
      return res.status(400).json({ error: "Id invalido" });
    const product = await productsModels.deleteOne({
      _id: { $eq: req.params.pid.trim() }
    });
    if (!product)
      return res
        .status(200)
        .json({ status: "OK", msg: "No existe producto con ese pid" });
    const productos = await productsModels.find().lean();
    req.io.emit("actualizarProductos", productos);
    return res
      .status(200)
      .json({ status: "OK", msg: "Producto eliminado exitosamente" });
  } catch (error) {
    req.logger.error(error.message)
    return res.sendServerError(error.message);
  }
};
