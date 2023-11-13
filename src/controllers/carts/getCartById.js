const { cartService } = require("../../services/index.service.js");

module.exports = async (req, res) => {
  try {
    const cart = await cartService.getById(req.params.cid);
    if (!cart) return res.sendUserError("Cart not found");
    return res.sendSuccess(cart);
  } catch (error) {
    return res.sendServerError(error.message);
  }
};
