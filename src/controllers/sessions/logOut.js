const config = require("../../config/config");

module.exports = (req, res) => {
  res.clearCookie(config.PASS_COOKIE);
  res.redirect("/login");
};
