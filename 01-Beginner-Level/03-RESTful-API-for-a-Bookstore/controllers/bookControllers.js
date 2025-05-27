import mongoose from "mongoose";
import Book from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().lean();
    res.status(200).json({
      success: true,
      message: "Successfully Fetched the books data",
      data: books,
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: err.message,
    });
  }
};

export const addNewBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      genre,
      price,
      stock,
      image,
      publisher,
      publishedDate,
    } = req.body;

    if (
      !title ||
      !author ||
      !description ||
      !genre ||
      price == null ||
      stock == null ||
      !image ||
      !publisher ||
      !publishedDate
    )
      return res.status(400).json({
        success: false,
        message: "Please provide all Details about book",
      });

    const srNo = (await Book.countDocuments()) + 1;
    const newBook = new Book({
      srNo,
      title,
      author,
      description,
      genre,
      price,
      stock,
      image,
      publisher,
      publishedDate,
    });

    const createdBook = await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book created Successfully",
      data: createdBook,
    });
  } catch (err) {
    console.log("Book creating error : ", err.message);
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: `Invalid book ID format: ${id}`,
      });
    }
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `No book found with ID: ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `The book with  this id (${req.params.id}) can't be found`,
    });
  }
};

export const deleteBookById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid book ID format: ${id}`,
    });
  }
  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        msg: `Can't find any element by this id ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      msg: `Book deleted by id ${id} success`,
      deletedBook,
    });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while deleting book",
      error: err.message,
    });
  }
};

export const updateBookById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid book ID foramat : ${id}`,
    });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: `No book found for this id (${id})` });
    }

    res.status(200).json({
      success: true,
      message: `The book has been successfully Updated`,
      data: updatedBook,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error while updating book",
      error: err.message,
    });
  }
};
