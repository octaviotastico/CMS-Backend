// Local Imports
import LearningModel from "../models/learning.js";

export const getAllArticles = async () => {
  const articles = await LearningModel.find(
    {},
    "title subtitle content author category tags preview"
  );

  return articles.map((article) => {
    article.content = article.content.substring(0, 100);
    return article;
  });
};

export const getArticleByID = async (id) => {
  return await LearningModel.findById({ _id: id });
};

export const postArticle = async (article) => {
  if (article.tags) {
    article.tags = article.tags.split(",");
  }
  return await LearningModel.dtCreate(article);
};

export const editArticle = async (id, article) => {
  if (article.tags) {
    article.tags = article.tags.split(",");
  }
  return await LearningModel.dtFindByIdAndUpdate({ _id: id }, article, {
    new: false,
  });
};

export const deleteArticle = async (id) => {
  return await LearningModel.dtFindByIdAndRemove(id);
};

export const getAllTags = async () => {
  const allTags = await LearningModel.find({}, "tags");
  const flatTags = allTags.map((elem) => elem.tags).flat();
  return [...new Set(flatTags)];
};

export const getAllCategories = async () => {
  return await LearningModel.distinct("category");
};

export const getAllArticlesOfCategory = async (category) => {
  const articles = await LearningModel.find(
    { category },
    "title subtitle content author category tags preview"
  );

  return articles.map((article) => {
    article.content = article.content.substring(0, 100);
    return article;
  });
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
