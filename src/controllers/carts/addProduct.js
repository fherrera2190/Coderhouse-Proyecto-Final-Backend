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
    const findProducttExistente = existsCart.products.find(
      product => product.product.toJSON() === pid
    );
    if (findProducttExistente) {
      findProducttExistente.quantity += 1;
      await cartsModels.updateOne({ _id: cid }, existsCart);
      return res
        .status(200)
        .json({ status: "OK", msg: "Product add quantity +1" });
    }
    existsCart.products.push({ product: existsProduct._id });
    await cartsModels.updateOne({ _id: cid }, existsCart);
    return res
      .status(200)
      .json({ status: "OK", msg: "Product add sussesfully" });
  } catch (error) {
    console.log(error);
  }
};
