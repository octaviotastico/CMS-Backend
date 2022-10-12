// Library Imports
import multer from "multer";

// Constants
const allowedFileExtensions = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/bmp"];
const limits = { fileSize: 1024 * 1024 * 10 }; // 10MB file size limit

// Disk Storage
const calendarStorage = multer.diskStorage({
  destination: "storage/events/",
  filename: (req, file, cb) => {
    const filename = new Date().toISOString().replace(/:/g, "-") + file.originalname;
    cb(null, filename);
  },
});

const learningStorage = multer.diskStorage({
  destination: "storage/learning/",
  filename: function (req, file, cb) {
    const filename = new Date().toISOString().replace(/:/g, "-") + file.originalname;
    cb(null, filename);
  },
});

const userStorage = multer.diskStorage({
  destination: "storage/users/",
  filename: (req, file, cb) => {
    const filename = new Date().toISOString().replace(/:/g, "-") + file.originalname;
    cb(null, filename);
  },
});

// Filter out files that are not allowed
const fileFilter = (req, file, cb) => {
  if (allowedFileExtensions.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const calendarFileStorage = multer({ storage: calendarStorage, fileFilter, limits });
export const learningFileStorage = multer({ storage: learningStorage, fileFilter, limits });
export const usersFileStorage = multer({ storage: userStorage, fileFilter, limits });
