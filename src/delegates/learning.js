// Local Imports
import learningService from "../services/learning.js";
import { checkParams, getDefinedValues } from "../commons/functions.js";

export const getAllArticles = async () => {
  return await learningService.getAllArticles();
};

export const getArticleByID = async (id) => {
  checkParams(id);
  return await learningService.getArticleByID(id);
};

export const postArticle = async (article) => {
  checkParams(article);
  const data = getDefinedValues(article);
  return await learningService.postArticle(data);
};

export const editArticle = async (id, article) => {
  checkParams(id, article);
  const data = getDefinedValues(article);
  return await learningService.editArticle(id, data);
};

export const deleteArticle = async (id) => {
  checkParams(id);
  return await learningService.deleteArticle(id);
};

export const getAllTags = async () => {
  return await learningService.getAllTags();
};

export const getAllCategories = async () => {
  return await learningService.getAllCategories();
};

export const getAllArticlesOfCategory = async (category) => {
  checkParams(category);
  if (typeof category !== "string")
    throw new Error("category must be a string");
  return await learningService.getAllArticlesOfCategory(category);
};

export default {
  getAllArticles,
  getArticleByID,
  postArticle,
  editArticle,
  deleteArticle,
  getAllTags,
  getAllCategories,
  getAllArticlesOfCategory,
};
