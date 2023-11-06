const usersModels = require("./models/users.models");

class Users {
  constructor() {}
  async get() {
    return await usersModels.find();
  }
  async create(user) {
    return await usersModels.create();
  }
}

module.exports = Users;
