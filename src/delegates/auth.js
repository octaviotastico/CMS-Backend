// Local Imports
import authService from "../services/auth.js";
import { checkParams } from "../commons/functions.js";

export const login = async (username, password) => {
  checkParams(username, password);
  return await authService.login(username, password);
};

export const signup = async (
  username,
  password,
  firstName,
  lastName,
  email
) => {
  checkParams(username, password, firstName, lastName, email);
  return await authService.signup(
    username,
    password,
    firstName,
    lastName,
    email
  );
};

export default {
  login,
  signup,
};
