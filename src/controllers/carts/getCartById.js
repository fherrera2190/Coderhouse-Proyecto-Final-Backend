const cartServices = require("../../services/carts.service.js");

module.exports = async (req, res) => {
  try {

    const cart = await cartServices.getCartById(req.params.cid);
    if (!cart) return res.status(400).json({ error: "Cart not found" });
    return res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    return res.status(500).json({ status: "Error", detalle: error.message });
  }
};
