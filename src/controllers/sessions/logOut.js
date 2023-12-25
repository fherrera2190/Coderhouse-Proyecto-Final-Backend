const config = require("../../config/config");

module.exports = (req, res) => {
  res.clearCookie(config.PASS_COOKIE);
  res.status(200).redirect("/login");
};
