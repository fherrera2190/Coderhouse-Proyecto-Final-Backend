const productsModels = require('../dao/mongo/models/products.models');
const ProductManager = require('../modules/ProductManager');
// pm = new ProductManager();


module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`Un cliente se ha conectado ${socket.id}`);
        socket.on('nuevoProducto', async (producto) => {
            try {
                await productsModels.create(producto)
                const productos = await productsModels.find().lean();
                io.emit('actualizarProductos', productos);
            } catch (error) {
                console.log(error);
            }
        });

        socket.on('eliminarProducto', async code => {
            try {
                const product = await productsModels.deleteOne({ code: { $eq:code } });
                console.log(product)
                const productos = await productsModels.find().lean();
                io.emit('actualizarProductos', productos);
            } catch (error) {
                console.log(error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Un cliente se ha desconectado');
        });
    });
};