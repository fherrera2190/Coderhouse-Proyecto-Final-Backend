const { userService } = require("../../services/index.service");
const fs = require("fs");
module.exports = async (req, res) => {
  try {
    const user = await userService.getById(req.params.uid);
    if (!user) {
      return res.errorResourceNotFound("User not found");
    }
    const uploadedFiles = req.files;
    //console.log(req.files);
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
    }
    if (
      uploadedFiles["identification"] &&
      !uploadedDocumentsName.includes("identification")
    ) {
      const identificationFile = uploadedFiles["identification"][0];

      uploadedDocuments.push({
        name: identificationFile.fieldname,
        reference: identificationFile.path,
      });
    }
    if (
      uploadedFiles["address"] &&
      !uploadedDocumentsName.includes("address")
    ) {
      const identificationFile = uploadedFiles["address"][0];

      uploadedDocuments.push({
        name: identificationFile.fieldname,
        reference: identificationFile.path,
      });
    }

    if (
      uploadedFiles["statusaccount"] &&
      !uploadedDocumentsName.includes("statusaccount")
    ) {
      const identificationFile = uploadedFiles["statusaccount"][0];

      uploadedDocuments.push({
        name: identificationFile.fieldname,
        reference: identificationFile.path,
      });
    }
    await userService.updateDocuments(user.id, uploadedDocuments);

    return res.json({
      status: "success",
      msg: "se subieron correctamente los archivos",
    });
  } catch (error) {
    console.log(error);
  }
};
