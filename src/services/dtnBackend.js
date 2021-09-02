const os = require("os");

const DTNBackendAddresses = require('../models/dtnBackend');
const { readEntireFile } = require('../commons/fileSystem');
const commons = require('../commons/functions');
const client = require('../socket/client');

const updateDTNBackends = async (message) => {
  commons.checkUndefined(message);

  const databaseAddresses = await DTNBackendAddresses.find({});
  const fileAddresses = readEntireFile().split(os.EOL);

  databaseAddresses.forEach((address) => {
    client.sendMessage({
      dest: `${address.host}:${address.port}`,
      message,
    });
  });

  fileAddresses.forEach((address) => {
    client.sendMessage({
      dest: address,
      message: message,
      messageType: "cms-message",
    });
  });
}

module.exports = {
  updateDTNBackends
}