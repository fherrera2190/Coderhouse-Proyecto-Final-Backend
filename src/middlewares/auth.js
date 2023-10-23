module.exports = (req, res, next) => {
  if (!req.cookies.coderCookie) return res.redirect("/login");
  next();
};
