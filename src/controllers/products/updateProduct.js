const { productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const { title, description, price, stock, category } = req.body;
    if (!title || !description || !price || !stock || !category)
      return res.sendUserError("Faltan datos");
    const pid = req.params.pid;
    const existProduct = await productService.getById(pid);
    if (!existProduct) return res.sendUserError("Product dont exists");

    await productService.update(pid, req.body);
    await productService.getById(pid);

    options = {
      pagination: false,
    };
    let productos = await productService.get({}, options);
    productos = productos.docs;
    req.io.emit("actualizarProductos", productos);
    return res.sendSuccess();
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
