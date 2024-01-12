const Router = require("./router");
const {
  userPremium,
  uploadDocuments,
  getUsers,
  changeImageProfile,
  deleteUser,
  deleteAllUsersInactive,
} = require("../controllers/user.controller");
const uploader = require("../middlewares/multer");
const { getPorudctsByUid } = require("../controllers/products.controller");

class UserRoutes extends Router {
  init() {
    this.get("/premium/:uid", ["ADMIN"], userPremium);
    this.get("/", ["ADMIN"], getUsers);
    this.get("/:uid/products", ["USER", "PREMIUM"], getPorudctsByUid);
    this.post(
      "/imageProfile",
      ["USER", "PREMIUM"],
      uploader.fields([{ name: "profile", maxCount: 1 }]),
      changeImageProfile
    );
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
    this.delete("/:uid", ["ADMIN"], deleteUser);
    this.delete("/", ["ADMIN"], deleteAllUsersInactive);
  }
}

module.exports = new UserRoutes();
