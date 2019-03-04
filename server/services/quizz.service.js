const quizzModel = require('../models/quizz.model');

const findAll = () => {
  return quizzModel.findAll();
};

const add = (project) => {
  return quizzModel.add(project);
};

module.exports = {
  findAll,
  add,
};
