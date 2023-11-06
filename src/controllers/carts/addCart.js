const cartService = require("../../services/carts.service");

module.exports = async (req, res) => {
  try {
    const result = await cartService.createCart();
    return res.sendSuccess(result);
  } catch (error) {
    return res.sendServerError(error.message);
  }
};
