import express from "express";
import "dotenv/config";

import connectDB from "./utils/db.js";
import router from "./routes/bookRoutes.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/books", router);

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(
    "Server is Running on http://localhost:" + process.env.EXPRESS_PORT
  );
});
