const commons = require("../commons/functions");
const sockets = require("../socket/client");

const aapSend = async ({ eid, message }) => {
  const str = `EID is: ${eid}, and Message is: ${message}`;
  console.log(str);

  sockets.createConnection();
  sockets.sendMessage({
    dest_eid: 'dtn://b.dtn/bundlesink',
    message: 'Hello, World!',
  });

  console.log("message sent")
  return Promise.resolve(0);
};

const aapReceive = async ({ waitTime }) => {
  const parsedWaitTimer = Number(waitTime) || 0;
  const str = `I waited for: ${parsedWaitTimer} seconds`;

  setTimeout(() => {
    console.log("I'm done waiting");
  }, parsedWaitTimer * 1000);

  await commons.sleep(parsedWaitTimer * 1000);

  return Promise.resolve(str);
};

module.exports = {
  aapSend,
  aapReceive,
};