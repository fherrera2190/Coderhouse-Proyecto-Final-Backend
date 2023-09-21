const { Schema, model } = require("mongoose");
const cartCollection = "carts";

const cartSchema = new Schema({
    products: {
        type: [{ id_product: { type: Schema.Types.ObjectId, ref: "products" }, quantity: Number }],
        default: []
    }
});

export const cartsModel = model(cartCollection, cartSchema);