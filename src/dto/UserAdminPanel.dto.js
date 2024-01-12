class UserAdminPanel {
  constructor(user) {
    this._id = user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.age = user.age;
    this.email = user.email;
    this.role = user.role;
    this.isActive = this.isActive(user.last_connection);
  }

  isActive(last_connection) {
    const nowDate = Date.now();

    const dias = nowDate - new Date(last_connection).getTime();

    if (dias >= 172800000) {
      return true;
    }
    return false;
  }
}

module.exports = UserAdminPanel;
