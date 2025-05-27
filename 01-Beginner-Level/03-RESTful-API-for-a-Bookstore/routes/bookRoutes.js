import express from "express";
import { validateObjectId } from "../middlewares/validateObjectId.js";

const router = express.Router();

import {
  getAllBooks,
  getBookById,
  addNewBook,
  updateBookById,
  deleteBookById,
} from "../controllers/bookControllers.js";

router.get("/", getAllBooks);
router.get("/:id", validateObjectId, getBookById);
router.post("/", addNewBook);
router.put("/:id", validateObjectId, updateBookById);
router.delete("/:id", validateObjectId, deleteBookById);

export default router;
