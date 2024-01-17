const config = require("../../config/config");
const { userService } = require("../../services/index.service");
const CustomError = require("../../utils/CustomErrors/CustomError");
const EErrors = require("../../utils/CustomErrors/EErrors");
const generateTokenResetPassword = require("../../utils/generateTokenResetPassword");
const transport = require("../../utils/nodemailer");

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const userDB = await userService.getUserByEmail(email);
  try {
    if (!userDB) {
      CustomError.createError({
        name: "Could not find user",
        cause: null,
        message: "Error trying to find a user with the email: " + email,
        code: EErrors.INVALID_TYPE_ERROR,
      });
    }

    const token = generateTokenResetPassword(userDB);
    //guardar token BD para poder eliminarlo despues de usarlo
    let result = await transport.sendMail({
      from: "Recover Password <ferbeoulvedev@gmail.com>",
      to: email,
      subject: "Recover password",
      html: `
              <div>
                  <h1>Recover your password</h1>
                  <a href="${config.SERVER}/resetpassword?token=${token}">Click me to recover your password</a>
                  <p>This link to reset your password is only valid for 1 hour</>
              </div>
              `,
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    req.logger.error(error.cause);
    return res.sendServerError(error.message);
  }
};
