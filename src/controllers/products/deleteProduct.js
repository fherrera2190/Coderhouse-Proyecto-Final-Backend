const productsModels = require("../../dao/mongo/models/product.model");
const { productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const product = await productService.getById(req.params.pid);
    if (
      req.user.user.role === "premiun" &&
      req.user.user.email !== product.owner
    ) {
      res.send({
        status: "error",
        message: "Permission Denied",
        details:
          "You do not have the required permissions to delete this product. Please contact our support team for assistance."
      });
    }

    await productService.delete(req.params.pid);

    const productos = await productsModels.find().lean();
    console.log(productos)
    req.io.emit("actualizarProductos", productos);
    return res.status(200).json({
      status: "success",
      message: "Product Successfully Deleted",
      details:
        "The specified product has been deleted from your account. If you have any further questions or need additional assistance, feel free to contact our support team."
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
