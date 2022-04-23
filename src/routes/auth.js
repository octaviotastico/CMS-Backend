// Library Imports
import { Router } from "express";

// Local Imports
import authController from "../controllers/auth.js";

// Routing
const router = Router();

router.post("/login", (req, res) => {
  authController.login(req, res);
});

router.post("/signup", (req, res) => {
  authController.signup(req, res);
});

export default router;
