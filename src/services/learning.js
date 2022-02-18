const LearningModel = require('../models/learning');

const getAllArticles = async () => {
  const articles = await LearningModel.find({}, "title subtitle content author category tags preview");

  return articles.map(article => {
    article.content = article.content.substring(0, 100);
    return article;
  });
};

const getAllTags = async () => {
  const allTags = await LearningModel.find({}, "tags");
  const flatTags = allTags.map(elem => elem.tags).flat();
  return [...new Set(flatTags)];
};

const getAllCategories = async () => {
  return await LearningModel.distinct("category");
};

const getAllArticlesOfCategory = async (category) => {
  const articles = await LearningModel.find({ category }, "title subtitle content author category tags preview");

  return articles.map(article => {
    article.content = article.content.substring(0, 100);
    return article;
  });
};

const getArticleByID = async (id) => {
  return await LearningModel.findById({ _id: id });
};

const postArticle = async (article) => {
  if (article.tags) {
    article.tags = article.tags.split(",");
  }
  return await LearningModel.dtCreate(article);
};

const editArticle = async (id, article) => {
  if (article.tags) {
    article.tags = article.tags.split(",");
  }
  return await LearningModel.dtFindByIdAndUpdate({ _id: id }, article, { new: false });
};

const deleteArticle = async (id) => {
  return await LearningModel.dtFindByIdAndRemove(id);
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
