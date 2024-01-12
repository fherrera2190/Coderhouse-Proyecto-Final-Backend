const cartsModels = require("../../dao/mongo/models/cart.model");
const userModel = require("../../dao/mongo/models/user.model");
const bcrypt = require("bcrypt");
const CustomError = require("../../utils/CustomErrors/CustomError");
const { generateUserErrorInfo } = require("../../utils/CustomErrors/info");
const EErrors = require("../../utils/CustomErrors/EErrors");

module.exports = async (req, res) => {
  try {
    const { first_name, last_name, age, email } = req.body;
    if (!first_name || !last_name || !email || !age) {
      CustomError.createError({
        name: "User creation error",
        cause: generateUserErrorInfo({ first_name, last_name, age, email }),
        message: "Error to create a user",
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }

    const existe = await userModel.findOne({ email });
    if (existe) return res.status(200).json({ error: "user already exists" });

    const user = await userModel.create({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      age,
      email: email.trim(),
      password: bcrypt.hashSync(
        req.body.password.trim(),
        bcrypt.genSaltSync(10)
      ),
      cartId: await cartsModels.create({}),
    });
    return res.status(200).json({ status: "success" });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
