const mongoose = require("mongoose");

const collection = "tickets";

const ticketSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      require: true
    },
    purchaser: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(collection, ticketSchema);