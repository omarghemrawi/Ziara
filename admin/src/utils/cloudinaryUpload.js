import axios from "axios";

const VITE_CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

const UPLOAD_PRESET = "Ziara-preset";

export const uploadImageToCloudinary = async (file) => {
  console.log(VITE_CLOUD_NAME)
  try {
    const formData = new FormData();
    formData.append("file", file); // file from <input type="file" />
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};
