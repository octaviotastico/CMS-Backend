const fs = require("fs");
const os = require("os");

const writeLineToFile = (text, filename) => {
  filename = `./data/${filename}`;
  fs.appendFileSync(filename, `${text}${os.EOL}`, (err) => {
    if (err) return console.error(err);
  });
};

const readEntireFile = (filename) => {
  filename = `./data/${filename}`;
  const fileExists = fs.existsSync(filename);
  if (fileExists) return fs.readFileSync(filename, "utf8");
  return "";
};

// Check if a directory exists
const directoryExists = (path) => {
  try {
    return fs.statSync(path).isDirectory();
  } catch (err) {
    return false;
  }
};

// Create the directory if it doesn't exist
const createDirectory = (path) => {
  if (!directoryExists(path)) {
    fs.mkdirSync(path);
  }
};

module.exports = {
  writeLineToFile,
  readEntireFile,
  directoryExists,
  createDirectory,
};
