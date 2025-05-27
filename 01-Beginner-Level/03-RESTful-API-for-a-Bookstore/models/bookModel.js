import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    srNo: {
      type: Number,
    },
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "Fiction",
        "Non-Fiction",
        "Fantasy",
        "Science",
        "Biography",
        "Other",
      ],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      default: "", // URL to the cover image
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String },
      },
    ],
    publisher: {
      type: String,
    },
    publishedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
