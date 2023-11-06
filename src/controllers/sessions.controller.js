const sessionsController = {
  login: require("./sessions/login"),
  register: require("./sessions/register"),
  gitHub: require("./sessions/gitHub"),
  callBackGitHub: require("./sessions/callBackGitHub"),
  current: require("./sessions/current.js"),
  logOut: require("./sessions/logOut")
};

module.exports = sessionsController;
