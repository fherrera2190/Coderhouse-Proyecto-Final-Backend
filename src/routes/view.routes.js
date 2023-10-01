const express = require("express");
const router = express.Router();
// const ProductManager = require("../modules/ProductManager");
// pm = new ProductManager();
const productsModels = require("../dao/mongo/models/products.models");
const messagesModel = require("../dao/mongo/models/messages.models");
const auth = require("../middlewares/auth");
const auth2 = require("../middlewares/auth2");

router.get("/", auth, async (req, res) => {
  try {
    let products = await productsModels.find().lean();
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("home.handlebars", {
      title: "Home - Page",
      products,
      user: req.session.user
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/login", auth2, async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("login");
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/register", auth2, async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("register");
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/realtimeproducts", auth, async (req, res) => {
  try {
    let products = await productsModels.find().lean();
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("realTimeProducts.handlebars", {
      title: "Products Menu",
      products,
      user: req.session.user
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/chat", auth, async (req, res) => {
  try {
    let messages = await messagesModel.find().lean();
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("chat", {
      title: "Chat Room",
      messages,
      user: req.session.user
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/products", auth, async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("products.handlebars", {
      title: "Home - Page",
      user: req.session.user
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/carts/:cid", auth, (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("carts.handlebars", {
      title: "Carts - Page",
      user: req.session.user
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

module.exports = router;
