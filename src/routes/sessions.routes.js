const Router = require("./router");
const {
  login,
  register,
  gitHub,
  callBackGitHub,
  logOut,
  current
} = require("../controllers/sessions.controller");

class SessionsRoutes extends Router {
  init() {
    this.post("/login", ["ADMIN"], login);
    this.post("/register", ["PUBLIC"], register);
    this.get("github", ["PUBLIC"], gitHub);
    this.get("./callbackGitHub", callBackGitHub);
    this.get("./current", ["PUBLIC"], current);
    this.get("./logOut", ["PUBLIC"], logOut);
  }
}

module.exports = new SessionsRoutes();
