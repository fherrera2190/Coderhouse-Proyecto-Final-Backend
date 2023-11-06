const dao = require("../dao/mongo/users.mongo");

class UsersService {
  constructor(dao) {
    this.dao = new dao();
  }
  async getUsers() {
    return await this.dao.get();
  }
  async createUser() {
    return await this.dao.create();
  }
}

const userService = new UsersService(dao);

module.exports = userService;
