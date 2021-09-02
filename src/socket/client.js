// Library Imports
const io = require("socket.io-client");

// Sends a message over the connection
const sendMessage = ({
  dest = "http://localhost:7575",
  message = "Hello :D",
  messageType = null,
}) => {
  const socket = io.connect(dest);
  if (messageType === null) {
    socket.send(message);
  } else {
    socket.emit(messageType, message);
  }
};

module.exports = {
  sendMessage,
};