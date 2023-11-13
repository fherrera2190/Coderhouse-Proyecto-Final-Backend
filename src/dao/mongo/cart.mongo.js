const cartModel = require("./models/cart.model");
const mongoose = require("mongoose");

class Cart {
  constructor(model) {
    this.cartModel = model;
  }

  async createCart() {
    return await cartModel.create({ products: [] });
  }

  async getCarts() {
    return await cartModel.find({});
  }

  async getCartById(cid) {
    return await cartModel.findOne({ _id: cid }).populate("products.product");
  }

  async addProductToCart(cid, pid) {
    if (!mongoose.Types.ObjectId.isValid(pid)) throw new Error("pid invalid");
    if (!mongoose.Types.ObjectId.isValid(cid)) throw new Error("cid invalid");

    const cart = await cartModel.findById(cid);
    if (!cart) return res.sendUserError("Cart not found");

    const findProduct = cart.products.find(
      product => product.product.toString() === pid
    );

    if (!findProduct) {
      const update = {
        $push: { products: { product: { _id: pid }, quantity: 1 } }
      };
      await cartModel.updateOne({ _id: cid }, update);
    } else {
      const filter = { _id: cid, "products.product": pid };
      const update = { $inc: { "products.$.quantity": 1 } };
      await cartModel.updateOne(filter, update);
    }
  }

  async deleteProductFromCart(cid, pid) {
    const filter = { _id: cid };
    const update = { $pull: { products: { product: pid } } };
    return await cartModel.findOneAndUpdate(filter, update);
  }

  async updateCart(cid, products) {
    const update = { $set: { products: products } };
    return await cartModel.findOneAndUpdate({ _id: cid }, update);
  }

  async updateQuantity(cid, pid, quantity) {
    const cart = await cartModel.findOne({ _id: cid });
    const index = cart.products.findIndex(product => product.product == pid);

    if (index === -1 || quantity < 1) {
      return null;
    } else {
      const filter = { _id: cid, "products.product": pid };
      const update = { $set: { "products.$.quantity": quantity } };
      return await cartModel.updateOne(filter, update);
    }
  }

  async deleteAllProductsFromCart(cid) {
    const update = { $set: { products: [] } };
    return await cartModel.updateOne({ _id: cid }, update);
  }
}

module.exports = Cart;
