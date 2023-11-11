const { User, Product, Cart, TicketDao } = require("../dao/factory");
const UsersService = require("../services/users.service");
const ProductsService = require("../services/products.service");
const CartsService = require("../services/carts.service");
const TicketService = require("../services/ticket.service");

const userService = new UsersService(new User());
const productService = new ProductsService(new Product());
const cartService = new CartsService(new Cart());
const ticketService = new TicketService(new Ticket());

module.exports = { userService, cartService, productService, ticketService };
