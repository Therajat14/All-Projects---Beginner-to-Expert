const jwt = require("jsonwebtoken");

const token = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2m",
  });
};

const authenticateToken = (token) => {


  if (!token) return {success : false,  message: "No token provided" };

  return jwt.verify(token,  process.env.JWT_SECRET, (err, user) => {
    if (err) return { success : false, message: "Token is not valid" };
    
   else { user.success = true;
    return user;}
  });
};
module.exports = {token, authenticateToken}
