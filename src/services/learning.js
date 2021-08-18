const LearningModel = require('../models/learning')
// const aapService = require('./aap');
// TODO: Figure out how to store things on the DTN network without sending it to anyone in particular.

const getAllArticles = async () => {
  return await LearningModel.find({}, "title subtitle author description category preview");
}

const getArticleByID = async ({ id }) => {
  return await LearningModel.findById({ _id: id });
}

const postArticle = async (article) => {
  // Save record on the database
  const response = await new LearningModel(article).save();

  // Send the article over the DTN network
  // aapService.sendMessage({ dest_eid: null, message: JSON.stringify(article) });

  return response;
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
