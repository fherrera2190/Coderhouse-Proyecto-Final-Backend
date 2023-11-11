const { Schema, model } = require("mongoose");
const messageCollection = "messages";

const messageSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{timestamps:true});

module.exports = model(messageCollection, messageSchema);