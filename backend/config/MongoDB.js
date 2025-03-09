import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("[server]: MongoDB connected to database.");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/density-main`);
};

export default connectDB;
