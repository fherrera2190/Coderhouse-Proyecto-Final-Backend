class UsersService {
  constructor(dao) {
    this.dao = new dao();
  }
  async getUsers() {
    return await this.dao.getUsers();
  }
  async getById(id) {
    const result = await this.dao.getUserById(id);
    return result;
  }
  async getUserByEmail(email) {
    return await this.dao.getUserByEmail(email);
  }

  async createUser() {
    return await this.dao.create();
  }
  async update(uid, data) {
    const result = await this.dao.updateUser(uid, data);
    return result;
  }

  async updateDocuments(uid, documents) {
    const result = await this.dao.updateUserDocuments(uid, documents);
    return result;
  }
}

module.exports = UsersService;
