const LearningModel = require('../models/learning');

const getAllArticles = async () => {
  const articles = await LearningModel.find({}, "title subtitle content author category preview");

  return articles.map(article => {
    article.description = article.content.substring(0, 3);
    delete article.content;
    console.log("article", article);
    return article;
  });
};

const getAllTags = async () => {
  let allTags = await LearningModel.find({}, "tags");
  // allTags = allTags.map(elem => {
  //   console.log("elem", elem);
  //   return elem.tags.split(",");
  // }).flat()
  // console.log("allTags", allTags);
  // console.log("[...new Set(allTags)]", [...new Set(allTags)]);
  return [...new Set(allTags.map(elem => elem.tags))];
};

const getAllCategories = async () => {
  return await LearningModel.distinct("category");
};

const getAllArticlesOfCategory = async (category) => {
  const articles = await LearningModel.find({ category }, "title subtitle content author category preview");

  return articles.map(article => {
    article.description = article.content.substring(0, 3);
    delete article.content;
    console.log("article", article);
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
  const response = await new LearningModel(article).save();
  return response;
};

const editArticle = async (id, article) => {
  if (article.tags) {
    article.tags = article.tags.split(",");
  }
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
  getAllTags,
  getAllCategories,
  getAllArticlesOfCategory,
};
