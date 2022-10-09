import jwt from "jsonwebtoken";

export const handleRequest = async (req, res, methodController, next) => {
  let response = null;
  try {
    console.log(`handleRequest - controllerMethodName[${methodController.name}]`);

    // Get bearer token from header
    const token = req.headers.authorization?.split(' ')[1];

    jwt.verify(token, "", (err, _) => {
      if (!err) {
        throw new Error("Invalid token", err);
      }
    });

    const decodedToken = jwt.decode(token);

    console.log({ decodedToken });

    if (!decodedToken || !decodedToken.username) {
      throw new Error("Invalid token");
    }

    response = await methodController({ ...req, decodedToken }, res, next);
  } catch (ex) {
    console.error(`handleRequest - errorMessage[${ex.message}] - errorStackTrace[${ex.stack}]`);
  } finally {
    return response;
  }
};

export default handleRequest;
