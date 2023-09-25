const { leerJson, escribirJson, existe } = require('../data/index')
const Cart = require('./Cart');

class CartManager {
    constructor() {
        this.path = require('path').join(__dirname, '../data', 'carrito.json');
    }
    async getCarts() {
        if (existe(this.path)) {
            return JSON.parse(await leerJson(this.path));
        }
        return [];
    }

    async createCart() {
        let carts = await this.getCarts();
        carts.push(new Cart(carts.length === 0 ? 1 : carts[carts.length - 1].cid + 1));
        escribirJson(this.path, carts)
    }

    async addProduct(cid, pid) {
        let carts = await this.getCarts(cid);
        let cart = carts.find((cart) => cart.cid === cid);
        if (!cart) return 'Cart no found';
        if (cart.products.length > 0) {
            const product = cart.products.find(cart => cart.product === pid);
            if (product) {
                product.quantity += 1;
                await escribirJson(this.path, carts);
                return "Se agrego una unidad";
            }
        }
        cart.products.push({ product: pid, quantity: 1 });
        await escribirJson(this.path, carts);
        return "Producto agregado exitosamente"
    }

    async getCartByCid(cid) {
        const cart = (await this.getCarts()).find((cart) => cart.cid === cid);
        if (cart) return cart;
        return 'not found';
    }
}

module.exports = CartManager;