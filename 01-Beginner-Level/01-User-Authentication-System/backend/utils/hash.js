const bcrypt = require("bcrypt");

const hashedPassword = async (userInputPass) => {
  const saltRounds = 10;

  return await bcrypt.hash(userInputPass, saltRounds);
};

module.exports = hashedPassword;
