const { mongoose } = require("mongoose");
const cartsModels = require("../../dao/mongo/models/carts.models");

module.exports = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cid))
    return res.status(400).json({ error: "Cid invalid" });
  const { cid } = req.params;
  try {
    const cart = await cartsModels.findById(cid).populate("products.product");
    if (!cart) return res.status(400).json({ error: "Cart not found" });
    return res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    return res.status(500).json({ status: "Error", detalle: error.message });
  }
};