const cartsModels = require("./models/carts.models");

class Carts {
  constructor() {}
  async getCarts(filtro = {}) {
    return await cartsModels.find(filtro);
  }
  async createCart() {
    return await cartsModels.create({});
  }
  async getCartById(cid) {
    return await cartsModels.findById(cid).populate("products.product");
  }
}

module.exports = Carts;
