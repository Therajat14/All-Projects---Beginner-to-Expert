const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { signUp, logIn, user } = require("./controller/authController");
const mongoose = require("mongoose");
require("dotenv").config();
var cors = require('cors');


app.use(cors())
//connect the mongodb
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

console.clear();

app.use(bodyParser.json());
app.post("/signup", signUp);
app.post("/login", logIn);
app.post("/user", user);


app.listen(process.env.port);
