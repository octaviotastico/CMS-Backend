// Local Imports
import UsersModel from "../models/users.js";

export const getAllUsers = async () => {
  return await UsersModel.find({});
};

export const getUsersByID = async (id) => {
  return await UsersModel.findById(id);
};

export const getUsersByUsername = async (username) => {
  return await UsersModel.findOne({ username: username });
};

export const saveNewUser = async (user) => {
  return await new UsersModel(user).save();
};

export const updateUserByID = async (id, user) => {
  return await UsersModel.findByIdAndUpdate(id, user, { new: false });
};

export const updateUserByUsername = async (username, newData) => {
  return await UsersModel.findOneAndUpdate({ username }, newData, { new: false });
};

export const deleteUserByID = async (id) => {
  return await UsersModel.findByIdAndRemove(id);
};

export const deleteUserByUsername = async (username) => {
  return await UsersModel.findByIdAndRemove({ username });
};

export const getAllSkills = async () => {
  const allSkills = await UsersModel.find({}, "skills").populate("skills");
  const flatSkillNames = allSkills.map((skill) => skill.name).flat();
  return [...new Set(flatSkillNames)];
};

export const getAllUsersWithSkill = async (skill) => {
  return await UsersModel.find({ skills: skill }).populate("skills");
};

export default {
  getAllUsers,
  getUsersByID,
  getUsersByUsername,
  saveNewUser,
  updateUserByID,
  updateUserByUsername,
  deleteUserByID,
  deleteUserByUsername,
  getAllSkills,
  getAllUsersWithSkill,
};
