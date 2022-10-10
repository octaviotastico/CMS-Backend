// Library Imports
import express from "express";

// Local Imports
import { handleRequest } from "../commons/routeController.js";
import learningController from "../controllers/learning.js";
import { learningFileStorage } from "../storage/storage.js";

// Router
const router = express.Router();

// Get all the learning articles with projection
router.get("/articles", (req, res) => {
  handleRequest(req, res, learningController.getAllArticles);
});

// Get all the categories of articles
router.get("/articles/categories", (req, res) => {
  handleRequest(req, res, learningController.getAllCategories);
});

// Get all the tags of articles
router.get("/articles/tags", (req, res) => {
  handleRequest(req, res, learningController.getAllTags);
});

// Get all the articles inside a category
router.get("/articles/category/:category", (req, res) => {
  handleRequest(req, res, learningController.getAllArticlesOfCategory);
});

// Get all the information about an article without projection
router.get("/article/:id", (req, res) => {
  handleRequest(req, res, learningController.getArticleByID);
});

// Post a new learning article
router.post("/articles", learningFileStorage.single("preview"), (req, res) => {
  handleRequest(req, res, learningController.postArticle);
});

// Edit/Update an existing article
router.patch("/article/:id", learningFileStorage.single("preview"), (req, res) => {
  handleRequest(req, res, learningController.editArticle);
});

// Delete an existing article
router.delete("/article/:id", (req, res) => {
  handleRequest(req, res, learningController.deleteArticle);
});

export default router;
