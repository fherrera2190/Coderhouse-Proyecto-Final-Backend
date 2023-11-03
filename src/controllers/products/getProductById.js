const productsModels = require("../../dao/mongo/models/products.models");
const { mongoose } = require("mongoose");
module.exports = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid.trim()))
      return res.status(400).json({ error: "Id invalido" });
    const product = await productsModels.findOne({
      _id: { $eq: req.params.pid.trim() }
    });
    if (!product)
      return res
        .status(200)
        .json({ status: "OK", msg: "No existe producto con ese pid" });
    return res.status(200).json({ status: "OK", product: product });
  } catch (error) {
    return res.statsendServerError(error.message);
  }
};
