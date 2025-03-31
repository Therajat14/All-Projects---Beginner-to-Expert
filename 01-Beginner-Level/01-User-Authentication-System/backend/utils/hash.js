const bcrypt = require("bcrypt");
require("dotenv").config();

const genHashedPassword = async (userInputPass) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  return await bcrypt.hash(userInputPass, saltRounds);
};

const isMatch = async (password, user) => {
  result = await bcrypt.compare(password, user.password);

  return result;
};
module.exports = { genHashedPassword, isMatch };
