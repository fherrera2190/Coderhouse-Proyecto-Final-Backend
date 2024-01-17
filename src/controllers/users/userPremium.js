const { userService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");
const fs = require("fs");
module.exports = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userService.getById(uid);
    if (!user)
      CustomError.createError({
        name: "Could not find user",
        cause: null,
        message: "Error trying to find a user with the id: " + uid,
        code: EErrors.INVALID_TYPE_ERROR,
      });
      
    if (user.role === "premium") {
      const newDocuments = [];
      user.documents.forEach((document) => {
        if (document.name === "profile") {
          newDocuments.push({
            name: document.name,
            reference: document.reference,
          });
        } else {
          document.reference && fs.unlinkSync(document.reference);
        }
      });
      const newRoleUser = await userService.update(
        { _id: uid },
        { role: "user", documents: newDocuments }
      );
      const result = await userService.getById(uid);

      return res
        .status(200)
        .json({ status: "success" });
    }
    return res.status(200).json({
      error: "error",
      message: ` the user ${user.email} already has the 'user' role.`,
    });
  } catch (error) {
    req.logger.error(error.cause);
    return res.sendServerError(error.message);
  }
};
