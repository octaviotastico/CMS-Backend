// Local Imports
import { deleteFile } from "../commons/fileSystem.js";
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
  return await UsersModel.dtCreate(user);
};

export const updateUserByID = async (id, user) => {
  return await UsersModel.dtFindByIdAndUpdate(id, user, { new: false });
};

export const updateUserByUsername = async (username, newData) => {
  if (newData.profilePicture) {
    const user = await UsersModel.findOne({ username });
    const oldProfilePicture = user.profilePicture;
    // If user nad old profile picture exist, delete the old one
    if (oldProfilePicture) {
      deleteFile(oldProfilePicture);
    }
  }

  return await UsersModel.dtFindOneAndUpdate({ username }, newData, { new: false });
};

export const deleteUserByID = async (id) => {
  return await UsersModel.dtFindByIdAndRemove(id);
};

export const deleteUserByUsername = async (username) => {
  return await UsersModel.dtFindByIdAndRemove({ username });
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
