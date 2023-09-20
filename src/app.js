const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const path = require('path')
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const viewRouter = require('./routes/view.routes');
const { Server } = require('socket.io')
const PORT = 8080;
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'handlebars');

// Routes
app.use('/', viewRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const serverExpress = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const io = new Server(serverExpress);
require('./sockets/socket')(io);

mongoose.connect('mongodb+srv://ferbeoulve:root1234@cluster0.s9kw73z.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerce')
.then((result) => {
    console.log('DB conectada');
}).catch((err) => {
    console.log(err);
});