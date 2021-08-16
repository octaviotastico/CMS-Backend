const learningDelegate = require('../delegates/learning');

const getAllArticles = async (req, res) => {
  const response = await learningDelegate.getAllArticles();
  res.status(201).json(response);
  return response;
};

const getArticleByID = async (req, res) => {
  const { id } = req.params;
  const response = await learningDelegate.getArticleByID({ id });
  if (!response) {
    res.status(404).json(response);
  } else {
    res.status(201).json(response);
  }
  return response;
};

const postArticle = async (req, res) => {
  const { category, title, subtitle, author, description, preview, content, tags } = req.body;
  const response = await learningDelegate.postArticle({ category, title, subtitle, author, description, preview, content, tags });
  res.status(201).json(response);
  return response;
};

const editArticle = async (req, res) => {
  const { id } = req.params;
  const { category, title, subtitle, author, description, preview, content, tags } = req.body;
  const response = await learningDelegate.editArticle({ id, category, title, subtitle, author, description, preview, content, tags });
  res.status(201).json(response);
  return response;
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const response = await learningDelegate.deleteArticle({ id });
  if (!response) {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
  return response;
};

module.exports = {
  getAllArticles,
  getArticleByID,
  postArticle,
  editArticle,
  deleteArticle,
};