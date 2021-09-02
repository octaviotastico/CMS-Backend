const PeopleModel = require('../models/people');

const getAllPeople = async () => {
  return await PeopleModel.find({});
};

const getAllTags = async () => {
  return await PeopleModel.distinct("tags");
};

const getAllPeopleOfTag = async (tag) => {
  return await PeopleModel.find({ tags: tag });
};

const getPeopleByID = async (id) => {
  return await PeopleModel.findById(id);
};

const savePersonInDatabase = async (person) => {
  return await new PeopleModel(person).save();
};

const updateInDatabase = async (id, person) => {
  return await PeopleModel.findByIdAndUpdate(id, person, { new: false });
};

const deleteFromDatabase = async (id) => {
  return await PeopleModel.findByIdAndRemove(id);
};

module.exports = {
  getAllPeople,
  getAllTags,
  getAllPeopleOfTag,
  getPeopleByID,
  savePersonInDatabase,
  updateInDatabase,
  deleteFromDatabase,
};
