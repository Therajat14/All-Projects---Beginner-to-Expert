import express from "express";
const router = express.Router();

import {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBookById,
  deleteBookById,
} from "../controllers/bookControllers.js";

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", addNewBook);
router.put("/:id", updateBookById);
router.delete("/:id", deleteBookById);

export default router;
