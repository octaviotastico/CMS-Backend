const learningService = require('../services/learning');

const getAllArticles = async () => {
  return await learningService.getAllArticles();
};

const getArticleByID = async ({ id }) => {
  return await learningService.getArticleByID({ id });
};

const postArticle = async ({ category, title, subtitle, author, description, preview, content, tags }) => {
  return await learningService.postArticle({ category, title, subtitle, author, description, preview, content, tags });
};

const editArticle = async ({ id, category, title, subtitle, author, description, preview, content, tags }) => {
  let article = {};
  if (category) article.category = category;
  if (title) article.title = title;
  if (subtitle) article.subtitle = subtitle;
  if (author) article.author = author;
  if (description) article.description = description;
  if (preview) article.preview = preview;
  if (content) article.content = content;
  if (tags) article.tags = tags;
  return await learningService.editArticle({ id, article });
};

const deleteArticle = async ({ id }) => {
  return await learningService.deleteArticle({ id });
};

const getAllCategories = async () => {
  return await learningService.getAllCategories();
};

const getAllArticlesOfCategory = async (category) => {
  if (typeof category !== 'string') throw new Error('category must be a string');
  if (!category) throw new Error('category is required');
  return await learningService.getAllArticlesOfCategory(category);
};

module.exports = {
  getAllArticles,
  getArticleByID,
  postArticle,
  editArticle,
  deleteArticle,
  getAllCategories,
  getAllArticlesOfCategory,
};