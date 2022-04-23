// Library Imports
import express from "express";

// Local Imports
import { handleRequest } from "../commons/routeController.js";
import usersController from "../controllers/users.js";
import { fileStorage } from "../storage/storage.js";

// Routing
const router = express.Router();

// Get all the users with projection
router.get("/", (req, res) => {
  handleRequest(req, res, usersController.getAllUsers);
});

// Get all the information about a user without projection
router.get("/user/:id", (req, res) => {
  handleRequest(req, res, usersController.getUsersByID);
});

// Post a new user
router.post("/", fileStorage.single("photo"), (req, res) => {
  handleRequest(req, res, usersController.postUser);
});

// Edit/Update an existing user
router.patch("/user/:id", fileStorage.single("photo"), (req, res) => {
  handleRequest(req, res, usersController.editUser);
});

// Delete an existing user
router.delete("/user/:id", (req, res) => {
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
