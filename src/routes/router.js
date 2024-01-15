const routerExpress = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

class Router {
  constructor() {
    this.router = routerExpress.Router();
    this.init();
  }

  init() {}

  getRouter() {
    return this.router;
  }

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.defaultResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.defaultResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.defaultResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }
  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.defaultResponses,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  applyCallbacks(callbacks) {
    try {
      return callbacks.map((callback) => async (...params) => {
        await callback.apply(this, params);
      });
    } catch (error) {
      params[1].status(500).send(error);
    }
  }

  defaultResponses = (req, res, next) => {
    res.sendSuccess = (payload) =>
      res.status(200).send({ status: "success", payload });
    res.sendServerError = (error) =>
      res.status(500).send({ status: "error", error });
    res.sendUserError = (error) =>
      res.status(400).send({ status: "error", error });
    res.sendUserUnauthorized = (error) =>
      res.status(401).send({ status: "error", error });
    res.errorUserAuthentication = (error) =>
      res.status(403).json({ status: "error", error });
    res.errorResourceNotFound = (error) =>
      res.status(404).json({ status: "error", error });
    next();
  };

  handlePolicies = (policies) => (req, res, next) => {
    if (policies.includes("PUBLIC")) return next(); //Cualquiera entra
    const token = req.cookies.coderCookie;
    if (!token) return res.redirect("/login");
    //No borrar es lo que puse antes if (!token) return res.sendUserUnauthorized("User Unauthorized");
    jwt.verify(token, config.PRIVATE_KEY, (err, user) => {
      if (err) {
        return res.errorUserAuthentication("Invalid token");
      } else {
        if (policies.includes(user.user.role.toUpperCase())) {
          req.user = user;
          return next();
        } else {
          return res.sendUserUnauthorized("User dont have permissions");
        }
      }
    });
  };
}

module.exports = Router;
