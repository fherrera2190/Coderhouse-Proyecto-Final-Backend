const ProductManager = require('./ProductManager');
const path = require('path')
pm = new ProductManager(path.join(__dirname,'data','productos.json'));
const express = require('express');
const app = express();
PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    const  products = await pm.getProducts()
    if (req.query.limit) {
        res.send(products.slice(0, +req.query.limit));
        return;
    }
    res.send(products);
});
app.get('/products/:pid', async (req, res) => {
    const  products = await pm.getProductById(+req.params.pid)
    res.send(products);
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));







// const entorno = async () => {
//     const path = './data/productos.json';
//     pm = new ProductManager(path);
//     console.log(await pm.getProducts());
// await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
// await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc1234", 25);
// await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc12345", 25);
// await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123456", 25);
// console.log(await pm.getProductById(1));
// await pm.deleteProductById(4);
// console.log(await pm.modifyProductById(10, "producto prueba modificado", "Este es un producto prueba", 200, "Sin imagen", "abc12345", 25))
// }
// entorno();




