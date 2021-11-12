const commons = require('../commons/functions');
const usersService = require('../services/users');

const getAllUsers = async () => {
  return await usersService.getAllUsers();
};

const getUsersByID = async (id) => {
  return await usersService.getUsersByID(id);
};

const postUser = async (user) => {
  const data = commons.getDefinedValues(user);
  return await usersService.savePersonInDatabase(data);
};

const editUser = async (id, user) => {
  const data = commons.getDefinedValues(user);
  return await usersService.updateInDatabase(id, data);
};

const deleteUsers = async (id) => {
  // Saving to local database
  return await usersService.deleteFromDatabase(id);
};

const login = async (username, password) => {
  return await usersService.login(username, password);
};

const signup = async (username, password, firstName, lastName, email) => {
  if (!username || !password || !firstName || !lastName || !email) {
    throw new Error('Missing parameters');
  }

  return await usersService.signup(username, password, firstName, lastName, email);
};

const getAllSkills = async () => {
  return await usersService.getAllSkills();
};

const getAllUsersWithSkill = async (skill) => {
  return await usersService.getAllUsersWithSkill(skill);
};

module.exports = {
  getAllUsers,
  getUsersByID,
  postUser,
  editUser,
  deleteUsers,
  login,
  signup,
  getAllSkills,
  getAllUsersWithSkill,
};
