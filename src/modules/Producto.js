class Product {
    constructor(title, description, code, price, status = true, stock, category, thumbnail) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail ? thumbnail : [];
    }
}

module.exports = Product;