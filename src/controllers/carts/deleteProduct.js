const { cartService, productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const existsProduct = await productService.getById(pid);
    if (!existsProduct) return res.sendUserError("Product not exist");

    const cart = await cartService.getById(cid);
    if (!cart) return res.sendUserError("Cart not found");

    const product = cart.products.find(
      product => product.product._id.toString() === pid
    );
    if (!product) return res.sendUserError("Product not exist on cart");
    const result = await cartService.deleteProduct(cid, pid);
    console.log(result);

    return res.sendSuccess([]);
  } catch (error) {
    return res.sendServerError(error.message);
  }
};
