const { userService } = require("../../services/index.service");
const { isValidPassword, createHash } = require("../../utils/bcrypt");
const decodeJWT = require("../../utils/decodeJWT");

module.exports = async (req, res) => {
  //console.log(req.query.token+"soy el qyery"
  const { token, password, password2 } = req.body;

  if (password !== password2) {
    return res.send({
      status: "error",
      message:
        "Passwords do not match. Please make sure your passwords match and try again."
    });
  }

  try {
    const user = decodeJWT(token, process.env.JWT_RESET_PASSWORD_KEY);
    if (isValidPassword(user.user, password))
      return res.send({
        status: "error",
        message: "You can't enter the same password you had before"
      });
    const hashedPassword = createHash(password);
    await userService.update(
      { _id: user.user._id },
      { password: hashedPassword }
    );
    return res
      .status(200)
      .json({ ok: true, message: "Se cambio la contraseña correctamente" });
  } catch (error) {
    req.logger.error(error.cause);
    return res.sendServerError(error.message);
  }
};
