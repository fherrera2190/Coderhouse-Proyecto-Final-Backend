const { userService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");

module.exports = async (req, res) => {
  const { uid } = req.params;
  const user = await userService.getById(uid);
  try {
    if (!user)
      CustomError.createError({
        name: "Could not find user",
        cause: null,
        message: "Error trying to find a user with the id: " + uid,
        code: EErrors.INVALID_TYPE_ERROR,
      });
    let newRole = "";
    user.role === "user" ? (newRole = "premium") : (newRole = "user");

    const newRoleUser = await userService.update(
      { _id: uid },
      { role: newRole }
    );
    const result = await userService.getById(uid);
    res.status(200).json({ result });
  } catch (error) {
    req.logger.error(error.cause);
    return res.sendServerError(error.message);
  }
};
