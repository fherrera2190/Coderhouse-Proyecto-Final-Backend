module.exports = async (req, res) => {
  if (!req.body.quantity)
    return res.status(400).json({ error: "Tiene que ingresar quantity" });

  try {
    const { pid, cid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(pid))
      return res.status(400).json({ error: "Pid invalid" });
    if (!mongoose.Types.ObjectId.isValid(cid))
      return res.status(400).json({ error: "Cid invalid" });
    const existsProduct = await productsModels.findById(pid);
    if (!existsProduct)
      return res.status(400).json({ error: "Product not found" });
    const existsCart = await cartsModels.findById(cid);
    if (!existsCart) return res.status(400).json({ error: "Cart not found" });

    const productModify = existsCart.products.find(
      product => product.product.toJSON() === req.params.pid
    );
    if (!productModify)
      return res.status(400).json({ error: "Product no exist on cart" });
    productModify.quantity = +req.body.quantity;
    await cartsModels.updateOne(
      { _id: req.params.cid },
      {
        products: existsCart.products
      }
    );

    return res
      .status(201)
      .send({ status: "OK", msg: "Product quantity modified" });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
