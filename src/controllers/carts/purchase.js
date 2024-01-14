const TicketResponse = require("../../dto/TicketResponse.dto");
const {
  cartService,
  productService,
  ticketService
} = require("../../services/index.service");
const transport = require("../../utils/nodemailer");

module.exports = async (req, res) => {
  try {
    const cid = req.params.cid;
    let ticketResponse = {};
    let sinStock = [];
    const cart = await cartService.getById(cid);
    for (const productCart of cart.products) {
      const stock = productCart.product.stock;
      const quantity = productCart.quantity;
      const pid = productCart.product._id;

      if (stock >= quantity) {
        productCart.product.stock -= quantity;
        if (productCart.product.stock < 1) {
          productCart.product.status = false;
        }
        await productService.update(pid, productCart.product);
      } else {
        sinStock.push(productCart);
      }
    }

    const purchasedProducts = [];
    for (const product of cart.products) {
      if (!sinStock.includes(product)) {
        purchasedProducts.push(product);
      }
    }

    if (purchasedProducts.length > 0) {
      ticketResponse.code = require("uuid").v4();
      ticketResponse.purchaser = req.query.email;
      ticketResponse.amount = purchasedProducts.reduce(
        (total, product) => total + product.quantity * product.product.price,
        0
      );
      ticketResponse = await ticketService.create(ticketResponse);
      ticketResponse = new TicketResponse(ticketResponse);
      const result = await transport.sendMail({
        from: "Vendedor <ferbeoulvedev@gmail.com>",
        to: req.query.email,
        subject: "Orden de compra",
        html: `
      <div>
          <h1>Ticket: ${ticketResponse.code}</h1>
          <ul>${purchasedProducts.forEach(product => {
            `<li>${product.product
              .title}---------------${product.quantity}x${product.product
              .price}---------------${product.quantity *
              product.product.price}</li>`;
          })}
          </ul>
          <h2>Total: $${ticketResponse.amount}</h2>
      </div>
      `
      });

      if (sinStock.length > 0) {
        const updateCart = await cartService.update(
          cid,
          sinStock.map(product => product)
        );
      } else {
        const updateCart = await cartService.update(cid, []);
      }
      return res.sendSuccess({ purchasedProducts, sinStock });
    } else {
      return res.sendSuccess({ sinStock });
    }
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
