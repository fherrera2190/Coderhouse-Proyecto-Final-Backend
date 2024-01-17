const { cartService, productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    console.log(pid,cid)
    const existsProduct = await productService.getById(pid);
    if (!existsProduct) return res.sendUserError("Product not found");
    if (
      req.user.user.role === "premium" &&
      req.user.user.email === existsProduct.owner
    ) {
      return res.status(403).json({
        status: "error",
        msg: "Unable to Add Product",
        details:
          "You are not allowed to add your own product to the system. Please use a different account or contact our support team if you believe this is an error.",
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
