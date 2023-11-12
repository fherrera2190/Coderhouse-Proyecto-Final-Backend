module.exports = (req, res) => {
  res.clearCookie("coderCookie");
  res.redirect("/login");
};