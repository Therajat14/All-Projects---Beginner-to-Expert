const {
  userSignUpValidation,
  userLogInValidation,
} = require("../utils/validation/userValidation");
const { genHashedPassword, isMatch } = require("../utils/hash");
const User = require("../models/users");
const {token, authenticateToken} = require("../utils/jwt");


// SIGN UP ROUTE
const signUp = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    let password = req.body.password;

    // Validate request body with Zod
    const validationResult = userSignUpValidation.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.errors });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ msg: "User with this email already exists" });
    }

    // HASHED Password
    password = await genHashedPassword(password);

    // Create new user
    const newUser = new User({ name, email, age, password });

    // Save user to DB
    await newUser.save();
    jwtToken = token({ name, email, age, password });
    res
      .status(201)
      .json({ msg: "User registered successfully!", user: newUser, jwtToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN ROUTE;

const logIn = async (req, res) => {
  try {
    // Validate User Login Inputs
    const validationResult = userLogInValidation.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Credential type Validation Error",
      });
    }

    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check Password
    const isPasswordCorrect = await isMatch(password, existingUser);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate and send JWT (only include necessary info)
    const jwtToken = token({ userName: existingUser.name, email: existingUser.email,age: existingUser.age, id: existingUser._id });

    return res.status(200).json({
      success: true,
      age: existingUser.age,
      name : existingUser.name,
      message: `${existingUser.name}, welcome to the website!`,
      token: jwtToken,
    
    });

  } catch (error) {
    console.error(error.message); // ✅ Log error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });z
  }
};

const user =(req, res)=>{
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
   const user = authenticateToken(token);
   res.json(user);
}


module.exports = { signUp, logIn , user};
