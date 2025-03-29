const express = require("express");
const User = require("./models/users");
const app = express();
const bodyParser = require("body-parser");
const UserValidation = require("./utils/validation/userValidation");

require("dotenv").config();

app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    // Validate request body with Zod
    const validationResult = UserValidation.safeParse(req.body);
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
});

app.listen(process.env.port, () => {
  console.log("server running");
});
