// Local Imports
import UsersModel from "../models/users.js";

export const getAllUsers = async () => {
  return await UsersModel.find({});
};

export const getUsersByID = async (id) => {
  return await UsersModel.findById(id);
};

export const savePersonInDatabase = async (user) => {
  return await new UsersModel(user).save();
};

export const updateInDatabase = async (id, user) => {
  return await UsersModel.findByIdAndUpdate(id, user, { new: false });
};

export const deleteFromDatabase = async (id) => {
  return await UsersModel.findByIdAndRemove(id);
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
  savePersonInDatabase,
  updateInDatabase,
  deleteFromDatabase,
  getAllSkills,
  getAllUsersWithSkill,
};
