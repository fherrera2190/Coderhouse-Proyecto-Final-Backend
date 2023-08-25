const ProductManager = require('../ProductManager');
const path = require('path')
const express = require('express');
pm = new ProductManager(path.join(__dirname, '../data', 'productos.json'));
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await pm.getProducts()
    if (req.query.limit) {
        return res.status(200).send({ status: 'OK', data: products.slice(0, +req.query.limit) });
    }
    return res.status(200).send({ status: 'OK', data: products });
})

router.get('/:pid', async (req, res) => {
    const product = await pm.getProductById(+req.params.pid)
    if (product) {
        res.status(200).send({ status: 'OK', data: { product } });
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const result = await pm.addProduct(req.body);
    res.status(200).json({ status: result });

})

router.put('/:pid', async (req, res) => {
    const result = await pm.modifyProductById(+req.params.pid, Object.entries(req.body))
    if (result === 'El producto se modifico correctamente') res.status(200).json({ status: 'OK', msg: result });
    res.status(400).json({ status: 'Error', msg: result })
})


router.delete('/:pid', async (req, res) => {

    const result = await pm.deleteProductById(+req.params.pid)
    return res.status(200).json({ status: true, msg: result });

})
module.exports = router;