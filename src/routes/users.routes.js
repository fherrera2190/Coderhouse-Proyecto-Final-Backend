const Router = require("./router");
const {
  userPremium,
  uploadDocuments,
  getUsers,
} = require("../controllers/user.controller");
const uploader = require("../middlewares/multer");

class UserRoutes extends Router {
  init() {
    this.get("/premium/:uid", ["ADMIN"], userPremium);
    this.get("/", ["ADMIN"], getUsers);
    this.post(
      "/:uid/documents",
      ["USER"],
      uploader.fields([
        { name: "identification", maxCount: 1 },
        { name: "address", maxCount: 1 },
        { name: "statusaccount", maxCount: 1 },
        { name: "profile", maxCount: 1 },
      ]),
      uploadDocuments
    );
  }
}

module.exports = new UserRoutes();
