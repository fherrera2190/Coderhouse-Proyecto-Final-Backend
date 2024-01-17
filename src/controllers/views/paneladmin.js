const UserAdminPanel = require("../../dto/UserAdminPanel.dto");
const { userService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    let users = await userService.getUsers();
    users = users.map((user) => new UserAdminPanel(user));
    users = users.filter((user) => user.role !== "admin");
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("paneladmin.handlebars", {
      title: "Profile - Page",
      user: req.user,
      users,
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
};
