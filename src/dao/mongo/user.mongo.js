const userModel = require("./models/user.model");

class User {
  constructor(model) {
    this.userModel = model;
  }

  async getUsers() {
    try {
      return await userModel.find({});
    } catch (error) {
      return new Error(error);
    }
  }

  async getUserById(uid) {
    try {
      return await userModel.findById({ _id: uid });
    } catch (error) {
      return new Error(error);
    }
  }

  async getUserByEmail(email) {
    try {
      return await userModel.findOne({ email: email });
    } catch (error) {
      return new Error(error);
    }
  }

  async getUserByLogin(email, password) {
    try {
      return await userModel.findOne({ email: email, password: password });
    } catch (error) {
      return new Error(error);
    }
  }

  async getUserByCartId(cid) {
    try {
      return await userModel.findOne({ cart: cid });
    } catch (error) {
      return new Error(error);
    }
  }

  async getInactiveUsers(option) {
    try {
      return await userModel.find(option);
    } catch (error) {
      return new Error(error);
    }
  }

  async addUser(user) {
    try {
      return await userModel.create(user);
    } catch (error) {
      return new Error(error);
    }
  }

  async updateUser(uid, data) {
    try {
      return await userModel.findOneAndUpdate(uid, data);
    } catch (error) {
      return new Error(error);
    }
  }

  async updateUserDocuments(uid, documentName, documentPath) {
    try {
      const user = await userModel.findById(uid);

      if (!user) return new Error("Error finding user");

      const update = {
        $push: { documents: { name: documentName, reference: documentPath } }
      };
      await userModel.updateOne({ _id: uid }, update);
    } catch (error) {
      return new Error(error);
    }
  }

  async deleteUser(uid) {
    try {
      return await userModel.findOneAndDelete({ _id: uid });
    } catch (error) {
      return new Error(error);
    }
  }
}

module.exports = User;
