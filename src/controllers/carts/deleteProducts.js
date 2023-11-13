const { cartService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const cart = await cartService.getById(req.params.cid);
    if (!cart) return res.sendUserError("Cart not found");

    const result = await cartService.deleteProducts(req.params.cid);
    
    console.log(result)
    return res.status(201).send({ status: "OK", msg: "Cart empty!" });
  } catch (error) {
    console.log(error);
  }
};
