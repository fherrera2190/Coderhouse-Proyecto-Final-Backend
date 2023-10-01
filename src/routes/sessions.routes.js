const express = require("express");
const auth2 = require("../middlewares/auth2");
const router = express.Router();
const userModel = require("../dao/mongo/models/users.models");
const bcrypt = require("bcrypt");
const userAdmin = {
  first_name: "admin",
  last_name: "Coder",
  email: "adminCoder@coder.com",
  password: "adminCod3r123",
  role: "admin"
};

router.post("/login", auth2, async (req, res) => {
  try {
    if (
      req.body.email === userAdmin.email &&
      req.body.password === userAdmin.password
    ) {
      req.session.user = {
        first_name: userAdmin.first_name + userAdmin.last_name,
        email: userAdmin.email,
        role: userAdmin.role
      };
      return res.redirect("/");
    }
    const user = await userModel.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password.trim(), user.password)) {
      req.session.user = {
        first_name: user.first_name,
        email: user.email,
        role: user.role
      };
      return res.redirect("/");
    }

    res.status(200).redirect("/login");
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.post("/register", auth2, async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;
  if (req.body.email === userAdmin.email) {
    return res.send(
      '<h1>el mail que ingreso ya existe</h1> <a href="/">Ir al HOME</a>'
    );
  }

  try {
    const user = await userModel.create({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      age,
      email: email.trim(),
      password: bcrypt.hashSync(password.trim(), 10)
    });

    res.redirect("/login");
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(error => console.log(error));
  res.redirect("/");
});
module.exports = router;
