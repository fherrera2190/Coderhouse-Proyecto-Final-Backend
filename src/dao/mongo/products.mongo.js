const productsModels = require("./models/products.models");

class Products {
  constructor() {}
  async get(filtro = {}) {
    return await productsModels.find(filtro);
  }
  async create(product) {
    return await productsModels.create(product);
  }
}

module.exports = Products;
