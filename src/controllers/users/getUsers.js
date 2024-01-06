const UserAdmin = require("../../dto/UserAdmin.dto");
const { userService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    let users = await userService.getUsers();
    users = users.filter((user) => user.role !== "admin");
    users = users.map((user) => new UserAdmin(user));
    res.json({ users });
  } catch (error) {
    req.logger.error(error.message);
    return res.sendServerError(error.message);
  }
};
