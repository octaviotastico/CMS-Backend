const usersDelegate = require('../delegates/users');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  const response = await usersDelegate.getAllUsers();
  res.status(200).json(response);
  return response;
}

const getUsersByID = async (req, res) => {
  const { id } = req.params;
  const response = await usersDelegate.getUsersByID(id);
  res.status(200).json(response);
  return response;
}

const postUser = async (req, res) => {
  const {
    // Basic Info
    username,
    password,
    photo,

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
    photo,
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
}

const editUser = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    password,
    photo,
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

  const response = await usersDelegate.editUser(
    id,
    {
      username,
      password,
      photo,
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
    }
  );
  res.status(202).json(response);
  return response;
}

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  const response = await usersDelegate.deleteUsers(id);
  if (!response) {
    res.status(404).json(response);
  } else {
    res.status(202).json(response);
  }
  return response;
}

const login = async (req, res) => {
  const { username, password } = req.body;
  const response = await usersDelegate.login(username, password);
  if (!response) {
    res.status(401).send('Invalid username or password');
  } else {
    res.status(202).json(response);
  }
}

const signup = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;
  const response = await usersDelegate.signup(
    username,
    password,
    firstName,
    lastName,
    email
  );
  if (!response) {
    res.status(401).json(response);
  } else {
    res.status(202).json(response);
  }
  return response;
}

const getAllSkills = async (req, res) => {
  const response = await usersDelegate.getAllSkills();
  res.status(200).json(response);
  return response;
}

const getAllUsersWithSkill = async (req, res) => {
  const { skill } = req.params;
  const response = await usersDelegate.getAllUsersWithSkill(skill);
  res.status(200).json(response);
  return response;
}

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
}
