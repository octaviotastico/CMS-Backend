const learningService = require('../services/learning');

const getAllArticles = async () => {
  return await learningService.getAllArticles();
};

const postArticle = async ({ category, title, subtitle, author, description, preview, content, tags }) => {
  return await learningService.postArticle({ category, title, subtitle, author, description, preview, content, tags });
};

module.exports = {
  getAllArticles,
  postArticle,
};