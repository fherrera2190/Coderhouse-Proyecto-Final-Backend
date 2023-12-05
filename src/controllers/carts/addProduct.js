const { cartService, productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const existsProduct = await productService.getById(pid);
    if (!existsProduct) return res.sendUserError("Product not found");
    console.log(req.user.user);
    console.log(existsProduct.owner);
    console.log(existsProduct.owner === req.user.user.email);
    if (
      req.user.user.role === "premium" &&
      req.user.user.email === existsProduct.owner
    ) {
      console.log("Entre aca");
      return res.status(403).json({
        status: "error",
        msg: "Unable to Add Product",
        details:
          "You are not allowed to add your own product to the system. Please use a different account or contact our support team if you believe this is an error."
      });
    }

    await cartService.addProduct(cid, pid);
    return res
      .status(200)
      .json({ status: "OK", msg: "Product add sussesfully" });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
