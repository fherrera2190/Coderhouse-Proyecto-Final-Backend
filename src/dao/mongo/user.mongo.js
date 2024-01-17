const { createHash } = require("../../utils/bcrypt");
const userModel = require("./models/user.model");

class User {
  constructor(model) {
    this.userModel = model;
    this.getUserByEmail("adminCoder@coder.com")
      .then((response) => {
        if (!response) {
          const userAdmin = {
            first_name: "Admin",
            last_name: "Coder",
            age: 0,
            email: "adminCoder@coder.com",
            password: createHash("adminCod3r123"),
            role: "admin",
          };
          this.addUser(userAdmin);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getUsers() {
    return await userModel.find({});
  }
  async getUserById(uid) {
    return await userModel.findById({ _id: uid }).lean();
  }

  async getUserByEmail(email) {
    return await userModel.findOne({ email: email }).lean();
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
