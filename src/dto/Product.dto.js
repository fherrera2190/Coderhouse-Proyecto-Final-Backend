class ProductDto {
  constructor(product) {
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.thumbnails = product.thumbnails;
    this.code = product.code;
    this.stock = product.stock;
    this.category = product.category;
    this.status = product.status || true;
  }
}

module.exports = ProductDto;
