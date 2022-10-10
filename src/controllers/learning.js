// Local Imports
import learningDelegate from "../delegates/learning.js";

export const getAllArticles = async (req, res) => {
  const response = await learningDelegate.getAllArticles();
  res.status(200).json(response);
  return response;
};

export const getArticleByID = async (req, res) => {
  const { id } = req.params;
  const response = await learningDelegate.getArticleByID(id);
  if (!response) {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
  return response;
};

export const postArticle = async (req, res) => {
  const { path: preview } = req.file || {};
  const { username: author } = req.decodedToken;
  const { category, title, subtitle, content, tags } = req.body;
  const response = await learningDelegate.postArticle({
    category,
    title,
    subtitle,
    author,
    preview,
    content,
    tags,
  });
  res.status(201).json(response);
  return response;
};

export const editArticle = async (req, res) => {
  const { id } = req.params;
  const preview = req.file?.path;
  const { category, title, subtitle, author, content, tags } = req.body;
  const response = await learningDelegate.editArticle(id, {
    category,
    title,
    subtitle,
    author,
    preview,
    content,
    tags,
  });
  res.status(202).json(response);
  return response;
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const response = await learningDelegate.deleteArticle(id);
  if (!response) {
    res.status(404).json(response);
  } else {
    res.status(202).json(response);
  }
  return response;
};

export const getAllTags = async (_, res) => {
  const response = await learningDelegate.getAllTags();
  res.status(200).json(response);
  return response;
};

export const getAllCategories = async (req, res) => {
  const response = await learningDelegate.getAllCategories();
  res.status(200).json(response);
  return response;
};

export const getAllArticlesOfCategory = async (req, res) => {
  const { category } = req.params;
  const response = await learningDelegate.getAllArticlesOfCategory(category);
  res.status(200).json(response);
  return response;
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
