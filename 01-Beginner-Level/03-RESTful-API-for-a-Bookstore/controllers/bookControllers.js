import Book from "../models/bookModel.js";

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().lean();
    res.status(200).json({ books });
  } catch (err) {
    res.status(400).json({
      Error: err.message,
    });
  }
};

export default getAllBooks;
