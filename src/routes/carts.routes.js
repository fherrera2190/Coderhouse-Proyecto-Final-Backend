const express = require('express');
const router = express.Router();
const CartManager = require('../modules/CartManager');
cm = new CartManager();
const productsModels = require('../dao/mongo/models/products.models');
const cartsModels = require('../dao/mongo/models/carts.models');
const { mongoose } = require('mongoose');

router.get('/:cid', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.cid)) return res.status(400).json({ error: "Cid invalid" });
    const { cid } = req.params;
    try {
        const cart = await cartsModels.findById(cid).populate('products.product');
        if (!cart) return res.status(400).json({ error: "Cart not found" });
        return res.status(200).json({ status: "OK", cart });
    } catch (error) {
        return res.status(500).json({ status: "Error", detalle: error.message })
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await cartsModels.create({});
        return res.status(201).send({ status: 'OK', result });
    } catch (error) {
        console.log(error);
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { pid, cid } = req.params;
        if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({ error: "Pid invalid" });
        if (!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({ error: "Cid invalid" });
        const existsProduct = await productsModels.findById(pid);
        if (!existsProduct) return res.status(400).json({ error: "Product not found" });
        const existsCart = await cartsModels.findById(cid);
        if (!existsCart) return res.status(400).json({ error: "Cart not found" });
        const findProducttExistente = existsCart.products.find(product => product.id === pid);
        if (findProducttExistente) {
            findProducttExistente.quantity += 1;
            await cartsModels.updateOne({ _id: cid }, existsCart);
            return res.status(200).json({ status: "OK", msg: "Product add quantity +1" });
        }
        existsCart.products.push({ _id: existsProduct._id });
        await cartsModels.updateOne({ _id: cid }, existsCart);
        return res.status(200).json({ status: "OK", msg: "Product add sussesfully" });

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;