const passport = require("passport");
const local = require("passport-local");
const userModel = require("../dao/mongo/models/users.models");
const bcrypt = require("bcrypt");
const github = require("passport-github2");

// adminCoder@coder.com
//adminCod3r123

const inicializaPassport = () => {
  passport.use(
    "register",
    new local.Strategy(
      {
        usernameField: "email",
        passReqToCallback: true
      },
      async (req, username, password, done) => {
        const { first_name, last_name, age, email } = req.body;
        try {
          const existe = await userModel.findOne({ email });
          if (existe) done(null, false);

          const user = await userModel.create({
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            age,
            email: email.trim(),
            password: bcrypt.hashSync(password.trim(), bcrypt.genSaltSync(10))
          });
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new local.Strategy(
      {
        usernameField: "email"
      },
      async (username, password, done) => {
        try {
          let user = await userModel.findOne({ email: username });
          if (user && bcrypt.compareSync(password.trim(), user.password)) {
            return done(null, {
              _id: user._id,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              role: user.role
            });
          }
          done(null, false);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new github.Strategy(
      {
        clientID: "Iv1.852bd6834d25d577",
        clientSecret: "a497e4eb3ed80265ecfbec28b93133f86d0befae",
        callbackURL: "http://localhost:8080/api/sessions/callbackGitHub"
      },
      async (token, tokenRefresh, profile, done) => {
        try {
          let usuario = await userModel.findOne({ email: profile._json.email });
          if (!usuario) {
            let newUsuario = {
              first_name: profile._json.name,
              last_name: profile._json.name,
              age: 18,
              email: profile._json.email,
              password: bcrypt.hashSync(
                profile._json.email,
                bcrypt.genSaltSync(10)
              )
            };
            let result = await userModel.create(newUsuario);
            return done(null, result);
          }
          return done(null, usuario);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const usuario = await userModel.findById(id);
    done(null, usuario);
  });
}; //fin inicializaPassport

module.exports = inicializaPassport;
