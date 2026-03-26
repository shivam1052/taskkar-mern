import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected successfully.");
  } catch (error) {
    console.log("Failed connecting to mongodb" + error);
  }
};

export default connectDB;
