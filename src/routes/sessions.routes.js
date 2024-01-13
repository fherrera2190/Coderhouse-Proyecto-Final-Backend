const Router = require("./router");

const {
  login,
  recoverPassword,
  updatePassword,
  register,
  gitHub,
  callBackGitHub,
  logOut,
  current,
} = require("../controllers/sessions.controller");
const passportCall = require("../utils/passportCall");
const authTokenResetPassword = require("../middlewares/authTokenResetPassword");

class SessionsRoutes extends Router {
  init() {
    this.post("/login", ["PUBLIC"], login);
    this.post("/recoverpassword", ["PUBLIC"], recoverPassword);
    this.post(
      "/updatepassword",
      ["PUBLIC"],
      authTokenResetPassword,
      updatePassword
    );
    this.post("/register", ["PUBLIC"], register);
    this.get("/github", ["PUBLIC"], passportCall("github"));
    this.get(
      "/callbackGitHub",
      ["PUBLIC"],
      passportCall("github"),
      callBackGitHub
    );
    this.get("/current", ["PUBLIC"], passportCall("jwt"), current);

    this.get("/logout", ["PUBLIC"], logOut);
  }
}

module.exports = new SessionsRoutes();
