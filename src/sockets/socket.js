const ProductManager = require('../modules/ProductManager');
pm = new ProductManager();


module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`Un cliente se ha conectado ${socket.id}`);

        socket.on('nuevoProducto', async (producto) => {

            await pm.addProduct(producto);
            const products = await pm.getProducts()

            io.emit('actualizarProductos', products);
        });

        socket.on('eliminarProducto', async id => {
            await pm.deleteProductById(id);
            io.emit('actualizarProductos', await pm.getProducts());
        });

        socket.on('disconnect', () => {
            console.log('Un cliente se ha desconectado');
        });
    });
};