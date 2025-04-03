const jwt = require("jsonwebtoken");

const token = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60,
  });
};

module.exports = token;
