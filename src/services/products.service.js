const ProductDto = require("../dto/Product.dto");

class ProductsService {
  constructor(dao) {
    this.dao = new dao();
  }
  async get(query, options) {
    return await this.dao.getProducts(query, options);
  }
  async getById(pid) {
    return await this.dao.getProductById(pid);
  }
  async create(product) {
    const newProduct = new ProductDto(product);
    return await this.dao.addProduct(newProduct);
  }

  async delete(cid, pid) {
    return await this.dao.delete(cid, pid);
  }
  async update(cid, pid) {
    return await this.dao.delete(cid, pid);
  }
}

module.exports = ProductsService;
