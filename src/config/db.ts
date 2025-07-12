
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    // console.log(process.env.DBURL!)
    const conn = await mongoose.connect(process.env.DBURL!);
    console.log("MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error(" MongoDB Connection Failed", error);
    process.exit(1);
  }
};
