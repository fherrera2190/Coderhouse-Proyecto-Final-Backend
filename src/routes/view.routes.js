
const express = require('express');
const router = express.Router();
const ProductManager = require('../modules/ProductManager');
const productsModels = require('../dao/mongo/models/products.models');
const messagesModel = require('../dao/mongo/models/messages.models');
pm = new ProductManager();


router.get('/', async (req, res) => {
    try {
        let products = await productsModels.find().lean();
        res.setHeader('Content-Type', 'text/html')
        res.status(200).render('home.handlebars', {
            title: 'Home - Page',
            products
        })
    } catch (error) {
        return res.status(500).json({ error: error.code, detalle: error.message });
    }
})

router.get('/realtimeproducts', async (req, res) => {
    try {
        let products = await productsModels.find().lean();
        res.setHeader('Content-Type', 'text/html')
        res.status(200).render('realTimeProducts.handlebars', { title: 'Products Menu', products })
    } catch (error) {
        return res.status(500).json({ error: error.code, detalle: error.message });
    }
})

router.get('/chat', async (req, res) => {
    try {
        let messages = await messagesModel.find().lean();
        res.setHeader('Content-Type', 'text/html')
        res.status(200).render('chat', {
            title: 'Chat Room',
            messages
        })
    } catch (error) {
        return res.status(500).json({ error: error.code, detalle: error.message });
    }
});



module.exports = router;