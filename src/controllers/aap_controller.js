const appDelegate = require('../delegates/aap_delegate');

const aapSend = async (req, res) => {
  const { eid, message } = req.body;
  return await appDelegate.aapSend({ eid, message });
};

const aapReceive = async (req, res) => {
  const { waitTime } = req.body;
  return await appDelegate.aapReceive({ waitTime });
};

module.exports = {
  aapSend,
  aapReceive,
};