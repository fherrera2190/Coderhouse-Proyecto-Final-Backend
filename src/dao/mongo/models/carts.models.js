const { Schema, model } = require("mongoose");
const cartCollection = "carts";

const cartSchema = new Schema({
    products: {
        type: [{
            id_prod: {
                type: Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: Number
        }],
        default: []
    }
});

export const cartsModel = model(cartCollection, cartSchema);