const bcrypt = require("bcrypt");
const UserCurrent = require("../../dto/UserCurrent.dto");
const generaJWT = require("../../utils/generaJWT");
const config = require("../../config/config");
const EErrors = require("../../utils/CustomErrors/EErrors");
const CustomError = require("../../utils/CustomErrors/CustomError");
const { userService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.sendUserError("debe completar todos los campos");
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) {
      CustomError.createError({
        name: "Could not find user",
        cause: null,
        message: "Error " + req.body.email + " dont exist",
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }

    if (!bcrypt.compareSync(req.body.password.trim(), user.password)) {
      return res.sendUserError("Invalid Credentials");
    }
    const userLimited = new UserCurrent(user);
    const token = generaJWT(userLimited);
    res.cookie(config.PASS_COOKIE, token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    await userService.update(user._id, {
      last_connection: new Date(),
    });

    res.sendSuccess();
  } catch (error) {
    req.logger.error(error.cause);
    return res.sendServerError(error.message);
  }
};
