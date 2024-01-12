class UserDtoProfile {
  constructor(user) {
    this._id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.age = user.age;
    this.email = user.email;
    this.role = user.role;
    user.documents.forEach((element) => {
      if (element.name) {
        this[`${element.name}`] = element.reference
          ? element.reference.replace("public", "")
          : null;
      }
    });
  }
}

module.exports = UserDtoProfile;
