import express from "express";
import "dotenv/config";

import connectDB from "./utils/db.js";
import router from "./routes/bookRoutes.js";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

connectDB();

app.use("/books", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(
    "Server is Running on http://localhost:" + process.env.EXPRESS_PORT
  );
});
