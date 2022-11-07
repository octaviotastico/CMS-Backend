// Library Imports
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";

// Local Imports
import UsersModel from "../models/users.js";

export const isUsernameAvailable = async (username) => {
  const user = await UsersModel.findOne({ username });
  return !user;
};

const generateAccessToken = (user) => {
  // Get user data
  const { username, firstName, lastName, email } = user;

  // JWT Keys
  const jwtPrivateKey = path.resolve("") + "/keys/private_key";

  // Data for JWT
  let cert;
  const payload = { username, firstName, lastName, email };
  const config = { expiresIn: "10h", algorithm: "RS256" };
  try {
    cert = fs.readFileSync(jwtPrivateKey);
  } catch {
    cert = "null";
  }

  return jwt.sign(payload, cert, config);
}

export const login = async (username, password) => {
  // Get user from database
  const user = await UsersModel.findOne({ username }).select('+password');

  // Check if user exists
  if (!user) return false;

  // Check if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return false;

  return {
    user,
    token:
    generateAccessToken(user)
  };
};

const signup = async (username, password, firstName, lastName, email) => {
  if (!(await isUsernameAvailable(username))) return false;

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
    token: generateAccessToken({
      username,
      firstName,
      lastName,
      email
    }),
  };
};

export default {
  isUsernameAvailable,
  login,
  signup,
};
