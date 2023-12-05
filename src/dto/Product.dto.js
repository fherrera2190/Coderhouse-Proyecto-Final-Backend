class ProductDto {
  constructor(product) {
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.thumbnails = product.thumbnails;
    this.code = product.code;
    this.owner = product.owner;
    this.stock = product.stock;
    this.category = product.category;
    this.status = product.status;
  }
}

module.exports = ProductDto;
