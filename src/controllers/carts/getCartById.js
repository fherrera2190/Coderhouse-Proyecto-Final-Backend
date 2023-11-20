const { cartService } = require("../../services/index.service.js");

module.exports = async (req, res) => {
  try {
    let cart = await cartService.getById(req.params.cid);
    if (!cart) return res.sendUserError("Cart not found");
    // console.log(cart.products)
    // cart = cart.products.map(item=>{
    //   if (item.product){
    //     return item
    //   }

    // })

    console.log(cart)
    return res.sendSuccess(cart);
  } catch (error) {
    return res.sendServerError(error.message);
  }
};
