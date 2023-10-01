const express = require("express");
const router = express.Router();
// const CartManager = require("../modules/CartManager");
// cm = new CartManager();
const productsModels = require("../dao/mongo/models/products.models");
const cartsModels = require("../dao/mongo/models/carts.models");
const { mongoose } = require("mongoose");
const auth = require("../middlewares/auth");

//GET CART
router.get("/:cid", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cid))
    return res.status(400).json({ error: "Cid invalid" });
  const { cid } = req.params;
  try {
    const cart = await cartsModels.findById(cid).populate("products.product");
    if (!cart) return res.status(400).json({ error: "Cart not found" });
    return res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    return res.status(500).json({ status: "Error", detalle: error.message });
  }
});
//CREATE CART
router.post("/", auth, async (req, res) => {
  try {
    const result = await cartsModels.create({});
    return res.status(201).send({ status: "OK", result });
  } catch (error) {
    console.log(error);
  }
});
//ADD PRODUCT
router.post("/:cid/products/:pid", auth, async (req, res) => {
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
});

//PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba. No habia formato(?????????????)
router.put("/:cid", auth, async (req, res) => {
  try {
    const cid = req.params.cid;
    if (!mongoose.Types.ObjectId.isValid(cid))
      return res.status(400).json({ error: "Cid invalid" });
    const existsCart = await cartsModels.findById(cid);
    if (!existsCart) return res.status(400).json({ error: "Cart not found" });
    await cartsModels.updateOne(
      { _id: req.params.cid },
      {
        products: req.body
      }
    );
    return res
      .status(201)
      .send({ status: "OK", msg: "Product quantity modified" });
  } catch (error) {
    console.log(error);
  }
});

//PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put("/:cid/products/:pid", auth, async (req, res) => {
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
    console.log(error);
  }
});
//DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
router.delete("/:cid/products/:pid", auth, async (req, res) => {
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
});

// DELETE api/carts/:cid deberá eliminar todos los productos del carrito
router.delete("/:cid", auth, async (req, res) => {
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
});

module.exports = router;
