const jwt = require("jsonwebtoken");
const passport = require("passport");
const PRIVATE_KEY = "secretPass";
const generaJWT = user => jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });

const passportCall = estrategia => {
  return async function(req, res, next) {
    passport.authenticate(estrategia, function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res
          .status(200)
          .json({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};
module.exports = {
  generaJWT,
  PRIVATE_KEY,
  passportCall
};
