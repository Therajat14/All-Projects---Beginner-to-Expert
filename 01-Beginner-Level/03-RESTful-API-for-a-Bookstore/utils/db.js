import mongoose from "mongoose";

const connectDB = async () => {
  console.log(process.env.DB_URI);
  try {
    if (!process.env.DB_URI) {
      throw new Error("MONG_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Cannot connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
