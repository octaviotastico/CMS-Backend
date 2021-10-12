// Library Imports
const multer = require('multer');

// Constants
const allowedFileExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
const limits = { fileSize: 1024 * 1024 * 10 }; // 10MB file size limit

// Disk Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/learning/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

// Filter out files that are not allowed
const fileFilter = (req, file, cb) => {
  if (allowedFileExtensions.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileStorage = multer({ storage, fileFilter, limits });

module.exports = {
  fileStorage,
};