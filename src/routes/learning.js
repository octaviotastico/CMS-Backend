// Library Imports
const express = require('express');

// Local Imports
const learningController = require('../controllers/learning');
const routeController = require('../commons/routeController');

// Routing
const router = express.Router();

// Get all the learning documents
router.get('/', (req, res) => {
  routeController.handleRequest(req, res, learningController.getAllArticles);
});

// Get all the learning documents
router.get('/', (req, res) => {
  routeController.handleRequest(req, res, learningController.postArticle);
});

module.exports = {
  router
};
