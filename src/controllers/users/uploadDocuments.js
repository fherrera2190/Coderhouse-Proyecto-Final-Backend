const { userService } = require("../../services/index.service");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    const user = await userService.getById(req.params.uid);
    if (!user) {
      return res.errorResourceNotFound("User not found");
    }
    const uploadedFiles = req.files;
    const uploadedDocuments = user.documents;
    // const uploadedDocumentsName = user.documents.map(
    //   (document) => document.name
    // );

    if (
      uploadedFiles["identification"] &&
      uploadedFiles["address"] &&
      uploadedFiles["statusaccount"]
    ) {
      const identificationFile = uploadedFiles["identification"][0];

      uploadedDocuments.push({
        name: identificationFile.fieldname,
        reference: identificationFile.path,
      });
      const addressFile = uploadedFiles["address"][0];

      uploadedDocuments.push({
        name: addressFile.fieldname,
        reference: addressFile.path,
      });
      const statusaccountFile = uploadedFiles["statusaccount"][0];

      uploadedDocuments.push({
        name: statusaccountFile.fieldname,
        reference: statusaccountFile.path,
      });

      await userService.update(
        { _id: user._id },
        { role: "premium", documents: uploadedDocuments }
      );

      return res.json({
        status: "success",
        msg: "se subieron correctamente los archivos",
      });
    } else {
      return res.json({
        status: "error",
        msg: "Debes subir todos los archivos",
      });
    }
  } catch (error) {
    req.logger.error(error.message);
    console.log(error);
  }
};
