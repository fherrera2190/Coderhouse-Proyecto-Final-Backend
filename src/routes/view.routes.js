
const express = require('express');
const router = express.Router();
const ProductManager = require('../modules/ProductManager');
pm = new ProductManager();


router.get('/', async (req, res) => {
    const products = await pm.getProducts();
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('home.handlebars', {
        title: 'Home - Page',
        products
    })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await pm.getProducts();
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('realTimeProducts.handlebars', { title: 'Products Menu', products })
})

module.exports = router;