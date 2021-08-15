// Library Imports
const net = require('net');

// Local Imports
const commons = { ...require('../commons/functions'), ...require('../commons/constants') };

// Returns a new connection
const createConnection = (host='localhost', port=4242) => {
  return net.createConnection({ host, port });
};

// Sends a bundle via uD3TN's AAP interface
const sendMessage = ({ dest_eid, message }) => {
  commons.checkUndefined(dest_eid, 'dest_eid');
  commons.checkUndefined(message, 'message');

  const client = createConnection();

  // Step 1: Register client
  client.write(commons.serializeMessage({
    messageType: commons.AAPMessageType.REGISTER
  }));

  // Step 2: Send message
  client.write(commons.serializeMessage({
    messageType: commons.AAPMessageType.SENDBUNDLE,
    payload: Buffer.from(message, 'utf8'),
    eid: dest_eid,
  }));

  // Step 3: Wait for response
  client.on('data', (data) => {
    // I should parse the response here.
    console.log("response is", data);
    client.end();
  });
};

// const listenMessage = (message) => {
//   const client = createConnection();
//   client.on('data', () => {
//     console.log(message);
//   });
// }



module.exports = {
  createConnection,
  sendMessage,
  // listenMessage,
};