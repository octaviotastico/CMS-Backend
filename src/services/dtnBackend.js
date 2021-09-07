// Library Imports
const io = require("socket.io-client");

// Local Imports
const commons = require('../commons/functions');

const updateDTNBackends = async (message, messageType = null) => {
  commons.checkUndefined(message);

  const client = io.connect(`${DTN_HOST}:${DTN_PORT}`);

  if (messageType === null) {
    client.send(message);
  } else {
    client.emit(messageType, message);
  }
};

module.exports = {
  updateDTNBackends
};
