var jwt = require('jsonwebtoken');

const handleRequest = async (req, res, methodController, next) => {
  let response = null;
  try {
    console.log(`handleRequest - controllerMethodName[${methodController.name}]`);

    // Get bearer token from header
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, 'supersecret', (err, decoded) => {
      if(!err){
        console.log("ERROR ISSSS", err);
      } else {
        console.log("TOKEN ISSS", token);
      }
    });

    response = await methodController(req, res, next);
  } catch (ex) {
    console.error(`handleRequest - errorMessage[${ex.message}] - errorStackTrace[${ex.stack}]`);
  } finally {
    return response;
  }
};

module.exports = {
  handleRequest
};
