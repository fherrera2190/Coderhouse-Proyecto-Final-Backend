const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const CartDao = require("../src/dao/mongo/cart.mongo");
const { expect } = require("chai");

const supertest = require("supertest");
const requester = supertest("http://localhost:8080");

mongoose.connect(process.env.MONGO);

describe("Carts testing", () => {
  describe("DAO Testing", () => {
    before(() => {
      this.cartsDao = new CartDao();
    });
    it("The dao must be able to create a cart", async () => {
      const result = await this.cartsDao.createCart();
      expect(result).to.have.property("_id");
    }).timeout(5000);
  });
  describe("Router Testing", () => {
    it("The POST endpoint must create a cart in the database correctly", async () => {
      const res = await requester.post(`/api/carts/`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("payload");
      expect(res.body.payload).to.have.property("createdCart");
      expect(res.body.payload.createdCart).to.have.property("products");
    });
    it("The GET by id endpoint must fetch a cart from the database correctly", async () => {
      const cid = "64d02112f9d1e00a779eb201";
      const res = await requester.get(`/api/carts/${cid}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body.payload.products).to.be.an("array");
    });
    it("The PUT endpoint must update the quantity of a product in the cart correctly", async () => {
      const cid = "64d02112f9d1e00a779eb201";
      const pid = "645e5e421a4b57a9cf70c5d0";
      const res = await requester
        .put(`/api/carts/${cid}/products/${pid}`)
        .send({ quantity: 25 });
      expect(res.statusCode).to.equal(200);
    });
  });
});
