// Library Imports
import express from "express";

// Local Imports
import { handleRequest } from "../commons/routeController.js";
import searchbarController from "../controllers/searchbar.js";

// Routing
const router = express.Router();

// Get all the searchbar with projection
router.get("/", (req, res) => {
  handleRequest(req, res, searchbarController.search);
});

export default router;
