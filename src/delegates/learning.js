const commons = require('../commons/functions');
const dtnBackendService = require('../services/dtnBackend');
const learningService = require('../services/learning');

const getAllArticles = async () => {
  return await learningService.getAllArticles();
};

const getArticleByID = async (id) => {
  return await learningService.getArticleByID(id);
};

const postArticle = async (article) => {
  const data = commons.getDefinedValues(article);

  // Saving to local database
  const res = await learningService.postArticle(data);

  // Sync with DTN Backend
  dtnBackendService.updateDTNBackends({
    endpoint: '/learning/articles',
    action: 'POST',
    payload: data,
  }, "local-cms");

  return res;
};

const editArticle = async (id, article) => {
  const data = commons.getDefinedValues(article);

  // Saving to local database
  const res = await learningService.editArticle(id, data);

  // Sync with DTN Backend
  dtnBackendService.updateDTNBackends({
    endpoint: `/learning/article/${id}`,
    action: 'PATCH',
    payload: data,
  }, "local-cms");

  return res;
};

const deleteArticle = async (id) => {
  // Saving to local database
  const res = await learningService.deleteArticle(id);

  // Sync with DTN Backend
  dtnBackendService.updateDTNBackends({
    endpoint: `/learning/article/${id}`,
    action: 'DELETE',
  }, "local-cms");

  return res;
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