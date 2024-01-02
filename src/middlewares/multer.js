const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder;
    switch (file.fieldname) {
      case "profile":
        folder = "profiles";
        break;
      case "product":
        folder = "products";
        break;
      case "identification":
      case "address":
      case "statusaccount":
        folder = "documents";
        break;
    }
    cb(null, `./public/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now() + "-" + req.user.user.id}-${
        file.fieldname
      }${require("path").extname(file.originalname)}`
    );
  },
});

const uploader = multer({
  storage,
});

module.exports = uploader;
