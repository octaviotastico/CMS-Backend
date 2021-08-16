const learningDelegate = require('../delegates/learning');

const getAllArticles = async (req, res) => {
  const response = await learningDelegate.getAllArticles();
  res.status(201).json(response);
  return response;
};

const postArticle = async (req, res) => {
  const { category, title, subtitle, author, description, preview, content, tags } = req.body;
  const response = await learningDelegate.postArticle({ category, title, subtitle, author, description, preview, content, tags });
  res.status(201).json(response);
  return response;
};

module.exports = {
  getAllArticles,
  postArticle,
};