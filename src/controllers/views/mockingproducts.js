const { productService } = require("../../services/index.service");
const { faker } = require("@faker-js/faker");

module.exports = async (req, res) => {
  try {
    let products = [];

    for (let i = 0; i < 100; i++) {
      const product = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 100 }),
        category: faker.commerce.department(),
        code: faker.commerce.isbn(),
        stock: faker.number.int({ max: 1000 }),
        status: true,
      };

      products.push(await productService.create(product));
    }

    req.io.emit("actualizarProductos", products);
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    req.logger.error(error.message);
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
};
