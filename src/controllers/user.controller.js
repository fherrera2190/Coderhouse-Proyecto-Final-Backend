const usersController = {
  userPremium: require("./users/userPremium"),
  uploadDocuments: require("./users/uploadDocuments"),
  getUsers: require("./users/getUsers"),
  changeImageProfile: require("./users/changeImageProfile"),
  deleteUser: require("./users/deleteUser"),
  deleteAllUsersInactive:require('./users/deleteAllUsersInactive')
};

module.exports = usersController;
