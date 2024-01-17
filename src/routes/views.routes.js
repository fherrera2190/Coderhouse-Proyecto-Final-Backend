const Router = require("./router");
const {
  viewLogin,
  viewRegister,
  viewProfile,
  viewRecoverPassword,
  viewResetPassword,
  viewPanelAdmin,
  viewHome,
  viewRealTime,
  viewChat,
  viewProducts,
  mockingProducts,
  loggerTest,
  viewMyCart,
} = require("../controllers/views.controller");
const authUser = require("../middlewares/authUser");
const auth = require("../middlewares/auth");
const auth2 = require("../middlewares/auth2");
const authAdmin = require("../middlewares/authAdmin");
const passportCall = require("../utils/passportCall");

class ViewRoutes extends Router {
  init() {
    this.get("/", ["PUBLIC"], auth, passportCall("jwt"), viewHome);
    this.get("/login", ["PUBLIC"], auth2, viewLogin);
    this.get("/register", ["PUBLIC"], auth2, viewRegister);
    this.get(
      "/profile",
      ["USER", "PREMIUM"],
      passportCall("jwt"),
      authAdmin,
      viewProfile
    );
    this.get(
      "/paneladmin",
      ["ADMIN"],
      passportCall("jwt"),
      authUser,
      viewPanelAdmin
    );

    this.get("/recoverpassword", ["PUBLIC"], auth2, viewRecoverPassword);
    this.get("/resetpassword", ["PUBLIC"], viewResetPassword);

    this.get(
      "/realtimeproducts",
      ["ADMIN"],
      auth,
      passportCall("jwt"),
      authUser,
      viewRealTime
    );

    this.get(
      "/chat",
      ["USER", "PREMIUM"],
      auth,
      passportCall("jwt"),
      authAdmin,
      viewChat
    );

    this.get(
      "/products",
      ["USER", "PREMIUM"],
      auth,
      passportCall("jwt"),
      authAdmin,
      viewProducts
    );
    this.get(
      "/mycart",
      ["USER", "PREMIUM"],
      auth,
      passportCall("jwt"),
      authAdmin,
      viewMyCart
    );

    this.get("/mockingproducts", ["PUBLIC"], mockingProducts);
    this.get("/loggerTest", ["PUBLIC"], loggerTest);
  }
}

module.exports = new ViewRoutes();
