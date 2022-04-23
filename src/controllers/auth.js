// Local Imports
import authDelegate from "../delegates/auth.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  let response;

  try {
    response = await authDelegate.login(username, password);
  } catch (ex) {
    console.error(
      `login - errorMessage[${ex.message}] - errorStackTrace[${ex.stack}]`
    );
  }

  if (!response) {
    res.status(401).send("Invalid username or password");
  } else {
    res.status(202).json(response);
  }
};

export const signup = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;
  let response;

  try {
    response = await authDelegate.signup(
      username,
      password,
      firstName,
      lastName,
      email
    );
  } catch (ex) {
    console.error(
      `signup - errorMessage[${ex.message}] - errorStackTrace[${ex.stack}]`
    );
  }

  if (!response) {
    res.status(401).json(response);
  } else {
    res.status(202).json(response);
  }
  return response;
};

export default {
  login,
  signup,
};
