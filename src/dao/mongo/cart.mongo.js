const cartModel = require("./models/cart.model");

class Cart {
  constructor(model) {
    this.cartModel = model;
  }

  async createCart() {
    try {
      return await cartModel.create({ products: [] });
    } catch (err) {
      return new Error(err);
    }
  }

  async getCarts() {
    try {
      return await cartModel.find({});
    } catch (err) {
      return new Error(err);
    }
  }

  async getCartById(cid) {
    try {
      return await cartModel.findOne({ _id: cid }).populate("products.product");
    } catch (err) {
      return new Error(err);
    }
  }

  async addProductToCart(cid, pid) {
    // cid = cartId, pid= productId
    const cart = await cartModel.findById(cid);
    const index = cart.products.findIndex(
      product => product.product.toString() === pid
    );
    if (index === -1) {
      // product not found
      const update = {
        $push: { products: { product: { _id: pid }, quantity: 1 } }
      };
      await cartModel.updateOne({ _id: cid }, update);
    } else {
      // product found
      const filter = { _id: cid, "products.product": pid };
      const update = { $inc: { "products.$.quantity": 1 } };
      await cartModel.updateOne(filter, update);
    }
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await cartModel.findOne({ _id: cid });
    const index = cart.products.findIndex(product => product.product == pid);

    if (index === -1) {
      return null;
    } else {
      const filter = { _id: cid };
      const update = { $pull: { products: { product: pid } } };
      await cartModel.findOneAndUpdate(filter, update);
    }
  }

  async updateCart(cid, products) {
    try {
      const update = { $set: { products: products } };
      return await cartModel.findOneAndUpdate({ _id: cid }, update);
    } catch (error) {
      return new Error(error);
    }
  }

  async updateQuantity(cid, pid, quantity) {
    const cart = await cartModel.findOne({ _id: cid });
    const index = cart.products.findIndex(product => product.product == pid);

    if (index === -1 || quantity < 1) {
      return null;
    } else {
      const filter = { _id: cid, "products.product": pid };
      const update = { $set: { "products.$.quantity": quantity } };
      await cartModel.updateOne(filter, update);
    }
  }

  async deleteAllProductsFromCart(cid) {
    try {
      const update = { $set: { products: [] } };
      await cartModel.updateOne({ _id: cid }, update);
    } catch (error) {
      return new Error(err);
    }
  }
}

module.exports = Cart;
