const peopleDelegate = require('../delegates/people');

const getAllPeople = async (req, res) => {
  const response = await peopleDelegate.getAllPeople();
  res.status(200).json(response);
  return response;
}

const getAllTags = async (req, res) => {
  const response = await peopleDelegate.getAllTags();
  res.status(200).json(response);
  return response;
}

const getAllPeopleOfTag = async (req, res) => {
  const { tag } = req.params;
  const response = await peopleDelegate.getAllPeopleOfTag(tag);
  res.status(200).json(response);
  return response;
}

const getPeopleByID = async (req, res) => {
  const { id } = req.params;
  const response = await peopleDelegate.getPeopleByID(id);
  res.status(200).json(response);
  return response;
}

const postPeople = async (req, res) => {
  const { firstName, lastName, email, phone, photo, twitter, facebook, github, gitlab, bitbucket, linkedin, website, specialty, notes, tags } = req.body;
  const response = await peopleDelegate.postPeople({ firstName, lastName, email, phone, photo, twitter, facebook, github, gitlab, bitbucket, linkedin, website, specialty, notes, tags });
  res.status(201).json(response);
  return response;
}

const editPeople = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, photo, twitter, facebook, github, gitlab, bitbucket, linkedin, website, specialty, notes, tags } = req.body;
  const response = await peopleDelegate.editPeople({ id, firstName, lastName, email, phone, photo, twitter, facebook, github, gitlab, bitbucket, linkedin, website, specialty, notes, tags });
  res.status(202).json(response);
  return response;
}

const deletePeople = async (req, res) => {
  const { id } = req.params;
  const response = await peopleDelegate.deletePeople(id);
  if (!response) {
    res.status(404).json(response);
  } else {
    res.status(202).json(response);
  }
  return response;
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
