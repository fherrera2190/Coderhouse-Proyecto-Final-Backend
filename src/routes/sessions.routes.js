const express = require("express");
const auth2 = require("../middlewares/auth2");
const router = express.Router();
const passport = require("passport");
const { generaJWT, passportCall } = require("../utils");
const userModel = require("../dao/mongo/models/users.models");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const cartsModels = require("../dao/mongo/models/carts.models");
const authenticateGithub = passport.authenticate("github", { session: false });

router.post("/login", auth2, async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(401).redirect("/login");
  if (!bcrypt.compareSync(req.body.password.trim(), user.password))
    return res.status(401).redirect("/login");
  const userLimited = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    cartId: user.cartId
  };

  const token = generaJWT(userLimited);
  res.cookie("coderCookie", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true
  });
  res.status(200).redirect("/");
});

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, age, email } = req.body;
    const existe = await userModel.findOne({ email });
    if (existe) return res.status(200).json({ error: "El usuario ya existe" });

    const user = await userModel.create({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      age,
      email: email.trim(),
      password: bcrypt.hashSync(
        req.body.password.trim(),
        bcrypt.genSaltSync(10)
      ),
      cartId: await cartsModels.create({})
    });
    console.log("Usuario creado con exito");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

router.get("/github", authenticateGithub, (req, res) => {
  res.json("Github");
});

router.get("/callbackGitHub", authenticateGithub, (req, res) => {
  const user = req.user;
  const userLimited = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    cartId: user.cartId
  };
  const token = generaJWT(userLimited);
  res.cookie("coderCookie", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true
  });
  res.status(200).redirect("/");
});

router.get("/current", passportCall("jwt"), (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  res.clearCookie("coderCookie");
  res.redirect("/login");
});

module.exports = router;
