const UserCurrent = require("../../dto/UserCurrent.dto");

module.exports = (req, res) => {
  const userCurrent = new UserCurrent(req.user);
  res.sendSuccess(userCurrent);
};
