const Router = require("./router");

const {
  login,
  register,
  gitHub,
  callBackGitHub,
  logOut,
  current
} = require("../controllers/sessions.controller");
const passportCall = require("../utils/passportCall");

class SessionsRoutes extends Router {
  init() {
    this.post("/login", ["PUBLIC"], login);
    this.post("/register", ["PUBLIC"], register);
    this.get("/github", ["PUBLIC"], gitHub);
    this.get("/callbackGitHub", callBackGitHub);
    this.get("/current", ["PUBLIC"], passportCall("jwt"), current);
    this.get("/logout", ["PUBLIC"], logOut);
  }
}

module.exports = new SessionsRoutes();
