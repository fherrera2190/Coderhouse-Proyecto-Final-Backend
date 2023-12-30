const jwt = require("jsonwebtoken");
const authTokenResetPassword = (req, res, next) => {
  const token = req.body.token;
  jwt.verify(
    token,
    process.env.JWT_RESET_PASSWORD_KEY,
    (error, credentials) => {
      if (error)
        return res
          .status(403)
          .send({ error: "Token invalid, may have expired!" });
      req.user = credentials.user;
      next();
    }
  );
};

module.exports = authTokenResetPassword;
