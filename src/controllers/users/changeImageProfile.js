const { userService } = require("../../services/index.service");
const fs = require("fs");
module.exports = async (req, res) => {
  try {
    const user = await userService.getById(req.user.user.id);
    if (!user) {
      return res.errorResourceNotFound("User not found");
    }
    const uploadedFiles = req.files;
    const uploadedDocuments = user.documents;
    const uploadedDocumentsName = user.documents.map(
      (document) => document.name
    );
    if (uploadedFiles["profile"]) {
      if (!uploadedDocumentsName.includes("profile")) {
        const profileFile = uploadedFiles["profile"][0];
        uploadedDocuments.push({
          name: profileFile.fieldname,
          reference: profileFile.path,
        });
      } else {
        uploadedDocuments.forEach((document) => {
          if (document.name === "profile") {
            fs.existsSync(document.reference) &&
              fs.unlinkSync(document.reference);
            const profileFile = uploadedFiles["profile"][0];
            document.reference = profileFile.path;
          }
        });
      }
      await userService.updateDocuments(req.user.user.id, uploadedDocuments);
      return res.json({
        status: "success",
        msg: "Your image profile has been changed",
      });
    } else {
      return res.json({
        status: "error",
        msg: "Debes subir una foto",
      });
    }
  } catch (error) {
    req.logger.error(error.message);
    console.log(error);
  }
};
