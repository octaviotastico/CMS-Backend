const struct = require('python-struct');
const uuid = require('uuid').v4;

const commons = require('./constants');

const sleep = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, seconds));
};

const checkUndefined = (obj, name) => {
  if (typeof obj === 'undefined') {
    throw new Error(`${name} must not be left undefined`);
  }
};

const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d);
};

const serializeMessage = ({ messageType, eid=null, payload=null, bundle_id=null }) => {
  const msg = [struct.pack("B", 0x10 | (messageType & 0xF))];

  const {
    REGISTER,
    SENDBUNDLE,
    RECVBUNDLE,
    SENDCONFIRM,
    CANCELBUNDLE,
    WELCOME,
  } = commons.AAPMessageTypes;

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
};

const deserializeMessage = (buffer) => {
  const {
    REGISTER,
    SENDBUNDLE,
    RECVBUNDLE,
    SENDCONFIRM,
    CANCELBUNDLE,
    WELCOME,
  } = commons.AAPMessageTypes;

  const errorDeserializing = {
    error: true,
    messageType: null,
    eid: null,
    payload: null,
    bundle_id: null,
  };

  if (buffer.length < 1) {
    console.error("Buffer is too short.");
    return errorDeserializing;
  }

  const version = (buffer[0] >> 4) & 0xF;
  if (version !== 0x1) {
    console.error("Version is not 1.");
    return errorDeserializing;
  }

  const messageType = buffer[0] & 0xF;

  let eid = null;
  let payload = null;
  let bundle_id = null;
  let index = 1;

  // Checking if EID is present
  if (messageType in [REGISTER, SENDBUNDLE, RECVBUNDLE, WELCOME]) {
    if (data.length < index + 2) {
      console.error("Buffer is too short.");
      return errorDeserializing;
    }
    const eidLength = struct.unpack("!H", buffer.slice(index, index + 2))[0];
    index += 2;

    if (data.length < index + eidLength) {
      console.error("Buffer is too short.");
      return errorDeserializing;
    }

    eid = buffer.slice(index, index + eidLength).toString('ascii');
    index += eidLength;
  }

  // Checking if Payload is present
  if (messageType in [SENDBUNDLE, RECVBUNDLE]) {
    if (data.length < index + 8) {
      console.error("Buffer is too short.");
      return errorDeserializing;
    }
    const payloadLength = struct.unpack("!Q", buffer.slice(index, index + 8))[0];
    index += 8;
    if (data.length < index + payloadLength) {
      console.error("Buffer is too short.");
      return errorDeserializing;
    }
    payload = buffer.slice(index, index + payloadLength);
    index += payloadLength;
  }

  // Checking if Bundle ID is present
  if (messageType in [SENDCONFIRM, CANCELBUNDLE]) {
    if (data.length < index + 8) {
      console.error("Buffer is too short.");
      return errorDeserializing;
    }
    bundle_id = struct.unpack("!Q", buffer.slice(index, index + 8))[0];
    index += 8;
  }

  return {
    messageType,
    eid,
    payload,
    bundle_id,
  };
};

const checkRequiredFields = (obj, requiredFields) => {
  requiredFields.forEach((field) => {
    checkUndefined(obj[field], field);
  });
};

const checkEmptyFields = (obj, emptyFields) => {
  emptyFields.forEach((field) => {
    if (typeof obj[field] !== 'undefined') {
      if (obj[field] === null || obj[field] === '') {
        throw new Error(`${field} must not be left empty`);
      }
    }
  });
};

const checkFieldTypes = (obj, fieldTypes) => {
  Object.keys(fieldTypes).forEach((field) => {
    if (typeof obj[field] !== 'undefined') {
      if (typeof obj[field] !== fieldTypes[field]) {
        throw new Error(`${field} must be of type ${fieldTypes[field]}`);
      }
    }
  });
};

const getNonUndefinedFields = (obj, fields) => {
  const nonUndefinedFields = {};
  fields.forEach((field) => {
    if (typeof obj[field] !== 'undefined') {
      nonUndefinedFields[field] = obj[field];
    }
  });
  return nonUndefinedFields;
};

const getDefinedValues = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });

  console.log("pingo", obj);

  console.log("pingocho", newObj);
  return newObj;
}

module.exports = {
  sleep,
  checkUndefined,
  isValidDate,
  serializeMessage,
  deserializeMessage,
  checkRequiredFields,
  checkEmptyFields,
  checkFieldTypes,
  getNonUndefinedFields,
  getDefinedValues,
};
