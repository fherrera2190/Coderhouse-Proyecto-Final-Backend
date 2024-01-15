const { productService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");
const { generateProductErrorInfo } = require("../../utils/CustomErrors/info");

module.exports = async (req, res) => {
  try {
    const { title, description, price, code, stock, category } = req.body;
    if (!title || !description || !price || !code || !stock || !category) {
      CustomError.createError({
        name: "Error Creating Product",
        cause: generateProductErrorInfo({
          title,
          description: description.toString(),
          code,
          price,
          stock,
          category,
        }),
        message: "Error to create a product",
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }
    if (req.user.user.role === "admin") {
      req.body.owner = "admin";
    } else {
      req.body.owner = req.user.user.email;
    }

    const product = await productService.create(req.body);

    options = {
      pagination: false,
    };
    let productos = await productService.get({}, options);
    productos = productos.docs;
    req.io.emit("actualizarProductos", productos);

    return res.sendSuccess(product);
  } catch (error) {
    req.logger.error(error.cause);
    return res.sendServerError(error.message);
  }
};
