const struct = require('python-struct');
const uuid = require('uuid').v4;

const commons = require('./constants');

const sleep = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, seconds));
}

const checkUndefined = (obj, name) => {
  if (typeof obj === 'undefined') {
    console.error(`${name} is undefined`);
    throw new Error(`${name} is undefined`);
  }
}

const serializeMessage = ({ messageType, eid=null, payload=null, bundle_id=null }) => {
  const msg = [struct.pack("B", 0x10 | (messageType & 0xF))];

  const {
    REGISTER,
    SENDBUNDLE,
    RECVBUNDLE,
    SENDCONFIRM,
    CANCELBUNDLE,
    WELCOME,
  } = commons.AAPMessageType;

  // Sending my EID
  if (messageType in [REGISTER, SENDBUNDLE, RECVBUNDLE, WELCOME]) {
    const newEID = eid || uuid();
    msg.push(struct.pack("!H", newEID.length));
    msg.push(Buffer.from(newEID, "ascii"));
  }

  // Sending Payload
  if (messageType in [SENDBUNDLE, RECVBUNDLE]) {
    msg.push(struct.pack("!Q", payload.length));
    msg.push(payload);
  }

  // Sending Bundle ID
  if (messageType in [SENDCONFIRM, CANCELBUNDLE]) {
    msg.push(struct.pack("!Q", bundle_id.length));
    msg.push(bundle_id);
  }

  return msg.join('');
}

module.exports = {
  sleep,
  checkUndefined,
  serializeMessage,
};
