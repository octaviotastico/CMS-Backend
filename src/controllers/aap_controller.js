const appDelegate = require('../delegates/aap_delegate');

const aapSend = async (req, res) => {
  const {
    dest_eid = "dtn://host2.dtn/bundlesink",
    message = "Hello, World!",
    waitTime = 0
  } = req.body;
  const ret = await appDelegate.aapSend({ dest_eid, message, waitTime });

  if (ret instanceof Error) {
    console.log(ret)
    res.status(409).json(ret);
    return;
  }

  res.status(201).json(ret);
};

const aapReceive = (req, res) => {
  const { waitTime = 0 } = req.body;
  const ret = appDelegate.aapReceive({ waitTime });

  if (ret instanceof Error) {
    console.log(ret)
    res.status(409).json(ret);
    return;
  }

  res.status(201).json(ret);
};

module.exports = {
  aapSend,
  aapReceive,
};