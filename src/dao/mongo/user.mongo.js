const userModel = require("./models/user.model");

class User {
  constructor(model) {
    this.userModel = model;
  }

  async getUsers() {
    return await userModel.find({});
  }
  async getUserById(uid) {
    return await userModel.findById({ _id: uid });
  }

  async getUserByEmail(email) {
    return await userModel.findOne({ email: email });
  }

  async getUserByCartId(cid) {
    return await userModel.findOne({ cart: cid });
  }

  async addUser(user) {
    return await userModel.create(user);
  }

  async updateUser(uid, data) {
    return await userModel.findOneAndUpdate(uid, data);
  }

  async deleteUser(uid) {
    return await userModel.findOneAndDelete({ _id: uid });
  }

  async updateUserDocuments(uid, documents) {
    const update = {
      $set: { documents },
    };
    await userModel.updateOne({ _id: uid }, update);
  }
}

module.exports = User;
