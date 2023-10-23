const passport = require("passport");
const userModel = require("../dao/mongo/models/users.models");
const bcrypt = require("bcrypt");
const github = require("passport-github2");
const passportJWT = require("passport-jwt");
const { PRIVATE_KEY } = require("../utils");
const cartsModels = require("../dao/mongo/models/carts.models");
// adminCoder@coder.com
//adminCod3r123

const buscaToken = req => {
  let token = null;
  if (req && req.cookies) {
    // console.log("Recupero token,desde la cookie...PASSPORT!!");
    token = req.cookies.coderCookie;
  }
  return token;
};

const inicializaPassport = () => {
  passport.use(
    "jwt",
    new passportJWT.Strategy(
      {
        jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscaToken]),
        secretOrKey: PRIVATE_KEY
      },
      async (contenidoJwt, done) => {
        try {
          return done(null, contenidoJwt.user);
        } catch (error) {
          return done(error);
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
          const usuario = await userModel.findOne({
            email: profile._json.email
          });
          console.log(profile._json.email)
          if (!usuario) {
            let newUsuario = {
              first_name: profile._json.name,
              last_name: profile._json.name,
              age: 18,
              email: profile._json.email,
              password: bcrypt.hashSync(
                profile._json.email,
                bcrypt.genSaltSync(10)
              ),
              cartId: await cartsModels.create({})
            };
            const result = await userModel.create(newUsuario);
            return done(null, result);
          }
          return done(null, usuario);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}; //fin inicializaPassport

module.exports = inicializaPassport;
