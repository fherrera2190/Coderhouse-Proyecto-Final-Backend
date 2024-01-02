class UserDtoProfile {
  constructor(user) {
    this._id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.age = user.age;
    this.email = user.email;
    this.role = user.role;
    user.documents.forEach((element) => {
      this[`${element.name}`] = element.reference.replace("public", "");
    });
  }
}

module.exports = UserDtoProfile;
