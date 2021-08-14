const appService = require('../services/aap_service');

const aapSend = async ({ eid, message }) => {
  return await appService.aapSend({ eid, message });
};

const aapReceive = async ({ waitTime }) => {
  return await appService.aapReceive({ waitTime });
};

module.exports = {
  aapSend,
  aapReceive,
};