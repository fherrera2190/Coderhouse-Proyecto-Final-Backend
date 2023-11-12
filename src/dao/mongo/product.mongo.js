const productModel = require("./models/product.model");
const mongoose = require("mongoose");
class Product {
  constructor(model) {
    this.productModel = model;
  }

  async getProducts(query, options) {
    try {
      return await productModel.paginate(query, options);
    } catch (err) {
      return new Error(err);
    }
  }

  async getProductById(pid) {
    if (!mongoose.Types.ObjectId.isValid(pid.trim()))
      throw new Error("pid invalid");
    return await productModel.findOne({ _id: pid });
  }

  async addProduct(product) {
    return await productModel.create(product);
  }

  async updateProduct(pid, product) {
    try {
      return await productModel.updateOne({ _id: pid }, product);
    } catch (err) {
      return new Error(err);
    }
  }

  async deleteProduct(pid) {
    try {
      return await productModel.deleteOne({ _id: pid });
    } catch (err) {
      return new Error(err);
    }
  }
}

module.exports = Product;
