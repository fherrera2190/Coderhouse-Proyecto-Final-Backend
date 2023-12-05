const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const productCollection = "products";

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  owner: {
    type: String,
    ref: "users",
    default: "admin"
  }
});

productSchema.plugin(mongoosePaginate);
module.exports = model(productCollection, productSchema);
