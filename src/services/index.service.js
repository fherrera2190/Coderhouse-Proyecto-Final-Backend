const { User, Product, Cart, Ticket } = require("../dao/factory");
const UsersService = require("../services/users.service");
const ProductsService = require("../services/products.service");
const CartsService = require("../services/carts.service");
const TicketService = require("../services/ticket.service");

const userService = new UsersService(User);
const productService = new ProductsService(Product);
const cartService = new CartsService(Cart);
const ticketService = new TicketService(Ticket);

module.exports = { userService, cartService, productService, ticketService };
