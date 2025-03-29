const express = require("express");
const User = require("./models/users");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;

  if (!(await User.findOne({ email }))) {
    const newUser = new User({
      name,
      email,
      age,
    });

    await newUser
      .save()
      .then(() => res.send("User saved!"))
      .catch((err) => res.send(err.message));
  } else {
    res.send("User with this email already Exists");
  }
});

app.listen(process.env.port, () => {
  console.log("server running");
});
