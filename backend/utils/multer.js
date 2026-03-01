import multer from "multer";

//! Multer configuration:
const fileStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

export const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
    fileSize: 5 * 1024 * 1024,   // 5MB size limit per image
    files: 6                 // 1 main + 5 additional
  }
})