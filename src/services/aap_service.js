const commons = require("../commons/functions");

const aapSend = async ({ eid, message }) => {
  const str = `EID is: ${eid}, and Message is: ${message}`;
  console.log(str);
  return Promise.resolve(str);
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