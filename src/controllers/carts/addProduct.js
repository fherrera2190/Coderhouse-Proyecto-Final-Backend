const { cartService, productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  console.log(req.params);
  try {
    const { pid, cid } = req.params;
    const existsProduct = await productService.getById(pid);
    if (!existsProduct) return res.sendUserError("Product not found");

    await cartService.addProduct(cid, pid);
    return res
      .status(200)
      .json({ status: "OK", msg: "Product add sussesfully" });
  } catch (error) {
    return res.sendServerError(error.message);
  }
};
