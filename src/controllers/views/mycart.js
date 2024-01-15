module.exports = (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("carts.handlebars", {
      title: "Carts - Page",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.code, detalle: error.message });
  }
};
