const userModel = require("../../dao/mongo/models/user.model");
const bcrypt = require("bcrypt");
const UserCurrent = require("../../dto/UserCurrent.dto");
const generaJWT = require("../../utils/generaJWT");
const config = require("../../config/config");
const EErrors = require("../../utils/CustomErrors/EErrors");
const CustomError = require("../../utils/CustomErrors/CustomError");

module.exports = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.sendUserError("debe completar todos los campos");
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    CustomError.createError({
      name: "Could not find user",
      cause: null,
      message: "Error " + email + " dont exist",
      code: EErrors.INVALID_TYPE_ERROR
    });
  }

  if (!bcrypt.compareSync(req.body.password.trim(), user.password))
    return res.status(401).redirect("/login");
  const userLimited = new UserCurrent(user);

  const token = generaJWT(userLimited);
  res.cookie(config.PASS_COOKIE, token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true
  });
  res.redirect("/");
};
