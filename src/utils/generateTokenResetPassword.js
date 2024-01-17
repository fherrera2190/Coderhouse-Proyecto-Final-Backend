const jwt = require("jsonwebtoken");
const config = require("../config/config");
const generateTokenResetPassword = (user) => {
  console.log(config.JWT_RESET_PASSWORD_KEY);
  return jwt.sign({ user }, config.JWT_RESET_PASSWORD_KEY, { expiresIn: "1h" });
};

module.exports = generateTokenResetPassword;
