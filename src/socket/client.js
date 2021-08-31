// Library Imports
const net = require('net');

// Returns a new connection
const createConnection = (host='localhost', port=4242) => {
  return net.createConnection({ host, port });
};

// Sends a message over the connection
const sendMessage = (client, message) => {
  client.write(message);
};

module.exports = {
  createConnection,
  sendMessage,
};