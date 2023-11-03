module.exports = async (req, res) => {
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

    if (
      !existsCart.products.find(
        product => product.product.toJSON() === req.params.pid
      )
    )
      return res.status(400).json({ error: "Product no exist on cart" });

    await cartsModels.updateOne(
      { _id: req.params.cid },
      {
        products: existsCart.products.filter(
          product => product.product.toJSON() !== req.params.pid
        )
      }
    );

    return res.status(201).send({ status: "OK", msg: "Product deleted" });
  } catch (error) {
    console.log(error);
  }
};
