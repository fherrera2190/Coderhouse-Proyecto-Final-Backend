const winston = require("winston");
const config = require("../config/config");
const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white"
  }
};
const devLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: "./src/logs/errors.log",
      level: "error",
      format: winston.format.simple()
    })
  ]
});

const prodLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename:  "./src/logs/errors.log",
      level: "error",
      format: winston.format.simple()
    })
  ]
});

const addLogger = (req, res, next) => {
  if (config.MODE === "production") {
    req.logger = prodLogger;
  } else {
    req.logger = devLogger;
  }
  req.logger.http(
    `${req.method} in ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
  );
  next();
};

module.exports = {
  addLogger
};
