const config = require("../../config/config");
const { userService } = require("../../services/index.service");
const { isValidPassword, createHash } = require("../../utils/bcrypt");
const decodeJWT = require("../../utils/decodeJWT");

module.exports = async (req, res) => {
  const {token, password, password2 } = req.body;

  console.log(token)
  if (password.trim() === "" || password2.trim() === "") {
    return res.send({
      status: "error",
      message: "The 'password' field cannot be empty.",
    });
  }
  if (password !== password2) {
    return res.send({
      status: "error",
      message:
        "Passwords do not match. Please make sure your passwords match and try again.",
    });
  }

  try {
    const user = decodeJWT(token, process.env.JWT_RESET_PASSWORD_KEY);
    if (isValidPassword(user.user, password)) {
      return res.send({
        status: "error",
        message: "You can't enter the same password you had before",
      });
    }
    const hashedPassword = createHash(password);
    res.clearCookie(config.PASS_COOKIE);
    await userService.update(
      { _id: user.user._id },
      { password: hashedPassword }
    );
    return res.status(200).json({
      status: "success",
      message: "Se cambio la contraseña correctamente",
    });
  } catch (error) {
    req.logger.error(error.cause);
    return res.sendServerError(error.message);
  }
};
