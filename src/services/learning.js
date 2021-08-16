const LearningModel = require('../models/learning')

const getAllArticles = async () => {
  return await LearningModel.find({}, "title subtitle author description category preview");
}

const getArticleByID = async ({ id }) => {
  return await LearningModel.findById({ _id: id });
}

const postArticle = async (article) => {
  return await new LearningModel(article).save();
}

const editArticle = async ({ id, article }) => {
  return await LearningModel.findByIdAndUpdate({ _id: id }, article, { new: false });
}

const deleteArticle = async ({ id }) => {
  return await LearningModel.findOneAndRemove(id);
}

module.exports = {
  getAllArticles,
  getArticleByID,
  postArticle,
  editArticle,
  deleteArticle,
}
