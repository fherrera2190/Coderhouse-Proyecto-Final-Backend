const { userService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const user = await userService.getById(req.params.uid);
    if (!user) {
      return res.errorResourceNotFound("User not found");
    }
    const uploadedFiles = req.files;

    if (
      !uploadedFiles["identification"] ||
      !uploadedFiles["address"] ||
      !uploadedFiles["statusaccount"]
    ) {
      return res.status(400).json({
        status: "error",
        message: "Missing required field: requiredData",
      });
    }

    const uploadedDocuments = user.documents.map((document) => document.name);
    console.log(
      user.documents.map((document) => document.name).includes("identification")
    );

    if (
      uploadedFiles["identification"] &&
      !uploadedDocuments.includes("identification")
    ) {
      const identificationFile = uploadedFiles["identification"][0];
      await userService.updateDocuments(
        user.id,
        identificationFile.fieldname,
        identificationFile.path
      );
    }

    if (uploadedFiles["address"] && !uploadedDocuments.includes("address")) {
      const addressProofFile = uploadedFiles["address"][0];
      await userService.updateDocuments(
        user.id,
        addressProofFile.fieldname,
        addressProofFile.path
      );
    }

    if (
      uploadedFiles["statusaccount"] &&
      !uploadedDocuments.includes("statusaccount")
    ) {
      const accountStatementFile = uploadedFiles["statusaccount"][0];
      await userService.updateDocuments(
        user.id,
        accountStatementFile.fieldname,
        accountStatementFile.path
      );
    }

    if (uploadedFiles["profile"]) {
      const profileFile = uploadedFiles["profile"][0];
      await userService.updateDocuments(
        user.id,
        profileFile.fieldname,
        profileFile.path
      );
    }

    return res.json({ msg: "se subieron correctamente los archivos" });
  } catch (error) {
    console.log(error);
  }
};
