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

  async getUserByLogin(email, password) {
    return await userModel.findOne({ email: email, password: password });
  }

  async getUserByCartId(cid) {
    return await userModel.findOne({ cart: cid });
  }

  async getInactiveUsers(option) {
    return await userModel.find(option);
  }

  async addUser(user) {
    return await userModel.create(user);
  }

  async updateUser(uid, data) {
    return await userModel.findOneAndUpdate(uid, data);
  }

  async updateUserDocuments(uid, documentName, documentPath) {
    const user = await userModel.findById(uid);

    if (!user) return new Error("Error finding user");

    const update = {
      $push: { documents: { name: documentName, reference: documentPath } }
    };
    await userModel.updateOne({ _id: uid }, update);
  }

  async deleteUser(uid) {
    return await userModel.findOneAndDelete({ _id: uid });
  }
}

module.exports = User;
