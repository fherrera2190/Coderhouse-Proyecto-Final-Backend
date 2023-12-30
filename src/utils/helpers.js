const helpers = {
  isAdmin: (role) => {
    if (role === "admin") {
      return true;
    } else {
      return false;
    }
  },
  isPremium: (role) => {
    if (role === "premium") {
      return true;
    } else {
      return false;
    }
  },
};

module.exports = helpers;
