const { cartService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const cart = await cartService.getById(req.params.cid);
    if (!cart) return res.sendUserError("Cart not found");

    const result = await cartService.deleteProducts(req.params.cid);
    return res.status(201).send({ status: "OK", msg: "Cart empty!" });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
