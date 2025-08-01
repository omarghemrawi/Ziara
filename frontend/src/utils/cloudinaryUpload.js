import axios from 'axios';
import Config from 'react-native-config';

const CLOUD_NAME = Config.CLOUD_NAME;
const UPLOAD_PRESET = Config.UPLOAD_PRESET;

export const uploadImageToCloudinary = async imageUri => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });
    formData.append('upload_preset', UPLOAD_PRESET);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return res.data.secure_url;
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    throw err;
  }
};
