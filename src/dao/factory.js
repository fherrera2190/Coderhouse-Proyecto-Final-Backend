const config = require("../config/config");
const MongoSingleton = require("./mongo/MongoSingleton");
let User, Product, Cart, Ticket;
switch (config.PERSISTENCE) {
  case "FS":
    console.log("Persisntecia Fs");
    break;
  case "MONGO":
    MongoSingleton.connectDb(config.MONGO_URL);
    User = require("./mongo/user.mongo");
    Product = require("./mongo/product.mongo");
    Cart = require("./mongo/cart.mongo");
    Ticket = require("./mongo/ticket.mongo");
    break;

  default:
    throw new Error("Invalid Pesistence");
}

module.exports = {
  User,
  Product,
  Cart,
  Ticket
};
