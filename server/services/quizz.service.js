const quizzModel = require('../models/quizz.model');

const findAll = () => {
  return quizzModel.findAll();
};

const add = (project) => {
  return quizzModel.add(project);
};

const findAllByUserId = (uid) => {
  return quizzModel.findAll({ owner: uid });
};

module.exports = {
  findAll,
  add,
  findAllByUserId,
};
