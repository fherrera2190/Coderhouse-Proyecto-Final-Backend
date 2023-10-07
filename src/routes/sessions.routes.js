const express = require("express");
const auth2 = require("../middlewares/auth2");
const router = express.Router();
const passport = require("passport");

router.post(
  "/login",
  auth2,
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/errorLogin"
  }),
  async (req, res) => {
    // console.log(req.user);

    req.session.user = req.user;
    res.redirect("/");
  }
);
router.post(
  "/register",
  auth2,
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/errorRegistro"
  }),
  async (req, res) => {
    res.redirect("/");
  }
);

router.get("/github", passport.authenticate("github", {}), (req, res) => {
  res.json("Github");
});

router.get(
  "/callbackGitHub",
  passport.authenticate("github", {
    failureRedirect: "/api/sessions/errorGithub"
  }),
  (req, res) => {
    req.session.user = req.user;
    res.status(200).redirect("/");
  }
);

router.get("/errorGithub", (req, res) => {
  res.json("Hubo un error en errorGithub");
});

router.get("/errorRegistro", (req, res) => {
  res.json("Hubo un error en el registro");
});

router.get("/errorLogin", (req, res) => {
  res.json("Hubo un error en el login");
});

router.get("/logout", (req, res) => {
  req.session.destroy(error => console.log(!error && "Se cerro la sesión"));
  res.redirect("/");
});

module.exports = router;
