const productsModels = require("../../dao/mongo/models/product.model");
const { productService } = require("../../services/index.service");
const transport = require("../../utils/nodemailer");

module.exports = async (req, res) => {
  try {
    const product = await productService.getById(req.params.pid);
    if (!product) {
      return res.json({ status: "error", message: "Product dont exists" });
    }

    if (
      req.user.user.role === "premiun" &&
      req.user.user.email !== product.owner
    ) {
      return res.send({
        status: "error",
        message: "Permission Denied",
        details:
          "You do not have the required permissions to delete this product. Please contact our support team for assistance.",
      });
    }
    if (req.user.user.role === "admin" && product.owner !== "admin") {
      await transport.sendMail({
        from: "Admin <ferbeoulvedev@gmail.com>",
        to: product.owner,
        subject: "Product Deleted",
        html: `
        <div>
            <h1>Your product ${product.title} code:${product.code} has been deleted!</h1>
            <p> If you have any further questions or need additional assistance, feel free to contact with any admin.</p>
        </div>
        `,
      });
    }

    await productService.delete(req.params.pid);

    const productos = await productsModels.find().lean();
    req.io.emit("actualizarProductos", productos);
    return res.status(200).json({
      status: "success",
      message: "Product Successfully Deleted",
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
