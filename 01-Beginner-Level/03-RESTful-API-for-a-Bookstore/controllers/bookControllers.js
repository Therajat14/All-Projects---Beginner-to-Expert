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
      (!title || !author || !description || !genre || price == null,
      stock == null || !image || !publisher || !publishedDate)
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

// export const addNewBook = async (req, res) => {
//   try {
//     const {
//       title,
//       author,
//       description,
//       genre,
//       price,
//       stock,
//       image,
//       rating,
//       numReviews,
//       reviews,
//       publisher,
//       publishedDate,
//     } = req.body;

//     // Basic required field validation (can be expanded)
//     if (
//       !title ||
//       !author ||
//       !description ||
//       !genre ||
//       price == null ||
//       stock == null
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide all required fields",
//       });
//     }

//     const book = new Book({
//       title,
//       author,
//       description,
//       genre,
//       price,
//       stock,
//       image,
//       rating,
//       numReviews,
//       reviews,
//       publisher,
//       publishedDate,
//     });

//     const createdBook = await book.save();

//     res.status(201).json({
//       success: true,
//       message: "Book created successfully",
//       data: createdBook,
//     });
//   } catch (err) {
//     console.error("Error creating book:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create book",
//       error: err.message,
//     });
//   }
// };
