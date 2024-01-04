module.exports = (req, res, next) => {
  if (req.user.role === "admin") {
    return res.redirect("/");
  }
  next();
};
