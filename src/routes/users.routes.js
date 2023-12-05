const Router = require("./router");
const { userPremium } = require("../controllers/user.controller");

class UserRoutes extends Router {
  init() {
    this.get("/premium/:uid", ["PUBLIC"], userPremium);
  }
}

module.exports = new UserRoutes();
