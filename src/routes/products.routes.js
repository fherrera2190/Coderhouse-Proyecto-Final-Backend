const express = require('express');
const router = express.Router();
const ProductManager = require('../modules/ProductManager');
pm = new ProductManager();
const productsModels = require('../dao/mongo/models/products.models');
const { mongoose } = require('mongoose');



router.get('/', async (req, res) => {

    try {
        if (req.query.limit && +req.query.limit > 0) {
            let products = await productsModels.find().limit(+req.query.limit);
            return res.status(200).json({ status: "OK", products });
        }
        let products = await productsModels.find();
        res.status(200).json({ status: "OK", products });
    } catch (error) {
        return res.status(500).json({ error: error.code, detalle: error.message })
    }
})

router.get('/:pid', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.pid.trim())) return res.status(400).json({ error: "Id invalido" })
        const product = await productsModels.findOne({ _id: { $eq: req.params.pid.trim() } });
        if (!product) return res.status(200).json({ status: 'OK', msg: "No existe producto con ese pid" });
        return res.status(200).json({ status: 'OK', product: product });
    } catch (error) {
        return res.status(500).json({ error: error.code, detalle: error.message })
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const result = await productsModels.create(req.body);
        const productos = await productsModels.find().lean();
        req.io.emit('actualizarProductos', productos);
        return res.status(201).json({ status: "OK", msg: "Producto creado exitosamente" });
    } catch (error) {
        return res.status(500).json({ error: error.code, detalle: error.message })
    }
})

router.put('/:pid', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.pid.trim())) return res.status(400).json({ error: "Id invalido" })
        const product = await productsModels.findByIdAndUpdate(req.params.pid.trim(), req.body);
        if (!product) return res.status(200).json({ status: 'OK', msg: "No existe producto con ese pid" });
        const productos = await productsModels.find().lean();
        req.io.emit('actualizarProductos', productos);
        return res.status(200).json({ status: 'OK', product: product });
    } catch (error) {
        return res.status(500).json({ error: error.code, detalle: error.message })
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.pid.trim())) return res.status(400).json({ error: "Id invalido" })
        const product = await productsModels.deleteOne({ _id: { $eq: req.params.pid.trim() } });
        if (!product) return res.status(200).json({ status: 'OK', msg: "No existe producto con ese pid" });
        const productos = await productsModels.find().lean();
        req.io.emit('actualizarProductos', productos);
        return res.status(200).json({ status: 'OK', msg: "Producto eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ error: error.code, detalle: error.message })
    }
})


// ------------------ClasePM---------------------------------

// router.get('/', async (req, res) => {
//     let products = await pm.getProducts()
//     if (req.query.limit && +req.query.limit > 0) {
//         products = products.slice(0, +req.query.limit)
//         return res.status(200).send({ status: 'OK', data: products });
//     }
//     res.status(200).send({ status: 'OK', data: products });
// })

// router.get('/:pid', async (req, res) => {
//     const product = await pm.getProductById(+req.params.pid)
//     if (product) {
//         res.status(200).send({ status: 'OK', data: product });
//     }
// })

// router.post('/', async (req, res) => {
//     const result = await pm.addProduct(req.body);
//     req.io.emit('actualizarProductos', await pm.getProducts());
//     res.status(200).json({ status: result });
// })

// router.put('/:pid', async (req, res) => {
//     const result = await pm.modifyProductById(+req.params.pid, Object.entries(req.body))
//     if (result === 'El producto se modifico correctamente') res.status(200).json({ status: 'OK', msg: result });
//     res.status(400).json({ status: 'Error', msg: result })
// })

// router.delete('/:pid', async (req, res) => {
//     const result = await pm.deleteProductById(+req.params.pid)
//     req.io.emit('actualizarProductos', await pm.getProducts());
//     res.status(200).json({ status: true, msg: result });
// })


module.exports = router;

