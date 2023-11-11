const express = require("express");
const router = express.Router();
const productsModels = require("../dao/mongo/models/product.model");
const messagesModel = require("../dao/mongo/models/message.model");
const auth = require("../middlewares/auth");
const auth2 = require("../middlewares/auth2");
const { passportCall } = require("../utils");

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

router.get("/", auth, passportCall("jwt"), async (req, res) => {
  try {
    let products = await productsModels.find().lean();
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("home.handlebars", {
      title: "Home - Page",
      products,
      user: req.user
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/realtimeproducts", auth, passportCall("jwt"), async (req, res) => {
  try {
    let products = await productsModels.find().lean();
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("realTimeProducts.handlebars", {
      title: "Products Menu",
      products,
      user: req.user
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/chat", auth, passportCall("jwt"), async (req, res) => {
  try {
    let messages = await messagesModel.find().lean();
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("chat", {
      title: "Chat Room",
      messages,
      user: req.user
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/products", auth, passportCall("jwt"), async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("products.handlebars", {
      title: "Home - Page",
      user: req.user
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/carts/:cid", auth, passportCall("jwt"), (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("carts.handlebars", {
      title: "Carts - Page",
      user: req.user
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

module.exports = router;
