const express = require("express");
const app = express();
const config= require('./config/config.js')
const factory = require("./dao/factory.js");
const handlebars = require("express-handlebars");
const path = require("path");
const productsRouter = require("./routes/products.routes.js");
const cartRouter = require("./routes/cart.routes.js");
const sessionsRouter = require("./routes/sessions.routes");
const viewRouter = require("./routes/view.routes");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const inicializaPassport = require("./config/passport.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")));
app.use(cookieParser());

inicializaPassport();
app.use(passport.initialize());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "handlebars");

// Routes
app.use("/", viewRouter);
app.use("/api/products", productsRouter.getRouter());
app.use("/api/carts", cartRouter.getRouter());
app.use("/api/sessions", sessionsRouter.getRouter());

const serverExpress = app.listen(config.PORT, () =>
  console.log(`Server running on http://localhost:${config.PORT}`)
);
const io = new Server(serverExpress);
require("./sockets/socket")(io);
