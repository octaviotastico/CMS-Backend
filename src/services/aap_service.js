const commons = require("../commons/functions");
const sockets = require("../socket/client");

const aapSend = async ({ dest_eid, message, waitTime }) => {
  const err = await sockets.sendMessage({ dest_eid, message });
  if (err) {
    return err;
  }
};

const aapReceive = async ({ waitTime }) => {
  const parsedWaitTime = Number(waitTime) * 1000 || 0;

  const data = await sockets.receiveMessage(parsedWaitTime);

  if (!data) {
    return Error("No data received");
  }

  const {
    error,
    messageType,
    eid,
    payload,
    bundle_id,
  } = commons.deserializeMessage(data);

  if (error) {
    return error;
  }

  return {
    messageType,
    eid,
    payload,
    bundle_id,
  };
};

module.exports = {
  aapSend,
  aapReceive,
};