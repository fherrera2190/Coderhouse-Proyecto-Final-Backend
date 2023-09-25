
const { leerJson, escribirJson, existe } = require('../data/index');
const Producto = require('./Producto');

class ProductManager {
    constructor() {
        this.path = require('path').join(__dirname, '../data', 'productos.json');
    }

    async getProducts() {
        if (existe(this.path)) {
            return JSON.parse(await leerJson(this.path));
        }
        return [];
    }

    async addProduct({ title, description, code, price, status, stock, category, thumbnail }) {
        if (!title) {
            return 'Error debe ingresar un titulo'
        }
        if (!code) {
            return 'Error debe ingresar un code'
        }
        if (!price) {
            return 'Error debe ingresar un price'
        }
        if (!stock) {
            return 'Error debe ingresar stock'
        }
        if (!category) {
            return 'Error debe ingresar una categoria'
        }

        let products = await this.getProducts();
        if (products.find(item => item.product.code === code)) {
            return `El producto con el code: ${code} ya existe.`;
        }
        products.push({
            product: new Producto(title, description, code, price, status, stock, category, thumbnail),
            id: products.length === 0 ? 1 : products[products.length - 1].id + 1
        });
        await escribirJson(this.path, products);
        return "Producto agregado exitosamente"

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
            return 'Se elimino el producto correctamente';
        }
        return 'Not found';
    }

    async modifyProductById(productId, array) {
        let products = await this.getProducts();
        const productoAModificar = products.find(item => item.id === productId);
        if (!productoAModificar || productId < 1) return 'Not found'
        array.forEach(par => {
            if (Object.keys(productoAModificar.product).includes(par[0]) && par[0] !== 'code') {
                productoAModificar.product[par[0]] = par[1];
            }
        });
        await escribirJson(this.path, products);
        return 'El producto se modifico correctamente';

    }
}

module.exports = ProductManager;