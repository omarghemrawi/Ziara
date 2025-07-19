import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  try {
    const con = cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    if (!con) console.log("have a problem in cloud");
  } catch (error) {
    console.log(error);
  }
};

export default connectCloudinary;
