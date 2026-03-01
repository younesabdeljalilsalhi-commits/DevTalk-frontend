import { v2 as cloudinary } from 'cloudinary';


//! UPLOAD FUNCTION (MEMORY TO CLOUDINARY)
export const uploadImage = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};

//!  DELETE FUNCTION
export const deleteImage = (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

export default cloudinary;
