class ProductsService {
  constructor(dao) {
    this.dao = new dao();
  }
  async getProducts(filtro = {}) {
    return await this.dao.get();
  }
  async createProduct() {
    return await this.dao.create({});
  }
  async deleteProduct(cid, pid) {
    return await this.dao.delete(cid, pid);
  }
  async updateProduct(cid, pid) {
    return await this.dao.delete(cid, pid);
  }
}

module.exports = ProductsService;
