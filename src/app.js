const express = require("express");
const app = express();
const config = require("./config/config.js");
const factory = require("./dao/factory.js");
const handlebars = require("express-handlebars");
const path = require("path");
const productsRouter = require("./routes/products.routes.js");
const cartRouter = require("./routes/cart.routes.js");
const sessionsRouter = require("./routes/sessions.routes");
const usersRouter = require("./routes/users.routes.js");
const viewRouter = require("./routes/views.routes.js");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const inicializaPassport = require("./config/passport.config");
const { addLogger } = require("./utils/logger.js");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");
const helpers = require("./utils/helpers.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(path.join(__dirname + "/../public"));
app.use(express.static(path.join(__dirname + "/../public")));
app.use(cookieParser());
app.use(addLogger);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación del e-commerce",
      description: "Mi primer api",
    },
  },
  apis: [`${__dirname}/../docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

inicializaPassport();
app.use(passport.initialize());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  handlebars.engine({
    layoutsDir: "./src/views/layouts",
    partialsDir: "./src/views/partials",
    defaultLayout: "main.handlebars",
    helpers,
  })
);

app.set("views", path.join(__dirname + "/views"));

// Routes
app.use("/", viewRouter);
app.use("/api/products", productsRouter.getRouter());
app.use("/api/carts", cartRouter.getRouter());
app.use("/api/sessions", sessionsRouter.getRouter());
app.use("/api/users", usersRouter.getRouter());

const serverExpress = app.listen(config.PORT, () =>
  console.log(`Server running on http://localhost:${config.PORT}`)
);
const io = new Server(serverExpress);
require("./sockets/socket")(io);
