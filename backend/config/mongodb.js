import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected database");
    });
    await mongoose.connect(`${process.env.MONGODB_URL}`);
  } catch (error) {
    console.error("DATABAS CONNECTION EROR", error);
    process.exit(1);
  }
};
export default connectDB;
