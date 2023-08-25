
const { leerJson, escribirJson, existe } = require('./data/index')
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

    async addProduct({ title, description, code, price, status, stock, category, thumbnail }) {
        try {
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
        } catch (error) {
            throw error;
        }
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
            if (Object.keys(productoAModificar.product).includes(par[0])) productoAModificar.product[par[0]] = par[1];
        });
        await escribirJson(this.path, products);
        return 'El producto se modifico correctamente';

    }
}

module.exports = ProductManager;