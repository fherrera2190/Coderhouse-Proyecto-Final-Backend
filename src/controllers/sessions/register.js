const cartsModels = require("../../dao/mongo/models/cart.model");
const userModel = require("../../dao/mongo/models/user.model");
const bcrypt = require('bcrypt')
module.exports = async (req, res) => {
  try {
    const { first_name, last_name, age, email } = req.body;
    const existe = await userModel.findOne({ email });
    if (existe) return res.status(200).json({ error: "El usuario ya existe" });

    const user = await userModel.create({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      age,
      email: email.trim(),
      password: bcrypt.hashSync(
        req.body.password.trim(),
        bcrypt.genSaltSync(10)
      ),
      cartId: await cartsModels.create({})
    });
    console.log("Usuario creado con exito");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};
