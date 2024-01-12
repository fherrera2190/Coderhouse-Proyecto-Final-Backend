const { userService, productService } = require("../../services/index.service");
const transport = require("../../utils/nodemailer");

module.exports = async (req, res) => {
  try {
    let users = await userService.getUsers();

    users.forEach(async (user) => {
      const nowDate = Date.now();

      const dias = nowDate - new Date(user.last_connection).getTime();

      if (dias >= 172800000 && user.role !== "admin") {
        await userService.delete(user._id);
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
      }
    });
    return res.status(200).json({ status: "success" });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
