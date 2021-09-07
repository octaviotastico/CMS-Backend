const fs = require('fs');
const os = require("os");

const writeLineToFile = (text, filename) => {
  filename = `./data/${filename}`;
  fs.appendFileSync(filename, `${text}${os.EOL}`, err => {
    if (err) return console.error(err);
  });
}

const readEntireFile = (filename) => {
  filename = `./data/${filename}`;
  const fileExists = fs.existsSync(filename);
  if (fileExists) return fs.readFileSync(filename, 'utf8');
  return '';
};

module.exports = {
  writeLineToFile,
  readEntireFile
};
