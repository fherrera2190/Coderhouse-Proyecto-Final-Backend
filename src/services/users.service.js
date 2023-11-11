class UsersService {
  constructor(dao) {
    this.dao =  dao;
  }
  async getUsers() {
    return await this.dao.get();
  }
  async createUser() {
    return await this.dao.create();
  }
}


module.exports = UsersService;
