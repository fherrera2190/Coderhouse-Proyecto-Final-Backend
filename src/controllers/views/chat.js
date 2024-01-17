const messagesModel = require("../../dao/mongo/models/message.model");

module.exports = async (req, res) => {
  try {
    let messages = await messagesModel.find().lean();
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("chat", {
      title: "Chat Room",
      messages,
      user: req.user,
    });
  } catch (error) {
    req.logger.error(error.message);
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
};
