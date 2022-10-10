// Library Imports
import bcrypt from "bcrypt";

// Local Imports
import usersDelegate from "../delegates/users.js";

export const getAllUsers = async (req, res) => {
  const response = await usersDelegate.getAllUsers();
  res.status(200).json(response);
  return response;
};

export const getMyData = async (req, res) => {
  const { username } = req.decodedToken;
  const response = await usersDelegate.getUsersByUsername(username);
  res.status(200).json(response);
  return response;
}

export const editMyData = async (req, res) => {
  const { username } = req.decodedToken;
  const { path: profilePicture } = req.file || {};
  const {
    // Personal Data
    firstName,
    lastName,
    email,
    phone,

    // Contact Data
    twitter,
    facebook,
    github,
    gitlab,
    bitbucket,
    linkedin,
    website,

    // Extra Data
    description,
    skills,
    experience,
    education,
    languages,
    papers,
    awards,
    projects,
    interests,
  } = req.body;

  const response = await usersDelegate.editMyData(username, {
    profilePicture,
    firstName,
    lastName,
    email,
    phone,
    twitter,
    facebook,
    github,
    gitlab,
    bitbucket,
    linkedin,
    website,
    description,
    skills,
    experience,
    education,
    languages,
    papers,
    awards,
    projects,
    interests
  });

  res.status(201).json(response);
  return response;
}

export const getUsersByID = async (req, res) => {
  const { id } = req.params;
  const response = await usersDelegate.getUsersByID(id);
  res.status(200).json(response);
  return response;
};

export const getUsersByUsername = async (req, res) => {
  const { username } = req.params;
  const response = await usersDelegate.getUsersByUsername(username);
  res.status(200).json(response);
  return response;
};

export const postUser = async (req, res) => {
  const {
    // Basic Info
    username,
    password,
    profilePicture,

    // Personal Data
    firstName,
    lastName,
    email,
    phone,

    // Contact Data
    twitter,
    facebook,
    github,
    gitlab,
    bitbucket,
    linkedin,
    website,

    // Extra Data
    description,
    skills,
    experience,
    education,
    languages,
    papers,
    awards,
    projects,
    interests,
  } = req.body;

  const passwordSalt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, passwordSalt);

  const response = await usersDelegate.postUser({
    username,
    password: passwordHash,
    profilePicture,
    firstName,
    lastName,
    email,
    phone,
    twitter,
    facebook,
    github,
    gitlab,
    bitbucket,
    linkedin,
    website,
    description,
    skills,
    experience,
    education,
    languages,
    papers,
    awards,
    projects,
    interests,
  });

  res.status(201).json(response);
  return response;
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    password,
    profilePicture,
    firstName,
    lastName,
    email,
    phone,
    twitter,
    facebook,
    github,
    gitlab,
    bitbucket,
    linkedin,
    website,
    description,
    skills,
    experience,
    education,
    languages,
    papers,
    awards,
    projects,
    interests,
  } = req.body;

  const response = await usersDelegate.editUser(id, {
    username,
    password,
    profilePicture,
    firstName,
    lastName,
    email,
    phone,
    twitter,
    facebook,
    github,
    gitlab,
    bitbucket,
    linkedin,
    website,
    description,
    skills,
    experience,
    education,
    languages,
    papers,
    awards,
    projects,
    interests,
  });
  res.status(202).json(response);
  return response;
};

export const deleteUsers = async (req, res) => {
  const { id } = req.params;
  const response = await usersDelegate.deleteUsers(id);
  if (!response) {
    res.status(404).json(response);
  } else {
    res.status(202).json(response);
  }
  return response;
};

export const getAllSkills = async (req, res) => {
  const response = await usersDelegate.getAllSkills();
  res.status(200).json(response);
  return response;
};

export const getAllUsersWithSkill = async (req, res) => {
  const { skill } = req.params;
  const response = await usersDelegate.getAllUsersWithSkill(skill);
  res.status(200).json(response);
  return response;
};

export default {
  getAllUsers,
  getMyData,
  editMyData,
  getUsersByID,
  getUsersByUsername,
  postUser,
  editUser,
  deleteUsers,
  getAllSkills,
  getAllUsersWithSkill,
};
