const { cartService } = require("../../services/index.service.js");

module.exports = async (req, res) => {
  try {
    let cart = await cartService.getById(req.params.cid);
    if (!cart) return res.sendUserError("Cart not found");

    return res.sendSuccess(cart);
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
