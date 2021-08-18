// Library Imports
const express = require('express');

// Local Imports
const learningController = require('../controllers/learning');
const routeController = require('../commons/routeController');

// Routing
const router = express.Router();


// Get all the learning articles with projection
router.get('/articles', (req, res) => {
  routeController.handleRequest(req, res, learningController.getAllArticles);
});

// Post a new learning article
router.get('/article/:id', (req, res) => {
  routeController.handleRequest(req, res, learningController.getArticleByID);
});

// Post a new learning article
router.post('/articles', (req, res) => {
  routeController.handleRequest(req, res, learningController.postArticle);
});

router.patch('/article/:id', (req, res) => {
  routeController.handleRequest(req, res, learningController.editArticle);
});

// Post a new learning article
router.delete('/article/:id', (req, res) => {
  routeController.handleRequest(req, res, learningController.deleteArticle);
});

module.exports = router;
