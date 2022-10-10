// Local Imports
import usersService from "../services/users.js";
import { checkParams, getDefinedValues } from "../commons/functions.js";

export const getAllUsers = async () => {
  return await usersService.getAllUsers();
};

export const editMyData = async (username, newData) => {
  const data = getDefinedValues(newData);
  return await usersService.updateUserByUsername(username, data);
};

export const getUsersByID = async (id) => {
  checkParams(id);
  return await usersService.getUsersByID(id);
};

export const getUsersByUsername = async (username) => {
  checkParams(username);
  return await usersService.getUsersByUsername(username);
};

export const postUser = async (user) => {
  checkParams(user);
  const data = getDefinedValues(user);
  return await usersService.saveNewUser(data);
};

export const editUser = async (id, user) => {
  checkParams(id, user);
  const data = getDefinedValues(user);
  return await usersService.updateUserByID(id, data);
};

export const deleteUsers = async (id) => {
  checkParams(id);
  return await usersService.deleteUserByID(id);
};

export const getAllSkills = async () => {
  return await usersService.getAllSkills();
};

export const getAllUsersWithSkill = async (skill) => {
  checkParams(skill);
  return await usersService.getAllUsersWithSkill(skill);
};

export default {
  getAllUsers,
  getUsersByID,
  getUsersByUsername,
  editMyData,
  postUser,
  editUser,
  deleteUsers,
  getAllSkills,
  getAllUsersWithSkill,
};
