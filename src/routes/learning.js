// Library Imports
const express = require('express');

// Local Imports
const routeController = require('../commons/routeController');
const learningController = require('../controllers/learning');

// Routing
const router = express.Router();


// Get all the learning articles with projection
router.get('/articles', (req, res) => {
  routeController.handleRequest(req, res, learningController.getAllArticles);
});

// Get all the categories of articles
router.get('/articles/categories', (req, res) => {
  routeController.handleRequest(req, res, learningController.getAllCategories);
});

// Get all the articles inside a category
router.get('/articles/category/:category', (req, res) => {
  routeController.handleRequest(req, res, learningController.getAllArticlesOfCategory);
});

// Get all the information about an article without projection
router.get('/article/:id', (req, res) => {
  routeController.handleRequest(req, res, learningController.getArticleByID);
});

// Post a new learning article
router.post('/articles', (req, res) => {
  routeController.handleRequest(req, res, learningController.postArticle);
});

// Edit/Update an existing article
router.patch('/article/:id', (req, res) => {
  routeController.handleRequest(req, res, learningController.editArticle);
});

// Delete an existing article
router.delete('/article/:id', (req, res) => {
  routeController.handleRequest(req, res, learningController.deleteArticle);
});

module.exports = router;
