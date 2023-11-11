const { Schema, model } = require("mongoose");
const cartCollection = "carts";

const cartSchema = new Schema({
  products: {
    type: [
      {
        product: { type: Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 1 }
      }
    ],
    default: []
  }
});

module.exports = model(cartCollection, cartSchema);
