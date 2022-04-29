const bcrypt = require("bcrypt");

const User = require("../models/user");

const passwordValidation = async (user, password) => {
  const matchPasswords = await bcrypt.compare(password, user.password);

  if (!matchPasswords) {
    console.log("invalid password");
    return false;
  }

  if (matchPasswords) {
    console.log("valid password");
    return true;
  }
};

module.exports = passwordValidation;
