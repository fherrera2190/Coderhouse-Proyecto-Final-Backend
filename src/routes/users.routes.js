const Router = require("./router");
const {
  userPremium,
  uploadDocuments,
  getUsers,
  changeImageProfile,
  deleteUser,
} = require("../controllers/user.controller");
const uploader = require("../middlewares/multer");

class UserRoutes extends Router {
  init() {
    this.get("/premium/:uid", ["ADMIN"], userPremium);
    this.get("/", ["ADMIN"], getUsers);
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
    this.delete("/:uid", ["ADMIN"],deleteUser);
  }
}

module.exports = new UserRoutes();
