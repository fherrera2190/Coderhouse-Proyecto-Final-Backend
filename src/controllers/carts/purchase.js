const {
  cartService,
  productService,
  ticketService
} = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    console.log(req.query.email);
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

    const purchasedProducts = cart.products.filter(
      product => !sinStock.includes(product)
    );

    if (purchasedProducts.length > 0) {
      ticketResponse.code = require("uuid").v4();
      ticketResponse.purchaser = req.query.email;
      ticketResponse.amount = purchasedProducts.reduce(
        (total, product) => total + product.quantity * product.product.price,
        0
      );
    }

    ticketResponse = await ticketService.create(ticketResponse);
    console.log(ticketResponse);

    return;
    // res.json("Nemesis");
  } catch (error) {
    console.log(error);
  }
};
