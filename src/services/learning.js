const LearningModel = require('../models/learning')

const getAllArticles = async () => {
  return await LearningModel.find();
}

const postArticle = async (article) => {
  const newArticle = await new LearningModel(article).save();
  return newArticle;
}

const getArticleByID = (articleID) => {
  return LearningModel.findOne({ _id: articleID })
}

module.exports = {
  getAllArticles,
  getArticleByID,
  postArticle,
}
