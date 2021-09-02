const commons = require('../commons/functions');
const dtnBackendService = require('../services/dtnBackend');
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
  const data = commons.getDefinedValues(person);

  // Saving to database
  const res = await peopleService.savePersonInDatabase(data);

  // Sync with DTN Backend
  dtnBackendService.updateDTNBackends({
    endpoint: '/people',
    msgKind: 'POST',
    data: data,
  });

  return res;
}

const editPeople = async (id, ...person) => {
  const data = commons.getDefinedValues(...person);

  // Saving to database
  const res = await peopleService.updateInDatabase(id, data);

  // Sync with DTN Backend
  dtnBackendService.updateDTNBackends({
    endpoint: `/people/person/${id}`,
    msgKind: 'PATCH',
    data: data,
  });

  return res;
}

const deletePeople = async (id) => {
  // Saving to database
  const res = await peopleService.deleteFromDatabase(id);

  // Sync with DTN Backend
  dtnBackendService.updateDTNBackends({
    endpoint: `/people/person/${id}`,
    msgKind: 'DELETE',
  });

  return res;
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