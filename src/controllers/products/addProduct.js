const { productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const { title, description, price, code, stock, category } = req.body;
    if (!title || !description || !price || !code || !stock || !category)
      return res.sendUserError("Faltan datos");
    const productos = await productService.create(req.body);
    req.io.emit("actualizarProductos", productos);
    return res.sendSuccess(productos);
  } catch (error) {
    return res.sendServerError(error.message);
  }
};
