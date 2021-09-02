const constants = require('../commons/constants');
const fs = require('fs');
const os = require("os");

const writeLineToFile = (text, filename = constants.dtnBackendAddressesFileName) => {
  filename = `./data/${filename}`;
  fs.appendFileSync(filename, `${text}${os.EOL}`, err => {
    if (err) return console.error(err);
  });
}

const readEntireFile = (filename = constants.dtnBackendAddressesFileName) => {
  filename = `./data/${filename}`;
  const fileExists = fs.existsSync(filename);
  if (fileExists) return fs.readFileSync(filename, 'utf8');
  return '';
}

module.exports = {
  writeLineToFile,
  readEntireFile
}