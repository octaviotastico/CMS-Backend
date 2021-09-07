const LearningModel = require('../models/learning');

const getAllArticles = async () => {
  return await LearningModel.find({}, "title subtitle author description category preview");
};

const getAllCategories = async () => {
  return await LearningModel.distinct("category");
};

const getAllArticlesOfCategory = async (category) => {
  return await LearningModel.find({ category }, "title subtitle author description category preview");
};

const getArticleByID = async (id) => {
  return await LearningModel.findById({ _id: id });
};

const postArticle = async (article) => {
  const response = await new LearningModel(article).save();
  return response;
};

const editArticle = async (id, article) => {
  return await LearningModel.findByIdAndUpdate({ _id: id }, article, { new: false });
};

const deleteArticle = async (id) => {
  return await LearningModel.findByIdAndRemove(id);
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
