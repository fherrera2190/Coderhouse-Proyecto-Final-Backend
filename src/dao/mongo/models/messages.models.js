const { Schema, model } = require("mongoose");
const messageCollection = "messages";

const messageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

export const messagesModel = model(messageCollection, messageSchema);