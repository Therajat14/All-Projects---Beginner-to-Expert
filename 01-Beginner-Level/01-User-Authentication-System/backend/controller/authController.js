const {
  userSignUpValidation,
  userLogInValidation,
} = require("../utils/validation/userValidation");
const { genHashedPassword, isMatch } = require("../utils/hash");
const User = require("../models/users");

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
    res
      .status(201)
      .json({ msg: "User registered successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN ROUTE;

const logIn = async (req, res) => {
  try {
    // Validate User Login Inputs;
    const validationResult = userLogInValidation.safeParse(req.body);

    if (!validationResult.success)
      res.send("Creadiental type Validation Error");

    // Check if the user exist...

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      res.json({
        msg: "User Not Found",
      });

    // Check For Password
    const isPasswordCorrect = await isMatch(password, existingUser);
    if (!isPasswordCorrect)
      res.status(400).json({ message: "Invalid credentials" });

    // GENRATE AND SEND JSON WEB TOKEN

    res.send("Login SUccess");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Err");
  }
};

module.exports = { signUp, logIn };
