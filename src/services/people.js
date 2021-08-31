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

const postPeople = async (person) => {
  // TODO: Sync with other backends
  return await new PeopleModel(person).save();
};

const editPeople = async (id, person) => {
  // TODO: Sync with other backends
  return await PeopleModel.findByIdAndUpdate(id, person, { new: false });
};

const deletePeople = async (id) => {
  return await PeopleModel.findByIdAndRemove(id);
};

module.exports = {
  getAllPeople,
  getAllTags,
  getAllPeopleOfTag,
  getPeopleByID,
  postPeople,
  editPeople,
  deletePeople,
};
