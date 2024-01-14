const { userService, productService } = require("../../services/index.service");
const transport = require("../../utils/nodemailer");

module.exports = async (req, res) => {
  try {
    const user = await userService.getById(req.params.uid);
    if (!user) {
      res.sendUserError("User dont exits");
    }
    await userService.delete(req.params.uid);
    await productService.deleteByOwner(user.email);
    await transport.sendMail({
      from: "Admin <ferbeoulvedev@gmail.com>",
      to: user.email,
      subject: "User Inactive",
      html: `
        <div>
            <h1>Your account has been deleted for inactivity</h1>
            <p> If you have any further questions or need additional assistance, feel free to contact with any admin.</p>
        </div>
        `,
    });

    return res.json({
      status: "success",
      message: "User has been deleted succesfully",
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
