
const express = require('express');
const router = express.Router();

const path = require('path')
const CartManager = require('../CartManager');
cm = new CartManager(path.join(__dirname, '../data', 'carrito.json'));


router.get('/:cid', async (req, res) => {
    const cart = await cm.getCartByCid(+req.params.cid);
    res.send({ status: 'OK', data: cart })
});

router.post('/', async (req, res) => {
    await cm.createCart();
    res.status(201).send({ status: 'OK' })
});

router.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    if (pid < 1) return res.send({ status: 'Error: debe ingresar un pid mayor a 0' });
    if (isNaN(+pid)) return res.send({ status: 'Error: debe ingresar un pid valido' });
    const resultado = await cm.addProduct(+cid, +pid);
    if (resultado === 'Cart no found') return res.send({ status: `Error: ${resultado}` });
    res.status(200).send({ status: 'OK', data: resultado })
});
module.exports = router;