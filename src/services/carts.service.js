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
  async getById(cid) {
    return await this.dao.getCartById(cid);
  }
  async addProduct(cid, pid) {
    return await this.dao.addProductToCart(cid, pid);
  }

  async update(cid, products) {
    return await this.dao.updateCart(cid, products);
  }

  async deleteProduct(cid, pid) {
    return await this.dao.deleteProductFromCart(cid, pid);
  }
  async deleteProducts(cid) {
    return await this.dao.deleteAllProductsFromCart(cid);
  }
}
module.exports = CartsService;
