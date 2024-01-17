const config = require("../../config/config");
const generaJWT = require("../../utils/generaJWT");

module.exports = (req, res) => {
  const user = req.user;
  const userLimited = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    cartId: user.cartId,
  };
  const token = generaJWT(userLimited);
  res.cookie(config.PASS_COOKIE, token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  });
  res.status(200).redirect("/");
};
