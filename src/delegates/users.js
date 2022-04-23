// Local Imports
import usersService from "../services/users.js";
import { checkParams, getDefinedValues } from "../commons/functions.js";

export const getAllUsers = async () => {
  return await usersService.getAllUsers();
};

export const getUsersByID = async (id) => {
  checkParams(id);
  return await usersService.getUsersByID(id);
};

export const postUser = async (user) => {
  checkParams(user);
  const data = getDefinedValues(user);
  return await usersService.savePersonInDatabase(data);
};

export const editUser = async (id, user) => {
  checkParams(id, user);
  const data = getDefinedValues(user);
  return await usersService.updateInDatabase(id, data);
};

export const deleteUsers = async (id) => {
  checkParams(id);
  return await usersService.deleteFromDatabase(id);
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
  postUser,
  editUser,
  deleteUsers,
  getAllSkills,
  getAllUsersWithSkill,
};
