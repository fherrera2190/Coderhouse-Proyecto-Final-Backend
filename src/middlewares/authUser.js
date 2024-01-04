module.exports = (req, res, next) => {
  if (req.user.role === "user" || req.user.role === "premium") {
    return res.redirect("/");
  }
  next();
};
