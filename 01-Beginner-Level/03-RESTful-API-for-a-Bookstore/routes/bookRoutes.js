import express from "express";
const router = express.Router();
import {
  getAllBooks,
  addNewBook,
  getBookById,
  deleteBookById,
} from "../controllers/bookControllers.js";
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", addNewBook);
// router.put("/:id", updateBook);
router.delete("/:id", deleteBookById);

export default router;
