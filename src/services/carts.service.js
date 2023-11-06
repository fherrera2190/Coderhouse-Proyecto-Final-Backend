const dao = require("../dao/mongo/carts.mongo.js");

class CartsService {
  constructor(dao) {
    this.dao = new dao();
  }
  async getCarts() {
    return await this.dao.get();
  }
  async createCart() {
    return await this.dao.createCart();
  }
  async getCartById(cid) {
    return await this.dao.getCartById(cid);
  }
}

const cartService = new CartsService(dao);
module.exports = cartService;
