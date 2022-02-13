const authService = require('../services/auth');
const commons = require('../commons/functions');

const login = async (username, password) => {
  commons.checkParams(username, password);
  return await authService.login(username, password);
};

const signup = async (username, password, firstName, lastName, email) => {
  commons.checkParams(username, password, firstName, lastName, email);
  return await authService.signup(username, password, firstName, lastName, email);
};

module.exports = {
  login,
  signup,
};
