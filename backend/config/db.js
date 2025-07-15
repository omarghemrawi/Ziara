import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
      console.log("DB Connected");
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
