const usersController = {
  userPremium: require("./users/userPremium"),
  uploadDocuments: require("./users/uploadDocuments"),
  getUsers: require("./users/getUsers"),
  changeImageProfile: require("./users/changeImageProfile"),
  deleteUser: require("./users/deleteUser"),
};

module.exports = usersController;
