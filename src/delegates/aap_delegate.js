const aapService = require('../services/aap_service');

const aapSend = async ({ dest_eid, message, waitTime }) => {
  const err = await aapService.aapSend({ dest_eid, message });
  if (err) {
    return err;
  }
  return await aapService.aapReceive({ waitTime });
};

const aapReceive = ({ waitTime }) => {
  return aapService.aapReceive({ waitTime });
};

module.exports = {
  aapSend,
  aapReceive,
};