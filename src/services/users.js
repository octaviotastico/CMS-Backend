const UsersModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

const getAllUsers = async () => {
  return await UsersModel.find({});
};

const getUsersByID = async (id) => {
  return await UsersModel.findById(id);
};

const savePersonInDatabase = async (user) => {
  return await new UsersModel(user).save();
};

const updateInDatabase = async (id, user) => {
  return await UsersModel.findByIdAndUpdate(id, user, { new: false });
};

const deleteFromDatabase = async (id) => {
  return await UsersModel.findByIdAndRemove(id);
};

const isUsernameAvailable = async (username) => {
  const user = await UsersModel.findOne({ username });
  return !user;
};

const login = async (username, password) => {
  // Get user from database
  const user = await UsersModel.findOne({ username });

  // Check if user exists
  if (!user) return false;

  // Check if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return false;

  // JWT Keys
  const jwtPrivateKey = path.resolve('') + '/keys/private_key.pem';

  // Data for JWT
  const payload = { user: username }
  const cert = fs.readFileSync(jwtPrivateKey);
  const config = { expiresIn: '10h', algorithm: 'RS256' };

  return { user, token: jwt.sign(payload, cert, config) };
};

const signup = async (username, password, firstName, lastName, email) => {
  if (!await isUsernameAvailable(username)) return false;

  const passwordSalt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, passwordSalt);

  const newUser = await UsersModel.dtCreate({
    username,
    password: passwordHash,
    firstName,
    lastName,
    email,
  });

  return {
    id: newUser._id,
    username: newUser.username,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  };
};


const getAllSkills = async () => {
  const allSkills = await UsersModel.find({}, "skills").populate("skills");
  const flatSkillNames = allSkills.map(skill => skill.name).flat();
  return [...new Set(flatSkillNames)];
};

const getAllUsersWithSkill = async (skill) => {
  return await UsersModel.find({ skills: skill }).populate("skills");
};

module.exports = {
  getAllUsers,
  getUsersByID,
  savePersonInDatabase,
  updateInDatabase,
  deleteFromDatabase,
  login,
  signup,
  getAllSkills,
  getAllUsersWithSkill,
};
