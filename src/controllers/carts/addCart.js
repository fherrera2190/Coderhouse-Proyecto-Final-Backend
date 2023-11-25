const { cartService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const result = await cartService.createCart();
    return res.sendSuccess(result);
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
