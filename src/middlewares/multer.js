const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder;
    console.log("Entre aca")
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
    cb(null, `./src/public/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({
  storage
});

module.exports = uploader;
