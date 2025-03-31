const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { signUp, logIn } = require("./controller/authController");
const mongoose = require("mongoose");
require("dotenv").config();

//connect the mongodb
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

console.clear();

app.use(bodyParser.json());
app.post("/signup", signUp);
app.post("/login", logIn);

app.listen(process.env.port);
