const UserDtoProfile = require("../../dto/UserProfile.dto");
const { userService } = require("../../services/index.service");

module.exports = async (req, res) => {
  try {
    const user = await userService.getById(req.user.id);
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("profile.handlebars", {
      title: "Profile - Page",
      user: new UserDtoProfile(user),
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
};
