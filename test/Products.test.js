const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const ProductDao = require("../src/dao/mongo/product.mongo");
const { expect } = require("chai");

const supertest = require("supertest");
const requester = supertest("http://localhost:8080");

mongoose.connect(process.env.MONGO);

describe("Products testing", () => {
  describe("DAO Testing", () => {
    before(() => {
      this.productsDao = new ProductDao();
    });
    it("The dao must be able to obtain the products from the database", async () => {
      const result = await this.productsDao.getProducts();
      expect(result).to.have.property("docs").that.is.an("array");
    }).timeout(5000);
    it("The dao must be able to add a product to the database and delete it", async () => {
      const product = {
        title: "Test product",
        description: "This is a product created by a test file",
        thumbnails: [],
        category: "testing",
        price: 0,
        stock: 0,
        status: false,
        code: "TEST123",
        owner: "admin",
      };
      const result = await this.productsDao.addProduct(product);
      expect(result).to.be.an("object");
      expect(result).to.have.property("_id");

      const resultDelete = await this.productsDao.deleteProduct(result._id);
      expect(resultDelete).to.be.an("object");
      expect(resultDelete).to.have.property("deletedCount");
    });
    it("The dao must be able to add a product to the database, update it and then delete it", async () => {
      const product = {
        title: "Test product",
        description: "This is a product created by a test file",
        thumbnails: [],
        category: "testing",
        price: 0,
        stock: 0,
        status: false,
        code: "TEST123",
        owner: "admin",
      };
      const result = await this.productsDao.addProduct(product);
      expect(result).to.be.an("object");
      expect(result).to.have.property("_id");

      const resultUpdate = await this.productsDao.updateProduct(result._id, {
        title: "Update TEST",
      });
      expect(resultUpdate).to.be.an("object");
      expect(resultUpdate).to.have.property("acknowledged", true);

      const resultDelete = await this.productsDao.deleteProduct(result._id);
      expect(resultDelete).to.be.an("object");
      expect(resultDelete).to.have.property("deletedCount");
    });
  });
  describe("Router testing", () => {
    it("The GET endpoint must fetch products from the database correctly", async () => {
      const res = await requester.get(`/api/products/`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("payload");
      expect(res.body.payload.products).to.be.an("array");
    });
    it("The GET by id endpoint must fetch a product from the database correctly", async () => {
      const pid = "645e5df41a4b57a9cf70c5cc";
      const res = await requester.get(`/api/products/${pid}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body.payload.product).to.have.property("_id");
      expect(res.body.payload.product._id).to.equal(pid);
    });
  });
});
