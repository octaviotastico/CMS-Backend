const { getDefinedValues } = require('../commons/functions');
const peopleService = require('../services/people');

const getAllPeople = async () => {
  return await peopleService.getAllPeople();
}

const getAllTags = async () => {
  return await peopleService.getAllTags();
}

const getAllPeopleOfTag = async (tag) => {
  return await peopleService.getAllPeopleOfTag(tag);
}

const getPeopleByID = async (id) => {
  return await peopleService.getPeopleByID(id);
}

const postPeople = async (person) => {
  const data = getDefinedValues(person);
  return await peopleService.postPeople(data);
}

const editPeople = async (id, ...person) => {
  const data = getDefinedValues(...person);
  return await peopleService.editPeople(id, data);
}

const deletePeople = async (id) => {
  return await peopleService.deletePeople(id);
}

module.exports = {
  getAllPeople,
  getAllTags,
  getAllPeopleOfTag,
  getPeopleByID,
  postPeople,
  editPeople,
  deletePeople,
}