const express = require('express');
const app = express();
PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRouter = require('./routes/products.routes');
app.use('/api/products', productsRouter);

const cartsRouter = require('./routes/carts.routes');
app.use('/api/carts', cartsRouter);



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

