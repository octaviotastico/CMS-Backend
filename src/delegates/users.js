const commons = require('../commons/functions');
const usersService = require('../services/users');

const getAllUsers = async () => {
  return await usersService.getAllUsers();
};

const getUsersByID = async (id) => {
  commons.checkParams(id);
  return await usersService.getUsersByID(id);
};

const postUser = async (user) => {
  commons.checkParams(user);
  const data = commons.getDefinedValues(user);
  return await usersService.savePersonInDatabase(data);
};

const editUser = async (id, user) => {
  commons.checkParams(id, user);
  const data = commons.getDefinedValues(user);
  return await usersService.updateInDatabase(id, data);
};

const deleteUsers = async (id) => {
  commons.checkParams(id);
  return await usersService.deleteFromDatabase(id);
};

const getAllSkills = async () => {
  return await usersService.getAllSkills();
};

const getAllUsersWithSkill = async (skill) => {
  commons.checkParams(skill);
  return await usersService.getAllUsersWithSkill(skill);
};

module.exports = {
  getAllUsers,
  getUsersByID,
  postUser,
  editUser,
  deleteUsers,
  getAllSkills,
  getAllUsersWithSkill,
};
