const commons = require('../commons/functions');
const dtnBackendService = require('../services/dtnBackend');
const usersService = require('../services/users');

const getAllUsers = async () => {
  return await usersService.getAllUsers();
};

const getUsersByID = async (id) => {
  return await usersService.getUsersByID(id);
};

const postUser = async (user) => {
  const data = commons.getDefinedValues(user);

  // Saving to local database
  const res = await usersService.savePersonInDatabase(data);

  // Sync with DTN Backend
  dtnBackendService.updateDTNBackends({
    endpoint: '/users',
    action: 'POST',
    payload: data,
  }, "local-cms");

  return res;
};

const editUser = async (id, user) => {
  const data = commons.getDefinedValues(user);

  // Saving to local database
  const res = await usersService.updateInDatabase(id, data);

  // Sync with DTN Backend
  dtnBackendService.updateDTNBackends({
    endpoint: `/users/user/${id}`,
    action: 'PATCH',
    payload: data,
  }, "local-cms");

  return res;
};

const deleteUsers = async (id) => {
  // Saving to local database
  const res = await usersService.deleteFromDatabase(id);

  // Sync with DTN Backend
  dtnBackendService.updateDTNBackends({
    endpoint: `/users/user/${id}`,
    action: 'DELETE',
  }, "local-cms");

  return res;
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
