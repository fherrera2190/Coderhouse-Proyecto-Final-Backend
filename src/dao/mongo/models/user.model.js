const mongoose = require("mongoose");

const collection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  role: {
    type: String,
    enum: ["admin", "user", "premium"],
    default: "user",
  },
  documents: [
    {
      name: {
        type: String,
      },
      reference: {
        type: String,
      },
    },
  ],
  last_connection: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model(collection, userSchema);

module.exports = productModel;
