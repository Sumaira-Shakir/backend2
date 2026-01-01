import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not defined in .env");

    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
    console.log("Connected DB NAME:", mongoose.connection.name);
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error);
    process.exit(1); // Stop server if DB connection fails
  }
};

export default connectDB;