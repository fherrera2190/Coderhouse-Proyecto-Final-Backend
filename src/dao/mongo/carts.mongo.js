const cartsModels = require("./models/carts.models");

class Carts {
  constructor() {}
  async get(filtro = {}) {
    return await cartsModels.find(filtro);
  }
  async create(product) {
    return await cartsModels.create();
  }
}

module.exports = Carts;
