const express = require("express");
const router = express.Router();
const productsModels = require("../dao/mongo/models/product.model");
const messagesModel = require("../dao/mongo/models/message.model");
const auth = require("../middlewares/auth");
const auth2 = require("../middlewares/auth2");
const passportCall = require("../utils/passportCall");
const { faker } = require("@faker-js/faker");
const { productService, userService } = require("../services/index.service");
const UserDtoProfile = require("../dto/UserProfile.dto");
const authAdmin = require("../middlewares/authAdmin");
const authUser = require("../middlewares/authUser");
const UserAdminPanel = require("../dto/UserAdminPanel.dto");

router.get("/login", auth2, async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("login");
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/profile", passportCall("jwt"), authAdmin, async (req, res) => {
  try {
    const user = await userService.getById(req.user.id);
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("profile.handlebars", {
      title: "Profile - Page",
      user: new UserDtoProfile(user),
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/paneladmin", passportCall("jwt"), authUser, async (req, res) => {
  try {
    let users = await userService.getUsers();
    users = users.map((user) => new UserAdminPanel(user));
    users = users.filter((user) => user.role !== "admin");
    console.log(users);
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("paneladmin.handlebars", {
      title: "Profile - Page",
      user: req.user,
      users,
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/recoverpassword", auth2, async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("recoverpassword");
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/resetpassword", async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("resetpassword", { token: req.query.token });
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
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get(
  "/realtimeproducts",
  auth,
  passportCall("jwt"),
  authUser,
  async (req, res) => {
    try {
      let products = await productsModels.find().lean();
      res.setHeader("Content-Type", "text/html");
      res.status(200).render("realTimeProducts.handlebars", {
        title: "Products Menu",
        products,
        user: req.user,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.code, detalle: error.message });
    }
  }
);

router.get("/chat", auth, passportCall("jwt"), authAdmin, async (req, res) => {
  try {
    let messages = await messagesModel.find().lean();
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("chat", {
      title: "Chat Room",
      messages,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get(
  "/products",
  auth,
  passportCall("jwt"),
  authAdmin,
  async (req, res) => {
    try {
      res.setHeader("Content-Type", "text/html");
      res.status(200).render("products.handlebars", {
        title: "Home - Page",
        user: req.user,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.code, detalle: error.message });
    }
  }
);

router.get("/mycart", auth, passportCall("jwt"), authAdmin, (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("carts.handlebars", {
      title: "Carts - Page",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/mockingproducts", async (req, res) => {
  try {
    let products = [];

    for (let i = 0; i < 100; i++) {
      const product = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 100 }),
        category: faker.commerce.department(),
        code: faker.commerce.isbn(),
        stock: faker.number.int({ max: 1000 }),
        status: true,
      };

      products.push(await productService.create(product));
    }

    req.io.emit("actualizarProductos", products);
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/loggerTest", (req, res, next) => {
  req.logger.fatal("testing fatal log");
  req.logger.error("testing error log");
  req.logger.warning("testing warning log");
  req.logger.info("testing info log");
  req.logger.http("testing http log");
  req.logger.debug("testing debug log");
  res.send("Logger");
});

module.exports = router;
