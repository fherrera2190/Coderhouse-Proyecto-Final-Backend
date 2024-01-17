module.exports = async (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("recoverpassword");
  } catch (error) {
    req.logger.error(error.message);
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
};
