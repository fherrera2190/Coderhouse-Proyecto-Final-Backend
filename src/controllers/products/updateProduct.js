const { mongoose } = require("mongoose");
const productsModels = require("../../dao/mongo/models/product.model");

module.exports = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid.trim()))
      return res.status(400).json({ error: "Id invalido" });
    const product = await productsModels.findByIdAndUpdate(
      req.params.pid.trim(),
      req.body
    );
    if (!product)
      return res
        .status(200)
        .json({ status: "OK", msg: "No existe producto con ese pid" });
    const productos = await productsModels.find().lean();
    req.io.emit("actualizarProductos", productos);
    return res.status(200).json({ status: "OK", product: product });
  } catch (error) {
    console.log(error);
  }
};
