const { generaJWT } = require("../../utils");
const userModel = require("../../dao/mongo/models/users.models");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {

  console.log("Entre aca")

  if (!req.body.email || !req.body.password)
    return res
      .status(400)
      .json({ status: "error", error: "debe completar todos los campos" });

  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(401).redirect("/login");
  if (!bcrypt.compareSync(req.body.password.trim(), user.password))
    return res.status(401).redirect("/login");
  const userLimited = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    cartId: user.cartId
  };

  const token = generaJWT(userLimited);
  res.cookie("coderCookie", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true
  });
  res.status(200).redirect("/");
};
