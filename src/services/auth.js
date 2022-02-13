const UsersModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

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

module.exports = {
  login,
  signup,
};
