
const { leerJson, escribirJson, existe } = require('../data/index')
const Producto = require('./Producto')

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        if (existe(this.path)) {
            return JSON.parse(await leerJson(this.path));
        }
        return [];
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        let products = await this.getProducts();

        if (products.find(item => item.product.code === code)) {
            return console.log(`El producto con el code: ${code} ya existe.`);
        }
        products.push({
            product: new Producto(title, description, price, thumbnail, code, stock),
            id: products.length === 0 ? 1 : products[products.length - 1].id + 1
        });
        await escribirJson(this.path, products);
        return console.log('El producto se agrego exitosamente');
    }

    async getProductById(productId) {
        const product = (await this.getProducts()).find((item) => item.id === productId)
        if (product) {
            return product;
        }
        return 'Not found';
    }
    async deleteProductById(productId) {
        let products = await this.getProducts();
        if (products.find(item => item.id === productId)) {
            products = products.filter(item => item.id !== productId);
            await escribirJson(this.path, products);
            console.log('Se elimino el producto correctamente');
            return;
        }
        console.log('Not found');
    }
    async modifyProductById(productId, title, description, price, thumbnail, code, stock) {
        let products = await this.getProducts();
        let productoAModificar = products.find(item => item.id === productId);
        if (productoAModificar) {
            productoAModificar.product = new Producto(title, description, price, thumbnail, code, stock);
            await escribirJson(this.path, products);
            return 'El producto se modifico correctamente';
        }
        return 'Not found'
    }
}

module.exports = ProductManager;