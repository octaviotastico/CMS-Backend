// Library Imports
import express from "express";

// Local Imports
import { handleRequest } from "../commons/routeController.js";
import usersController from "../controllers/users.js";
import { usersFileStorage } from "../storage/storage.js";

// Routing
const router = express.Router();

// Get all the users with projection
router.get("/", (req, res) => {
  handleRequest(req, res, usersController.getAllUsers);
});

// Get all my data
router.get("/me", (req, res) => {
  handleRequest(req, res, usersController.getMyData);
});

// Patch my data
router.patch("/me", usersFileStorage.single("profilePicture"), (req, res) => {
  handleRequest(req, res, usersController.editMyData);
});

// Get all the information about a user by ID
router.get("/id/:id", (req, res) => {
  handleRequest(req, res, usersController.getUsersByID);
});

// Get all the information about a user by username
router.get("/:username", (req, res) => {
  handleRequest(req, res, usersController.getUsersByUsername);
});

// Post a new user // TODO: Check if this is needed
router.post("/", usersFileStorage.single("profilePicture"), (req, res) => {
  handleRequest(req, res, usersController.postUser);
});

// Edit/Update an existing user
router.patch("/id/:id", usersFileStorage.single("profilePicture"), (req, res) => {
  handleRequest(req, res, usersController.editUser);
});

// Delete an existing user
router.delete("/id/:id", (req, res) => {
  handleRequest(req, res, usersController.deleteUsers);
});

// Get all the different skills of users
router.get("/skills", (req, res) => {
  handleRequest(req, res, usersController.getAllSkills);
});

// Get all the users with a skill
router.get("/skill/:skill", (req, res) => {
  handleRequest(req, res, usersController.getAllUsersWithSkill);
});

export default router;
