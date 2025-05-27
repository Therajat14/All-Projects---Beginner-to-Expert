import express from "express";
const router = express.Router();
import { getAllBooks, addNewBook } from "../controllers/bookControllers.js";
router.get("/", getAllBooks);
router.post("/", addNewBook);
// router.put("/:id", updateBook);
// router.delete("/:id", deleteBook);

export default router;
