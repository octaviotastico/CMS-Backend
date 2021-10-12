// Library Imports
const express = require('express');
const multer = require('multer');

// Local Imports
const routeController = require('../commons/routeController');
const learningController = require('../controllers/learning');

// Router
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/learning/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const allowedFileExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
const limits = { fileSize: 1024 * 1024 * 10 }; // 10MB file size limit

const fileFilter = (req, file, cb) => {
  // Accept a file if it is one of the allowed types
  if (allowedFileExtensions.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter, limits });


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
router.post('/articles', upload.single('preview'), (req, res) => {
  console.log(":asdasdlkasgjhdkas")
  console.log(req.file);
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
