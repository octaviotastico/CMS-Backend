const commons = require('../commons/functions');
const learningService = require('../services/learning');

const getAllArticles = async () => {
  return await learningService.getAllArticles();
};

const getArticleByID = async (id) => {
  commons.checkParams(id);
  return await learningService.getArticleByID(id);
};

const postArticle = async (article) => {
  commons.checkParams(article);
  const data = commons.getDefinedValues(article);
  return await learningService.postArticle(data);
};

const editArticle = async (id, article) => {
  commons.checkParams(id, article);
  const data = commons.getDefinedValues(article);
  return await learningService.editArticle(id, data);
};

const deleteArticle = async (id) => {
  commons.checkParams(id);
  return await learningService.deleteArticle(id);
};

const getAllTags = async () => {
  return await learningService.getAllTags();
};

const getAllCategories = async () => {
  return await learningService.getAllCategories();
};

const getAllArticlesOfCategory = async (category) => {
  commons.checkParams(category);
  if (typeof category !== 'string') throw new Error('category must be a string');
  return await learningService.getAllArticlesOfCategory(category);
};

module.exports = {
  getAllArticles,
  getArticleByID,
  postArticle,
  editArticle,
  deleteArticle,
  getAllTags,
  getAllCategories,
  getAllArticlesOfCategory,
};