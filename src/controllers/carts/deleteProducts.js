module.exports = async (req, res) => {
  try {
    const cid = req.params.cid;
    if (!mongoose.Types.ObjectId.isValid(cid))
      return res.status(400).json({ error: "Cid invalid" });
    const existsCart = await cartsModels.findById(cid);
    if (!existsCart) return res.status(400).json({ error: "Cart not found" });
    await cartsModels.updateOne(
      { _id: req.params.cid },
      {
        products: []
      }
    );
    return res.status(201).send({ status: "OK", msg: "Cart empty!" });
  } catch (error) {
    console.log(error);
  }
};
