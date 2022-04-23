// Library Imports
import fs from "fs";
import os from "os";

export const writeLineToFile = (text, filename) => {
  filename = `./data/${filename}`;
  fs.appendFileSync(filename, `${text}${os.EOL}`, (err) => {
    if (err) return console.error(err);
  });
};

export const readEntireFile = (filename) => {
  filename = `./data/${filename}`;
  const fileExists = fs.existsSync(filename);
  if (fileExists) return fs.readFileSync(filename, "utf8");
  return "";
};

// Check if a directory exists
export const directoryExists = (path) => {
  try {
    return fs.statSync(path).isDirectory();
  } catch (err) {
    return false;
  }
};

// Create the directory if it doesn't exist
export const createDirectory = (path) => {
  if (!directoryExists(path)) {
    fs.mkdirSync(path);
  }
};
