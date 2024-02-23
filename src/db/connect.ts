import mongoose from "mongoose";
import dotenv from "dotenv";
import findconfig from "find-config";

const envFilePath = findconfig(".env") || "";
dotenv.config({ path: envFilePath });

const connectDB = async () => {
  try {
    const uri = process.env.DB_URI || "";
    if (typeof uri !== "string") {
      throw new Error("DB_URI is not a string");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
