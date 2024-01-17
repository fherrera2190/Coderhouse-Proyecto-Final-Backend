const { productService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    let products = await productService.get();
    products = products.docs;
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("home.handlebars", {
      title: "Home - Page",
      products,
      user: req.user,
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
};
