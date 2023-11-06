const dao = require("../dao/mongo/products.mongo");

class ProductsService {
  constructor(dao) {
    this.dao = new dao();
  }
  async getProducts(filtro={}) {
    return await this.dao.get();
  }
  async createProduct() {
    return await this.dao.create({});
  }
}
const productService = new ProductsService(dao);
module.exports = productService;
